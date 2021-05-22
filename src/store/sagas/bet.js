import { put }        from 'redux-saga/effects';
import { call }       from 'redux-saga/effects';
import * as Api       from '../../api';
import { select }     from 'redux-saga/effects';
import AuthState      from '../../constants/AuthState';
import { BetActions } from '../actions/bet';

const create = function* (action) {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        const response = yield call(
            Api.createBet,
        );

        if (response) {
            const bet = response.data;

            yield put(BetActions.createSucceeded({
                bet,
            }));
        } else {
            yield put(BetActions.createFailed());
        }
    }
};

export default {
    create,
};