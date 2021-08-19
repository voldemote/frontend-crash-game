import update                  from 'immutability-helper';
import { AuthenticationTypes } from '../actions/authentication';
import AuthState               from '../../constants/AuthState';

const initialState = {
    loading:        false,
    referral:       null,
    userId:         null,
    name:           '',
    username:       '',
    phone:          '',
    country:        '49',
    email:          '',
    emailVerificationState: null,
    token:          null,
    balance:        0,
    totalWin:       0,
    profilePicture: null,
    referralList:   [],
    admin:          false,
    authState:      AuthState.LOGGED_OUT,
    rank:           0,
    amountWon:      0,
    toNextRank:     0,
};

const requestSmsSucceeded = (action, state) => {
    return update(state, {
        loading:   {
            $set: false,
        },
        phone:     {
            $set: action.phone,
        },
        authState: {
            $set: AuthState.SMS_SENT,
        },
    });
};

const requestSmsVerified = (action, state) => {
    let authState = AuthState.LOGGED_IN;
    const name    = action.name;
    const email   = action.email;

    if (!email) {
        authState = AuthState.SET_EMAIL;
    }

    if (!name) {
        authState = AuthState.SET_NAME;
    }

    return update(state, {
        loading:   {
            $set: false,
        },
        userId:    {
            $set: action.userId,
        },
        name:      {
            $set: name,
        },
        email:     {
            $set: email,
        },
        token:     {
            $set: action.session,
        },
        authState: {
            $set: authState,
        },
    });
};

const requestEmailVerified = (action, state) => {
    return update(state, {
        emailVerificationState:   {
            $set: true,
        },
    });
};

const requestEmailFailed = (action, state) => {
    return update(state, {
        emailVerificationState:   {
            $set: false,
        },
    });
};

const setName = (action, state) => {
    return update(state, {
        name:      {
            $set: action.name,
        },
        username:  {
            $set: action.username,
        },
        authState: {
            $set: AuthState.SET_EMAIL,
        },
    });
};

const setEmail = (action, state) => {
    return update(state, {
        loading: {
            $set: true,
        },
        email:   {
            $set: action.email,
        },
    });
};

const setPhone = (action, state) => {
    return update(state, {
        phone: {
            $set: action.phone,
        },
    });
};

const setCountryCode = (action, state) => {
    return update(state, {
        country: {
            $set: action.country,
        },
    });
};

const saveAdditionalInfoSucceeded = (action, state) => {
    return update(state, {
        loading:   {
            $set: false,
        },
        authState: {
            $set: AuthState.LOGGED_IN,
        },
    });
};

const updateData = (action, state) => {
    return update(state, {
        balance:        {
            $set: action.balance,
        },
        profilePicture: {
            $set: action.profilePicture,
        },
        name:           {
            $set: action.name,
        },
        username:       {
            $set: action.username,
        },
        email:          {
            $set: action.email,
        },
        admin:          {
            $set: action.admin,
        },
        totalWin:       {
            $set: action.totalWin,
        },
        rank:           {
            $set: action.rank,
        },
        amountWon:      {
            $set: action.amountWon
        },
        toNextRank:      {
            $set: action.toNextRank
        },
    });
};

const logout = (action, state) => {
    return update(state, {
        $set: initialState,
    });
};

const resetLoading = (action, state) => {
    return update(state, {
        loading: {
            $set: false,
        },
    });
};

const setLoading = (action, state) => {
    return update(state, {
        loading: {
            $set: true,
        },
    });
};

const setReferral = (action, state) => {
    return update(state, {
        referral: {
            $set: action.referral,
        },
    });
};

const fetchReferralsSucceeded = (action, state) => {
    return update(state, {
        referralList: {
            $set: action.referralList,
        },
    });
};

const resetAuthState = (action, state) => {
    const authState = state.authState;

    if (
        authState !== AuthState.LOGGED_OUT &&
        authState !== AuthState.LOGGED_IN
    ) {
        return update(state, {
            authState: {
                $set: AuthState.LOGGED_OUT,
            },
        });
    }

    return state;
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case AuthenticationTypes.LOGOUT:                         return logout(action, state);
        case AuthenticationTypes.SET_EMAIL:                      return setEmail(action, state);
        case AuthenticationTypes.SET_NAME:                       return setName(action, state);
        case AuthenticationTypes.SET_PHONE:                      return setPhone(action, state);
        case AuthenticationTypes.SET_COUNTRY_CODE:               return setCountryCode(action, state);
        case AuthenticationTypes.REQUEST_SMS_SUCCEEDED:          return requestSmsSucceeded(action, state);
        case AuthenticationTypes.VERIFY_SMS_SUCCEEDED:           return requestSmsVerified(action, state);
        case AuthenticationTypes.VERIFY_EMAIL_SUCCEEDED:         return requestEmailVerified(action, state);
        case AuthenticationTypes.VERIFY_EMAIL_FAILED:            return requestEmailFailed(action, state);
        case AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED: return saveAdditionalInfoSucceeded(action, state);
        case AuthenticationTypes.REQUEST_SMS:
        case AuthenticationTypes.VERIFY_SMS:                     return setLoading(action, state);
        case AuthenticationTypes.REQUEST_SMS_FAILED:
        case AuthenticationTypes.VERIFY_SMS_FAILED:
        case AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED:   return resetLoading(action, state);
        case AuthenticationTypes.UPDATE_DATA:                   return updateData(action, state);
        case AuthenticationTypes.SET_REFERRAL:                  return setReferral(action, state);
        case AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED:     return fetchReferralsSucceeded(action, state);
        case AuthenticationTypes.RESET_AUTH_STATE:              return resetAuthState(action, state);
        default:                                                return state;
        // @formatter:on
    }
}
