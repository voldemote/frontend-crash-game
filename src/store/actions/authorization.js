import { makeActionCreator } from '../../helper/Store';

export const AuthorizationTypes = {
    LOGOUT:                         'Authorization/LOGOUT',
    REQUEST_SMS:                    'Authorization/REQUEST_SMS',
    REQUEST_SMS_FAILED:             'Authorization/REQUEST_SMS_FAILED',
    REQUEST_SMS_SUCCEEDED:          'Authorization/REQUEST_SMS_SUCCEEDED',
    SAVE_ADDITIONAL_INFO_FAILED:    'Authorization/SAVE_ADDITIONAL_INFO_FAILED',
    SAVE_ADDITIONAL_INFO_SUCCEEDED: 'Authorization/SAVE_ADDITIONAL_INFO_SUCCEEDED',
    SET_EMAIL:                      'Authorization/SET_EMAIL',
    SET_NAME:                       'Authorization/SET_NAME',
    VERIFY_SMS:                     'Authorization/VERIFY_SMS',
    VERIFY_SMS_FAILED:              'Authorization/VERIFY_SMS_FAILED',
    VERIFY_SMS_SUCCEEDED:           'Authorization/VERIFY_SMS_SUCCEEDED',
};

const logout = makeActionCreator(
    AuthorizationTypes.LOGOUT,
);

const requestSms = makeActionCreator(
    AuthorizationTypes.REQUEST_SMS,
    {
        phone: null,
    },
);

const requestSmsFailed = makeActionCreator(
    AuthorizationTypes.REQUEST_SMS_FAILED,
    {
        phone: null,
    },
);

const requestSmsSucceeded = makeActionCreator(
    AuthorizationTypes.REQUEST_SMS_SUCCEEDED,
    {
        phone:     null,
        smsStatus: null,
    },
);

const saveAdditionalInfoFailed = makeActionCreator(
    AuthorizationTypes.SAVE_ADDITIONAL_INFO_FAILED,
);

const saveAdditionalInfoSucceeded = makeActionCreator(
    AuthorizationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
);
const setEmail = makeActionCreator(
    AuthorizationTypes.SET_EMAIL,
    {
        email: null,
    },
);

const setName = makeActionCreator(
    AuthorizationTypes.SET_NAME,
    {
        name: null,
    },
);

const verifySms = makeActionCreator(
    AuthorizationTypes.VERIFY_SMS,
    {
        smsToken: null,
    },
);

const verifySmsFailed = makeActionCreator(
    AuthorizationTypes.VERIFY_SMS_FAILED,
);

const verifySmsSucceeded = makeActionCreator(
    AuthorizationTypes.VERIFY_SMS_SUCCEEDED,
    {
        userId:  null,
        name:    null,
        email:   null,
        session: null,
    },
);


export const AuthorizationActions = {
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
};