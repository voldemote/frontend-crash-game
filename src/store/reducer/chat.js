import { ChatTypes } from '../actions/chat';
import _                  from 'lodash';
const initialState = {
    messagesByEvent: {},
};
const sortChatMessages = (chatMessages) => chatMessages.sort((a={},b={}) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate < bDate ? -1 : aDate === bDate ? 0 : 1;
});

const addMessages = (allMessages, eventId, messages) => {

    messages = _.uniqWith(
        (allMessages[eventId] || []).concat(messages)
            .map((m) => _.omit(m, ['_id', '__v']))
            .map((m) => {
                m.date = new Date(m.date);
                m.date.setMilliseconds(0);
                return m;
            }),
        _.isEqual
    );

    return {
        ...allMessages,
        [eventId] : sortChatMessages(messages)
    };

};



// TODO: use that immutability-helper, but learn its API first
const fetchSucceeded = (action, state) => {
    const {messages , eventId}  = action;
    return {
        ...state,
        messagesByEvent: addMessages(state.messagesByEvent, eventId, messages)
    };
};

const addMessage = (action, state) => {
    const {message , eventId}  = action;
    return {
        ...state,
        messagesByEvent: addMessages(state.messagesByEvent, eventId, [message])
    };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case ChatTypes.FETCH_SUCCEEDED: return fetchSucceeded(action, state);
        case ChatTypes.FETCH_INITIAL_SUCCEEDED: return fetchSucceeded(action, state);
        case ChatTypes.ADD_MESSAGE: return addMessage(action, state);
        default:                        return state;
        // @formatter:on
    }
}
