import { makeActionCreator } from '../../helper/Store';

export const UserTypes = {
    FETCH:           'User/FETCH',
    FETCH_SUCCEEDED: 'User/FETCH_SUCCEEDED',
    FETCH_FAILED:    'User/FETCH_FAILED',
    UPDATE:          'User/UPDATE',
    UPDATE_SUCCEEDED: 'User/UPDATE_SUCCEEDED',
    UPDATE_FAILED   : 'User/UPDATE_FAILED',
};

const fetch = makeActionCreator(
    UserTypes.FETCH,
    {
        userId:     null,
        forceFetch: false,
    },
);

const fetchFailed = makeActionCreator(
    UserTypes.FETCH_FAILED,
    {
        userId: null,
    },
);

const fetchSucceeded = makeActionCreator(
    UserTypes.FETCH_SUCCEEDED,
    {
        user: null,
    },
);

const update = makeActionCreator(
    UserTypes.UPDATE, {
        userId: null,
        user: {
            name: null,
            username: null,
            email: null,
            profilePicture: null,
        },
    }
)

const updateSucceeded = makeActionCreator(
    UserTypes.UPDATE, {
        userId: null,
        user: {
            name: null,
            username: null,
            email: null,
            profilePicture: null,
        },
    }
)

const updateFailed = makeActionCreator(
    UserTypes.UPDATE, {
        userId: null,
        user: {
            name: null,
            username: null,
            email: null,
            profilePicture: null,
        },
    }
)

export const UserActions = {
    fetch,
    fetchFailed,
    fetchSucceeded,
    update,
    updateFailed,
    updateSucceeded,
};
