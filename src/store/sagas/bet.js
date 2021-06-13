import * as Api         from '../../api';
import _                from 'lodash';
import { BetActions }   from '../actions/bet';
import { call }         from 'redux-saga/effects';
import { EventActions } from '../actions/event';
import { PopupActions } from '../actions/popup';
import { put }          from 'redux-saga/effects';
import { select }       from 'redux-saga/effects';
import { PopupTypes }   from '../actions/popup';
import PopupTheme       from '../../components/Popup/PopupTheme';
import AuthState        from '../../constants/AuthState';

const create = function* (action) {
    const eventId        = action.eventId;
    const marketQuestion = action.marketQuestion;
    const description    = action.description;
    const betOne         = action.outcomes[0].value;
    const betTwo         = action.outcomes[1].value;
    const endDate        = action.endDate;
    const liquidity      = action.liquidityAmount;

    const response = yield call(
        Api.createBet,
        eventId,
        marketQuestion,
        description,
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
        yield put(BetActions.placeSucceeded({
            betId,
            amount,
            isOutcomeOne,
        }));
        yield put(PopupActions.hide());
        yield put(EventActions.fetchAll());
        yield put(PopupActions.show({
            popupType: PopupTheme.betApprove,
            options:   {
                betId,
            },
        }));
    } else {
        yield put(BetActions.placeFailed());
    }
};

const setCommitment = function* (action) {
    let betId    = action.betId;
    const amount = yield select(state => state.bet.selectedCommitment);

    if (!betId) {
        betId = yield select(state => state.bet.selectedBetId);
    }

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

const fetchOpenBets = function* () {
    const authState = yield select(state => state.authentication.authState);

    if (
        authState === AuthState.LOGGED_IN
    ) {
        const response = yield call(
            Api.getOpenBets,
        );

        if (response) {
            const result   = response.data;
            const openBets = _.get(result, 'openBets', []);

            yield put(BetActions.fetchOpenBetsSucceeded({
                openBets,
            }));
        } else {
            yield put(BetActions.fetchOpenBetsFailed());
        }
    }
};

export default {
    create,
    place,
    setCommitment,
    fetchOutcomes,
    fetchOpenBets,
};