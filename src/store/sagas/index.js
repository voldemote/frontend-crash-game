import { all }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';
import { put }        from 'redux-saga/effects';

// Types
import { AuthenticationTypes } from '../actions/authentication';
import { EventTypes }          from '../actions/event';
import { BetTypes }            from '../actions/bet';

// Actions
import { EventActions } from '../actions/event';

// Sagas
import AuthenticationSagas from './authentication';
import AlertSagas          from './alert';
import EventSagas          from './event';
import BetSagas            from './bet';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthenticationTypes.LOGOUT],                         AuthenticationSagas.logout),
        takeLatest([AuthenticationTypes.VERIFY_SMS],                     AuthenticationSagas.verifySms),
        takeLatest([AuthenticationTypes.REQUEST_SMS],                    AuthenticationSagas.requestSms),
        takeLatest([AuthenticationTypes.SET_EMAIL],                      AuthenticationSagas.setAdditionalInformation),
        takeLatest([
            AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
        ],                                                                      AuthenticationSagas.authenticationSucceeded),
        takeLatest([
            AuthenticationTypes.REQUEST_SMS_FAILED,
            AuthenticationTypes.VERIFY_SMS_FAILED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
            EventTypes.FETCH_ALL_FAILED,
            BetTypes.CREATE_FAILED,
        ],                                                                      AlertSagas.handleFail),
        takeLatest([
            BetTypes.CREATE_SUCCEEDED,
        ],                                                                      AlertSagas.handleSuccess),
        takeLatest([EventTypes.FETCH_ALL],                               EventSagas.fetchAll),
        takeLatest([BetTypes.CREATE],                                    BetSagas.create),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.restoreToken),
        takeLatest([REHYDRATE],                                          rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
    yield put(EventActions.fetchAll());
};

export default {
    root,
};
