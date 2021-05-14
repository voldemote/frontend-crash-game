import update                 from 'immutability-helper';
import { AuthorizationTypes } from '../actions/authorization';
import AuthState              from '../../constants/AuthState';

const initialState = {
    userId:    null,
    name:      '',
    phone:     '',
    email:     '',
    token:     null,
    authState: AuthState.LOGGED_OUT,
};

const requestSmsSucceeded = (action, state) => {
    return update(state, {
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
        email: {
            $set: action.email,
        },
    });
};

const saveAdditionalInfoSucceeded = (action, state) => {
    return update(state, {
        authState: {
            $set: AuthState.LOGGED_IN,
        },
    });
};

const logout = (action, state) => {
    console.debug(initialState);
    return update(state, {
        $set: initialState,
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case AuthorizationTypes.LOGOUT:                         return logout(action, state);
        case AuthorizationTypes.REQUEST_SMS_SUCCEEDED:          return requestSmsSucceeded(action, state);
        case AuthorizationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED: return saveAdditionalInfoSucceeded(action, state);
        case AuthorizationTypes.SET_EMAIL:                      return setEmail(action, state);
        case AuthorizationTypes.SET_NAME:                       return setName(action, state);
        case AuthorizationTypes.VERIFY_SMS_SUCCEEDED:           return requestSmsVerified(action, state);
        default:                                                return state;
        // @formatter:on
    }
}