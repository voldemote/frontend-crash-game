import { makeActionCreator } from '../../helper/Store';

export const AuthenticationTypes = {
    LOGOUT:                         'Authentication/LOGOUT',
    REQUEST_SMS:                    'Authentication/REQUEST_SMS',
    REQUEST_SMS_FAILED:             'Authentication/REQUEST_SMS_FAILED',
    REQUEST_SMS_SUCCEEDED:          'Authentication/REQUEST_SMS_SUCCEEDED',
    SAVE_ADDITIONAL_INFO_FAILED:    'Authentication/SAVE_ADDITIONAL_INFO_FAILED',
    SAVE_ADDITIONAL_INFO_SUCCEEDED: 'Authentication/SAVE_ADDITIONAL_INFO_SUCCEEDED',
    SET_EMAIL:                      'Authentication/SET_EMAIL',
    SET_NAME:                       'Authentication/SET_NAME',
    VERIFY_SMS:                     'Authentication/VERIFY_SMS',
    VERIFY_SMS_FAILED:              'Authentication/VERIFY_SMS_FAILED',
    VERIFY_SMS_SUCCEEDED:           'Authentication/VERIFY_SMS_SUCCEEDED',
    UPDATE_DATA:                    'Authentication/UPDATE_DATA',
};

const logout = makeActionCreator(
    AuthenticationTypes.LOGOUT,
);

const requestSms = makeActionCreator(
    AuthenticationTypes.REQUEST_SMS,
    {
        phone: null,
    },
);

const requestSmsFailed = makeActionCreator(
    AuthenticationTypes.REQUEST_SMS_FAILED,
    {
        phone: null,
    },
);

const requestSmsSucceeded = makeActionCreator(
    AuthenticationTypes.REQUEST_SMS_SUCCEEDED,
    {
        phone:     null,
        smsStatus: null,
    },
);

const saveAdditionalInfoFailed = makeActionCreator(
    AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
);

const saveAdditionalInfoSucceeded = makeActionCreator(
    AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
);

const setEmail = makeActionCreator(
    AuthenticationTypes.SET_EMAIL,
    {
        email: null,
    },
);

const setName = makeActionCreator(
    AuthenticationTypes.SET_NAME,
    {
        name: null,
    },
);

const verifySms = makeActionCreator(
    AuthenticationTypes.VERIFY_SMS,
    {
        smsToken: null,
    },
);

const verifySmsFailed = makeActionCreator(
    AuthenticationTypes.VERIFY_SMS_FAILED,
);

const verifySmsSucceeded = makeActionCreator(
    AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
    {
        userId:  null,
        name:    null,
        email:   null,
        session: null,
    },
);

const updateData = makeActionCreator(
    AuthenticationTypes.UPDATE_DATA,
    {
        balance:        null,
        profilePicture: null,
    },
);

export const AuthenticationActions = {
    logout,
    requestSms,
    requestSmsFailed,
    requestSmsSucceeded,
    saveAdditionalInfoFailed,
    saveAdditionalInfoSucceeded,
    setEmail,
    setName,
    verifySms,
    verifySmsFailed,
    verifySmsSucceeded,
    updateData
};