import update                  from 'immutability-helper';
import { AuthenticationTypes } from '../actions/authentication';
import AuthState               from '../../constants/AuthState';

const initialState = {
    loading:   false,
    userId:    null,
    name:      '',
    phone:     '',
    email:     '',
    token:     null,
    authState: AuthState.LOGGED_OUT,
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

const setName = (action, state) => {
    return update(state, {
        name:      {
            $set: action.name,
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

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case AuthenticationTypes.LOGOUT:                         return logout(action, state);
        case AuthenticationTypes.SET_EMAIL:                      return setEmail(action, state);
        case AuthenticationTypes.SET_NAME:                       return setName(action, state);
        case AuthenticationTypes.REQUEST_SMS_SUCCEEDED:          return requestSmsSucceeded(action, state);
        case AuthenticationTypes.VERIFY_SMS_SUCCEEDED:           return requestSmsVerified(action, state);
        case AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED: return saveAdditionalInfoSucceeded(action, state);
        case AuthenticationTypes.REQUEST_SMS:
        case AuthenticationTypes.VERIFY_SMS:                     return setLoading(action, state);
        case AuthenticationTypes.REQUEST_SMS_FAILED:
        case AuthenticationTypes.VERIFY_SMS_FAILED:
        case AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED:   return resetLoading(action, state);
        default:                                                return state;
        // @formatter:on
    }
}