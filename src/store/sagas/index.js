import { all }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';

// Types
import { AuthenticationTypes } from '../actions/authentication';

// Actions

// Sagas
import AuthenticationSagas from './authentication';
import AlertSagas          from './alert';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthenticationTypes.LOGOUT],                         AuthenticationSagas.logout),
        takeLatest([AuthenticationTypes.VERIFY_SMS],                     AuthenticationSagas.verifySms),
        takeLatest([AuthenticationTypes.REQUEST_SMS],                    AuthenticationSagas.requestSms),
        takeLatest([AuthenticationTypes.SET_EMAIL],                      AuthenticationSagas.setAdditionalInformation),
        takeLatest([AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED], AuthenticationSagas.saveAdditionalInformationSucceeded),
        takeLatest([
            AuthenticationTypes.REQUEST_SMS_FAILED,
            AuthenticationTypes.VERIFY_SMS_FAILED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
        ],                                                                      AlertSagas.handleFail),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.restoreToken),
        takeLatest([REHYDRATE],                                          rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
};

export default {
    root,
};
