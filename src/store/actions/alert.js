import { makeActionCreator } from '../../helper/Store';

export const AlertTypes = {
    REMOVE_ALL:   'Alert/REMOVE_ALL',
    REMOVE:       'Alert/REMOVE',
    SHOW_ERROR:   'Alert/SHOW_ERROR',
    SHOW_SUCCESS: 'Alert/SHOW_SUCCESS',
};

const removeAlerts = makeActionCreator(
    AlertTypes.REMOVE_ALL,
);

const removeAlert = makeActionCreator(
    AlertTypes.REMOVE,
    {
        id: null,
    },
);

const showError = makeActionCreator(
    AlertTypes.SHOW_ERROR,
    {
        message: null,
    },
);

const showSuccess = makeActionCreator(
    AlertTypes.SHOW_SUCCESS,
    {
        message: null,
    },
);

export const AlertActions = {
    removeAlerts,
    removeAlert,
    showError,
    showSuccess,
};
