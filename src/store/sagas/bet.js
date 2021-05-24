import * as Api         from '../../api';
import _                from 'lodash';
import { BetActions }   from '../actions/bet';
import { call }         from 'redux-saga/effects';
import { EventActions } from '../actions/event';
import { PopupActions } from '../actions/popup';
import { put }          from 'redux-saga/effects';
import { select }       from 'redux-saga/effects';

const create = function* (action) {
    const eventId        = action.eventId;
    const marketQuestion = action.marketQuestion;
    const betOne         = action.outcomes[0].value;
    const betTwo         = action.outcomes[1].value;
    const endDate        = action.endDate;
    const liquidity      = action.liquidityAmount;

    const response = yield call(
        Api.createBet,
        eventId,
        marketQuestion,
        betOne,
        betTwo,
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
    const betId  = yield select(state => state.bet.selectedBetId);
    const amount = yield select(state => state.bet.selectedCommitment);

    yield put(BetActions.fetchOutcomes({
        betId,
        amount,
    }));
};

const fetchOutcomes = function* (action) {
    const betId  = action.betId;
    const amount = action.amount;

    if (
        !_.isNull(amount) &&
        amount >= 0.001 &&
        amount <= 20000000
    ) {
        const response = yield call(
            Api.getOutcomes,
            betId,
            amount,
        );

        if (response) {
            const result     = response.data;
            const outcomeOne = result.outcomeOne;
            const outcomeTwo = result.outcomeTwo;
            const outcomes   = {
                [betId]: {
                    outcomeOne,
                    outcomeTwo,
                    amount,
                },
            };

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
    fetchOutcomes,
};