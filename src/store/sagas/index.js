import { all }        from 'redux-saga/effects';
import { put }        from 'redux-saga/effects';
import { REHYDRATE }  from 'redux-persist';
import { takeLatest } from 'redux-saga/effects';

// Types
import { AuthorizationTypes } from '../actions/authorization';

// Actions

// Sagas
import AuthorizationSagas from './authorization';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthorizationTypes.VERIFY_SMS],  AuthorizationSagas.verifySms),
        takeLatest([AuthorizationTypes.REQUEST_SMS], AuthorizationSagas.requestSms),
        takeLatest([AuthorizationTypes.SET_EMAIL],   AuthorizationSagas.setAdditionalInformation),
        takeLatest([REHYDRATE],                      rehydrationDone),
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
