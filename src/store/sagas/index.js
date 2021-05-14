import { all }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';

// Types
import { AuthorizationTypes } from '../actions/authorization';

// Actions

// Sagas
import AuthorizationSagas from './authorization';
import AlertSagas         from './alert';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthorizationTypes.LOGOUT],                         AuthorizationSagas.logout),
        takeLatest([AuthorizationTypes.VERIFY_SMS],                     AuthorizationSagas.verifySms),
        takeLatest([AuthorizationTypes.REQUEST_SMS],                    AuthorizationSagas.requestSms),
        takeLatest([AuthorizationTypes.SET_EMAIL],                      AuthorizationSagas.setAdditionalInformation),
        takeLatest([AuthorizationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED], AuthorizationSagas.saveAdditionalInformationSucceeded),
        takeLatest([
            AuthorizationTypes.REQUEST_SMS_FAILED,
            AuthorizationTypes.VERIFY_SMS_FAILED,
            AuthorizationTypes.SAVE_ADDITIONAL_INFO_FAILED,
        ],                                                                     AlertSagas.handleFail),
        takeLatest([REHYDRATE],                                         AuthorizationSagas.restoreToken),
        takeLatest([REHYDRATE],                                         rehydrationDone),
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
