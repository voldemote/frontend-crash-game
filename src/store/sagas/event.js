import { put }          from 'redux-saga/effects';
import { call }         from 'redux-saga/effects';
import * as Api         from '../../api';
import { EventActions } from '../actions/event';
import { select }       from 'redux-saga/effects';
import AuthState        from '../../constants/AuthState';

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

export default {
    fetchAll,
};