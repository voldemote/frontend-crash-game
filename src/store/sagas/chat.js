import * as Api from '../../api';

import { call, put, select } from 'redux-saga/effects';
import { ChatActions }       from '../actions/chat';
import AuthState             from '../../constants/AuthState';
import _                     from 'lodash';
import State                 from '../../helper/State';
import { UserActions }       from '../actions/user';
import { all }               from 'redux-saga/effects';
import { BetActions }        from '../actions/bet';

const rehydrate = function* () {
    const users           = yield select(state => state.user.users);
    const messagesByEvent = yield select(state => state.chat.messagesByEvent);
    const userIds         = _.uniq(
        _.flatten(
            _.map(
                messagesByEvent,
                (messages) => (
                    _.map(
                        messages,
                        (message) => _.get(message, 'userId'),
                    )
                ),
            ),
        ),
    );
    const missingUserIds  = _.filter(
        userIds,
        (userId) => _.isNil(State.getUser(userId, users)),
    );

    yield all(
        _.map(
            missingUserIds,
            (userId) => put(UserActions.fetch({ userId })),
        ),
    );
};

const addMessage = function* (action) {
    const userId = _.get(action, ['message', 'userId']);

    if (userId) {
        const users = yield select(state => state.user.users);
        const user  = State.getUser(userId, users);

        if (!user) {
            yield put(UserActions.fetch({
                userId,
            }));
        }
    }
};

const fetch = function* (action) {
    const { eventId }         = action;
    const { response, error } = yield call(Api.getChatMessagesByEventId, eventId);

    if (response) {
        const messages = response.data;
        yield put(ChatActions.fetchSucceeded({
            eventId,
            messages,
        }));
    } else {
        yield put(ChatActions.fetchFailed({
            eventId, error,
        }));
    }
};

// this is meant for preloading initial chat message data
const fetchInitial = function* (action) {
    let eventId;
    // we check if we have a en eventId in the URL and thus get the messages for that
    const pathname  = window.location.pathname;
    const pathSlugs = pathname.slice(1).split('/');
    // event page
    if (pathSlugs[0] === 'trade') {
        eventId = pathSlugs[1];
    } else {
        // on all other pages get chat history for first event, which could be the most likely for a user to visit
        const events = yield select(state => state.event.events);
        if (events.length) {
            eventId = events[0]._id;
        }
    }
    if (eventId) {
        const { response, error } = yield call(Api.getChatMessagesByEventId, eventId);

        if (response) {
            const messages = response.data;
            yield put(ChatActions.fetchInitialSucceeded({
                eventId,
                messages,
            }));
        } else {
            yield put(ChatActions.fetchInitialFailed({
                eventId, error,
            }));
        }
    }
};

export default {
    rehydrate,
    addMessage,
    fetch,
    fetchInitial,
};
