import * as Api                 from '../../api';
import { AuthorizationActions } from '../actions/authorization';
import { put, call, select }    from 'redux-saga/effects';

const requestSms = function* (action) {
    const statePhone = yield select(state => state.authorization.phone);
    let phone        = action.phone;

    if (!phone) {
        phone = statePhone;
    }

    if (phone) {
        if (!phone.startsWith('+')) {
            phone = '+' + phone;
        }

        const response = yield call(
            Api.requestSms,
            phone,
        );

        if (response) {
            const data = response.data;

            yield put(AuthorizationActions.requestSmsSucceeded({
                ...data,
            }));
            return;
        }
    }

    yield put(AuthorizationActions.requestSmsFailed({
        phone,
    }));
};

const verifySms = function* (action) {
    const phone    = yield select(state => state.authorization.phone);
    const smsToken = action.smsToken;

    if (phone) {
        const response = yield call(
            Api.verifySms,
            phone,
            smsToken,
        );

        if (response) {
            const data = response.data;
            console.debug(response, data);

            Api.setToken(data.session);

            yield put(AuthorizationActions.verifySmsSucceeded({
                ...data,
            }));
        } else {
            yield put(AuthorizationActions.verifySmsFailed());
        }
    } else {
        yield put(AuthorizationActions.verifySmsFailed());
    }
};

const setAdditionalInformation = function* (action) {
    const email = yield select(state => state.authorization.email);
    const name  = yield select(state => state.authorization.name);

    const response = yield call(
        Api.saveAdditionalInfo,
        name,
        email,
    );

    if (response) {
        const data = response.data;

        yield put(AuthorizationActions.saveAdditionalInfoSucceeded({
            ...data,
        }));
    } else {
        yield put(AuthorizationActions.saveAdditionalInfoFailed());
    }
};

export default {
    requestSms,
    verifySms,
    setAdditionalInformation,
};
