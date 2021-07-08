import * as Api                  from '../../api';

import { call, put, select }                from 'redux-saga/effects';
import { ChatActions }           from '../actions/chat';
import AuthState        from '../../constants/AuthState';
const fetch = function* (action) {
    const {eventId}  = action;
    const {response, error} = yield call(Api.getChatMessagesByEventId, eventId);

    if (response) {
        const messages = response.data;
        yield put(ChatActions.fetchSucceeded({
            eventId,
            messages
        }));
    } else {
        yield put(ChatActions.fetchFailed({
            eventId, error
        }));
    }
};

// this is meant for preloading initial chat message data
const fetchInitial = function* (action) {
    // we only do this for logged-in users
    const authState = yield select(state => state.authentication.authState);
    if (authState === AuthState.LOGGED_IN) {
        let eventId;
        // we check if we have a en eventId in the URL and thus get the messages for that
        const pathname = window.location.pathname;
        const pathSlugs = pathname.slice(1).split('/');
        // event page
        if (pathSlugs[0] === 'trade') {
            eventId = pathSlugs[1];
        } else {
            // on all other pages get chat history for first event, which could be the most likely for a user to visit
            const events = yield select(state => state.event.events);
            if(events.length) {
                eventId = events[0]._id;
            }
        }
        if(eventId) {
            const {response, error} = yield call(Api.getChatMessagesByEventId, eventId);

            if (response) {
                const messages = response.data;
                yield put(ChatActions.fetchInitialSucceeded({
                    eventId,
                    messages
                }));
            } else {
                yield put(ChatActions.fetchInitialFailed({
                    eventId, error
                }));
            }
        }

    }

};
const fetchInitialSucceeded = function* (action) {
    const messages = yield select(state => state.chat.messagesByEvent[action.eventId]);
    console.log("messages", messages)
};

export default {
    fetch,
    fetchInitial,
    fetchInitialSucceeded,
};
