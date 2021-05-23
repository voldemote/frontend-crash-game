import { put }          from 'redux-saga/effects';
import { call }         from 'redux-saga/effects';
import * as Api         from '../../api';
import { select }       from 'redux-saga/effects';
import AuthState        from '../../constants/AuthState';
import { BetActions }   from '../actions/bet';
import { EventActions } from '../actions/event';
import { PopupActions } from '../actions/popup';
import _                from 'lodash';

const create = function* (action) {
    const eventId        = action.eventId;
    const marketQuestion = action.marketQuestion;
    const betOne         = action.outcomes[0].value;
    const betTwo         = action.outcomes[1].value;
    const startDate      = action.startDate;
    const endDate        = action.endDate;
    const liquidity      = action.liquidityAmount;

    const response = yield call(
        Api.createBet,
        eventId,
        marketQuestion,
        betOne,
        betTwo,
        startDate,
        endDate,
        liquidity,
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
};

const place = function* (action) {
    const betId        = action.betId;
    const amount       = action.amount;
    const isOutcomeOne = action.isOutcomeOne;

    const response = yield call(
        Api.placeBet,
        betId,
        amount,
        isOutcomeOne,
    );

    if (response) {
        yield put(BetActions.placeSucceeded());
        yield put(PopupActions.hide());
        yield put(EventActions.fetchAll());
    } else {
        yield put(BetActions.placeFailed());
    }
};

const setCommitment = function* (action) {
    const betId      = yield select(state => state.bet.selectedBetId);
    const commitment = yield select(state => state.bet.selectedCommitment);

    if (
        !_.isEmpty(commitment) &&
        commitment >= 0.001 &&
        commitment <= 20000000
    ) {
        const response = yield call(
            Api.getOutcomes,
            betId,
            commitment,
        );

        if (response) {
            const result   = response.data;
            const outcomes = [
                result.outcomeOne,
                result.outcomeTwo,
            ];

            yield put(BetActions.setOutcomes({
                outcomes,
            }));
        }
    }
};

export default {
    create,
    place,
    setCommitment,
};