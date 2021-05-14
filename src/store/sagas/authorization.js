import * as Api                 from '../../api';
import AuthState                from '../../constants/AuthState';
import Routes                   from '../../constants/Routes';
import { AuthorizationActions } from '../actions/authorization';
import { push }                 from 'connected-react-router';
import { put, call, select }    from 'redux-saga/effects';

const afterLoginRoute                = Routes.home;
const routesToRedirectWithoutSession = [
    Routes.welcome,
    Routes.authentication,
];

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

const saveAdditionalInformationSucceeded = function* (action) {
    yield put(push(afterLoginRoute));
};

const logout = function* () {
    Api.setToken(null);

    yield put(push(Routes.welcome));
};

const restoreToken = function* () {
    const browserPathname = window.location.pathname;
    const pathname        = yield select(state => state.router.location.pathname);
    const authorization   = yield select(state => state.authorization);
    const token           = authorization.token;
    const authState       = authorization.authState;

    if (token) {
        Api.setToken(token);
    }

    if (token && authState === AuthState.LOGGED_IN) {
        if (
            pathname === Routes.welcome ||
            browserPathname === Routes.welcome ||
            pathname === Routes.authentication ||
            browserPathname === Routes.authentication) {
            yield put(push(afterLoginRoute));
        }
    } else if (
        routesToRedirectWithoutSession.indexOf(pathname) === -1 ||
        routesToRedirectWithoutSession.indexOf(browserPathname) === -1
    ) {
        yield put(push(Routes.welcome));
    }
};

export default {
    requestSms,
    verifySms,
    setAdditionalInformation,
    saveAdditionalInformationSucceeded,
    logout,
    restoreToken,
};
