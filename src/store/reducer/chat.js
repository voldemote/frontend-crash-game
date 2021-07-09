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

// TODO: use that immutability-helper, but learn its API first
const fetchSucceeded = (action, state) => {
    const {messages , eventId}  = action;
    let combinedMessages = [...(typeof state.messagesByEvent[eventId] !== 'undefined' ? state.messagesByEvent[eventId]: []), ...messages];
    combinedMessages = _.uniqWith(combinedMessages, _.isEqual);
    combinedMessages = sortChatMessages(combinedMessages);
    return {...state, messagesByEvent: {...state.messagesByEvent, [eventId]: combinedMessages}}

};
const addMessage = (action, state) => {
    const {message , eventId}  = action;
    let messages = [...(typeof state.messagesByEvent[eventId] !== 'undefined' ? state.messagesByEvent[eventId]: []), message];
    messages = _.uniqWith(messages, _.isEqual);
    return {...state, messagesByEvent: {...state.messagesByEvent, [eventId]: messages}}
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
