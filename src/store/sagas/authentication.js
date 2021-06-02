import * as Api                  from '../../api';
import AuthState                 from '../../constants/AuthState';
import Routes                    from '../../constants/Routes';
import { AuthenticationActions } from '../actions/authentication';
import { push }                  from 'connected-react-router';
import { put, call, select }     from 'redux-saga/effects';
import { EventActions }          from '../actions/event';
import { UserActions }           from '../actions/user';

const afterLoginRoute                = Routes.home;
const routesToRedirectWithoutSession = [
    Routes.welcome,
    Routes.bet,
    '/service-worker.js',
];

const requestSms = function* (action) {
    const statePhone = yield select(state => state.authentication.phone);
    const referral   = yield select(state => state.authentication.referral);
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
            referral
        );

        if (response) {
            const data = response.data;

            yield put(AuthenticationActions.requestSmsSucceeded({
                ...data,
            }));
            return;
        }
    }

    yield put(AuthenticationActions.requestSmsFailed({
        phone,
    }));
};

const verifySms = function* (action) {
    const phone    = yield select(state => state.authentication.phone);
    const smsToken = action.smsToken;

    if (phone) {
        const response = yield call(
            Api.verifySms,
            phone,
            smsToken,
        );

        if (response) {
            const data = response.data;

            Api.setToken(data.session);

            yield put(AuthenticationActions.verifySmsSucceeded({
                ...data,
            }));
        } else {
            yield put(AuthenticationActions.verifySmsFailed());
        }
    } else {
        yield put(AuthenticationActions.verifySmsFailed());
    }
};

const setAdditionalInformation = function* (action) {
    const email = yield select(state => state.authentication.email);
    const name  = yield select(state => state.authentication.name);

    const response = yield call(
        Api.saveAdditionalInfo,
        name,
        email,
    );

    if (response) {
        const data = response.data;

        yield put(AuthenticationActions.saveAdditionalInfoSucceeded({
            ...data,
        }));
    } else {
        yield put(AuthenticationActions.saveAdditionalInfoFailed());
    }
};

const authenticationSucceeded = function* (action) {
    const authState = yield select(state => state.authentication.authState);
    const userId    = yield select(state => state.authentication.userId);

    if (authState === AuthState.LOGGED_IN) {
        yield put(UserActions.fetch({ userId }));
        yield put(EventActions.fetchAll());
        yield put(push(afterLoginRoute));
    }
};

const logout = function* () {
    Api.setToken(null);

    yield put(push(Routes.welcome));
};

const restoreToken = function* () {
    const locationPathname = window.location.pathname;
    const locationSearch   = window.location.search;
    const pathname         = yield select(state => state.router.location.pathname);
    const authentication   = yield select(state => state.authentication);
    const token            = authentication.token;
    const authState        = authentication.authState;
    const queryParams      = new URLSearchParams(locationSearch);
    const referral         = queryParams.get('ref');

    if (referral) {
        yield put(AuthenticationActions.setReferral({ referral }));
    }

    if (token) {
        Api.setToken(token);
    }

    if (token && authState === AuthState.LOGGED_IN) {
        if (
            pathname === Routes.welcome ||
            locationPathname === Routes.welcome
        ) {
            yield put(push(afterLoginRoute));
        }
    } else if (
        routesToRedirectWithoutSession.indexOf(pathname) === -1 ||
        routesToRedirectWithoutSession.indexOf(locationPathname) === -1
    ) {
        yield put(push(Routes.welcome));
    }
};

export default {
    requestSms,
    verifySms,
    setAdditionalInformation,
    authenticationSucceeded,
    logout,
    restoreToken,
};
