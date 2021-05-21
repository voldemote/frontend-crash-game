import { all }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';

// Types
import { AuthenticationTypes } from '../actions/authentication';
import { EventTypes }      from '../actions/event';

// Actions

// Sagas
import AuthenticationSagas from './authentication';
import AlertSagas          from './alert';
import EventSagas          from './event';
import { EventActions }    from '../actions/event';
import { put }             from 'redux-saga/effects';

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
        ],                                                                      AlertSagas.handleFail),
        takeLatest([EventTypes.FETCH_ALL],                               EventSagas.fetchAll),
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
