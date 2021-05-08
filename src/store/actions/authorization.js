import { makeActionCreator } from '../../helper/Store';

export const AuthorizationTypes = {
    REQUEST_SMS:                    'Authorization/REQUEST_SMS',
    REQUEST_SMS_FAILED:             'Authorization/REQUEST_SMS_FAILED',
    REQUEST_SMS_SUCCEEDED:          'Authorization/REQUEST_SMS_SUCCEEDED',
    VERIFY_SMS:                     'Authorization/VERIFY_SMS',
    VERIFY_SMS_FAILED:              'Authorization/VERIFY_SMS_FAILED',
    VERIFY_SMS_SUCCEEDED:           'Authorization/VERIFY_SMS_SUCCEEDED',
    SET_NAME:                       'Authorization/SET_NAME',
    SET_EMAIL:                      'Authorization/SET_EMAIL',
    SAVE_ADDITIONAL_INFO_FAILED:    'Authorization/SAVE_ADDITIONAL_INFO_FAILED',
    SAVE_ADDITIONAL_INFO_SUCCEEDED: 'Authorization/SAVE_ADDITIONAL_INFO_SUCCEEDED',
};

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

const setName = makeActionCreator(
    AuthorizationTypes.SET_NAME,
    {
        name: null,
    },
);

const setEmail = makeActionCreator(
    AuthorizationTypes.SET_EMAIL,
    {
        email: null,
    },
);

const saveAdditionalInfoFailed = makeActionCreator(
    AuthorizationTypes.SAVE_ADDITIONAL_INFO_FAILED,
);

const saveAdditionalInfoSucceeded = makeActionCreator(
    AuthorizationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
);

export const AuthorizationActions = {
    requestSms,
    requestSmsFailed,
    requestSmsSucceeded,
    verifySms,
    verifySmsFailed,
    verifySmsSucceeded,
    setName,
    setEmail,
    saveAdditionalInfoFailed,
    saveAdditionalInfoSucceeded,
};