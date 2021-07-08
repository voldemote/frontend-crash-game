import { ChatTypes } from '../actions/chat';
import _                  from 'lodash';
const initialState = {
    messagesByEvent: {},
};

// TODO: use that immutability-helper, but learn its API first
const fetchSucceeded = (action, state) => {
    const {messages , eventId}  = action;
    let combinedMessages = [...(typeof state.messagesByEvent[eventId] !== 'undefined' ? state.messagesByEvent[eventId]: []), ...messages];
    combinedMessages = _.uniqWith(combinedMessages, _.isEqual);
    return {...state, messagesByEvent: {...state.messagesByEvent, [eventId]: combinedMessages}}

};
const addMessage = (action, state) => {
    const {message , eventId}  = action;
    return {...state, messagesByEvent: {...state.messagesByEvent, [eventId]: [...(typeof state.messagesByEvent[eventId] !== 'undefined' ? state.messagesByEvent[eventId]: []), message]}}

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
