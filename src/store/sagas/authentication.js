import * as Api                     from '../../api';
import _                            from 'lodash';
import AuthState                    from '../../constants/AuthState';
import Routes                       from '../../constants/Routes';
import { AuthenticationActions }    from '../actions/authentication';
import { EventActions }             from '../actions/event';
import { push }                     from 'connected-react-router';
import { put, call, select, delay } from 'redux-saga/effects';
import { UserActions }              from '../actions/user';
import { BetActions }               from '../actions/bet';
import { TransactionActions }       from '../actions/transaction';

const afterLoginRoute                = Routes.home;
const routesToRedirectWithoutSession = [
    Routes.welcome,
    Routes.bet,
    '/service-worker.js',
];

const requestSms = function* (action) {
    const country   = yield select(state => state.authentication.country);
    const phone     = yield select(state => state.authentication.phone);
    const referral  = yield select(state => state.authentication.referral);
    let phoneNumber = country + phone;

    if (phoneNumber) {
        if (!phoneNumber.startsWith('+')) {
            phoneNumber = '+' + phoneNumber;
        }

        const response = yield call(
            Api.requestSms,
            phoneNumber,
            referral,
        );

        if (response) {
            const data = response.data;

            yield put(AuthenticationActions.requestSmsSucceeded({
                ...data,
                phone,
                country,
            }));
            return;
        }
    }

    yield put(AuthenticationActions.requestSmsFailed({
        phone,
    }));
};

const verifySms = function* (action) {
    const country   = yield select(state => state.authentication.country);
    const phone     = yield select(state => state.authentication.phone);
    const smsToken  = action.smsToken;
    let phoneNumber = country + phone;

    if (phoneNumber) {
        if (!phoneNumber.startsWith('+')) {
            phoneNumber = '+' + phoneNumber;
        }

        const response = yield call(
            Api.verifySms,
            phoneNumber,
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
    const email    = yield select(state => state.authentication.email);
    const name     = yield select(state => state.authentication.name);
    const username = yield select(state => state.authentication.username);

    const response = yield call(
        Api.saveAdditionalInfo,
        name,
        username,
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

const fetchReferrals = function* () {
    const userId = yield select(state => state.authentication.userId);

    if (userId) {
        const response = yield call(
            Api.fetchReferrals,
            userId,
        );

        if (response) {
            const referralList = _.get(response.data, 'refList', []);

            yield put(AuthenticationActions.fetchReferralsSucceeded({
                referralList,
            }));
        } else {
            yield put(AuthenticationActions.fetchReferralsFailed());
        }
    }
};

const fetchReferralsSucceeded = function* (action) {
    const referralList = action.referralList;

    for (const referral of referralList) {
        const userId = _.get(referral, 'id');

        if (userId) {
            yield put(UserActions.fetch({
                userId,
                forceFetch: false,
            }));
        }
    }
};

const authenticationSucceeded = function* (action) {
    const authState = yield select(state => state.authentication.authState);
    const userId    = yield select(state => state.authentication.userId);

    if (authState === AuthState.LOGGED_IN) {
        yield put(UserActions.fetch({ userId, forceFetch: true }));
        yield put(EventActions.fetchAll());
        yield put(AuthenticationActions.fetchReferrals());
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

    if (authState !== AuthState.LOGGED_IN) {
        if (authState !== AuthState.LOGGED_OUT) {
            yield put(AuthenticationActions.resetAuthState());
        }

        const queryParams = new URLSearchParams(locationSearch);
        const referral    = queryParams.get('ref');

        if (referral) {
            yield put(AuthenticationActions.setReferral({ referral }));
        }
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

const refreshImportantData = function* () {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        yield put(UserActions.fetch({ forceFetch: true }));
        yield put(EventActions.fetchAll());
        yield put(AuthenticationActions.fetchReferrals());
        yield put(BetActions.fetchOpenBets());
        yield put(TransactionActions.fetchAll());

        yield delay(30 * 1000);
        yield call(refreshImportantData);
    }
};

export default {
    authenticationSucceeded,
    fetchReferrals,
    fetchReferralsSucceeded,
    logout,
    requestSms,
    restoreToken,
    setAdditionalInformation,
    refreshImportantData,
    verifySms,
};
