import { put }          from 'redux-saga/effects';
import { call }         from 'redux-saga/effects';
import * as Api         from '../../api';
import { EventActions } from '../actions/event';
import { select }       from 'redux-saga/effects';
import AuthState        from '../../constants/AuthState';
import _                from 'lodash';
import { UserActions }  from '../actions/user';

const fetchAll = function* (action) {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        const response = yield call(Api.listEvents);

        if (response) {
            const events = response.data;

            yield put(EventActions.fetchAllSucceeded({
                events,
            }));
        } else {
            yield put(EventActions.fetchAllFailed());
        }
    }
};

const fetchAllSucceeded = function* (action) {
    const users  = yield select(state => state.user.users);
    const events = action.events;

    if (!_.isEmpty(events)) {
        for (const event of events) {
            const bets = event.bets;

            if (!_.isEmpty(bets)) {
                for (const bet of events) {
                    const userId = bet.creator;

                    if (userId) {
                        const userFetched = _.some(
                            users,
                            {
                                userId: userId,
                            },
                        );

                        if (!userFetched) {
                            yield put(UserActions.fetch({ userId }));
                        }
                        // TODO fetch all user at once
                    }
                }
            }
        }
    }
};

export default {
    fetchAll,
    fetchAllSucceeded,
};