import { put }          from 'redux-saga/effects';
import { call }         from 'redux-saga/effects';
import * as Api         from '../../api';
import { select }       from 'redux-saga/effects';
import AuthState        from '../../constants/AuthState';
import { BetActions }   from '../actions/bet';
import { EventActions } from '../actions/event';

const create = function* (action) {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        const eventId        = action.eventId;
        const marketQuestion = action.marketQuestion;
        const betOne         = action.outcomes[0].value;
        const betTwo         = action.outcomes[1].value;
        const startDate      = action.startDate;
        const endDate        = action.endDate;

        const response = yield call(
            Api.createBet,
            eventId,
            marketQuestion,
            betOne,
            betTwo,
            startDate,
            endDate,
        );

        if (response) {
            const bet = response.data;

            yield put(BetActions.createSucceeded({
                bet,
            }));
            yield put(EventActions.fetchAll());
        } else {
            yield put(BetActions.createFailed());
        }
    }
};

export default {
    create,
};