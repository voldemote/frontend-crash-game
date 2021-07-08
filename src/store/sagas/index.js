import AlertSagas                     from './alert';
import AuthenticationSagas            from './authentication';
import BetSagas                       from './bet';
import EventSagas                     from './event';
import TransactionSagas               from './transaction';
import UserSagas                      from './user';
import ChatSagas                      from './chat';
import { all }                        from 'redux-saga/effects';
import { AuthenticationActions }      from '../actions/authentication';
import { AuthenticationTypes }        from '../actions/authentication';
import { BetActions }                 from '../actions/bet';
import { BetTypes }                   from '../actions/bet';
import { EventActions }               from '../actions/event';
import { EventTypes }                 from '../actions/event';
import { REHYDRATE }                  from 'redux-persist';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import { TransactionActions }         from '../actions/transaction';
import { TransactionTypes }           from '../actions/transaction';
import { UserTypes }                  from '../actions/user';
import { AlertTypes }                 from '../actions/alert';
import { ChatTypes }                 from '../actions/chat';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthenticationTypes.LOGOUT],                         AuthenticationSagas.logout),
        takeLatest([AuthenticationTypes.VERIFY_SMS],                     AuthenticationSagas.verifySms),
        takeLatest([AuthenticationTypes.REQUEST_SMS],                    AuthenticationSagas.requestSms),
        takeLatest([AuthenticationTypes.SET_EMAIL],                      AuthenticationSagas.setAdditionalInformation),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS],                AuthenticationSagas.fetchReferrals),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED],      AuthenticationSagas.fetchReferralsSucceeded),
        takeLatest([AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED], AuthenticationSagas.registrationSucceeded),
        takeLatest([
            AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
        ],                                                                      AuthenticationSagas.authenticationSucceeded),
        takeEvery([
            AuthenticationTypes.REQUEST_SMS_FAILED,
            AuthenticationTypes.VERIFY_SMS_FAILED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
            AuthenticationTypes.FETCH_REFERRALS_FAILED,
            EventTypes.FETCH_ALL_FAILED,
            BetTypes.CREATE_FAILED,
            BetTypes.PLACE_FAILED,
            BetTypes.PULL_OUT_BET_FAILED,
        ],                                                                      AlertSagas.handleFail),
        takeEvery([
            BetTypes.CREATE_SUCCEEDED,
            BetTypes.PLACE_SUCCEEDED,
            BetTypes.PULL_OUT_BET_SUCCEEDED,
        ],                                                                      AlertSagas.handleSuccess),
        takeEvery( [
            AlertTypes.SHOW_SUCCESS,
            AlertTypes.SHOW_ERROR,
        ],                                                                      AlertSagas.handleShown),
        takeLatest([EventTypes.FETCH_ALL],                               EventSagas.fetchAll),
        takeLatest([EventTypes.FETCH_ALL_SUCCEEDED],                     EventSagas.fetchAllSucceeded),
        takeLatest([BetTypes.PLACE],                                     BetSagas.place),
        takeLatest([BetTypes.CREATE],                                    BetSagas.create),
        takeLatest([BetTypes.SET_COMMITMENT],                            BetSagas.setCommitment),
        takeEvery( [BetTypes.FETCH_OUTCOMES],                            BetSagas.fetchOutcomes),
        takeEvery( [BetTypes.FETCH_SELL_OUTCOMES],                       BetSagas.fetchSellOutcomes),
        takeLatest([BetTypes.FETCH_OPEN_BETS],                           BetSagas.fetchOpenBets),
        takeLatest([BetTypes.FETCH_OPEN_BETS_SUCCEEDED],                 BetSagas.fetchOpenBetsSucceeded),
        takeEvery( [BetTypes.PULL_OUT_BET],                              BetSagas.pullOut),
        takeLatest([TransactionTypes.FETCH_ALL],                         TransactionSagas.fetchTransactions),
        takeEvery( [UserTypes.FETCH],                                    UserSagas.fetch),
        takeEvery( [UserTypes.FETCH_SUCCEEDED],                          UserSagas.fetchSucceeded),
        takeLatest( [ChatTypes.FETCH],                                   ChatSagas.fetch),
        takeEvery( [ChatTypes.FETCH_INITIAL],                                   ChatSagas.fetchInitial),
        takeEvery( [ChatTypes.FETCH_INITIAL_SUCCEEDED],                         ChatSagas.fetchInitialSucceeded),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.restoreToken),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.refreshImportantData),
        takeLatest([REHYDRATE],                                          rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
    yield put(EventActions.fetchAll());
    yield put(AuthenticationActions.fetchReferrals());
    yield put(BetActions.fetchOpenBets());
    yield put(TransactionActions.fetchAll());

};

export default {
    root,
};
