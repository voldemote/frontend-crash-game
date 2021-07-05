import { makeActionCreator } from '../../helper/Store';

export const AuthenticationTypes = {
    FETCH_REFERRALS:                'Authentication/FETCH_REFERRALS',
    FETCH_REFERRALS_FAILED:         'Authentication/FETCH_REFERRALS_FAILED',
    FETCH_REFERRALS_SUCCEEDED:      'Authentication/FETCH_REFERRALS_SUCCEEDED',
    LOGOUT:                         'Authentication/LOGOUT',
    REQUEST_SMS:                    'Authentication/REQUEST_SMS',
    REQUEST_SMS_FAILED:             'Authentication/REQUEST_SMS_FAILED',
    REQUEST_SMS_SUCCEEDED:          'Authentication/REQUEST_SMS_SUCCEEDED',
    SAVE_ADDITIONAL_INFO_FAILED:    'Authentication/SAVE_ADDITIONAL_INFO_FAILED',
    SAVE_ADDITIONAL_INFO_SUCCEEDED: 'Authentication/SAVE_ADDITIONAL_INFO_SUCCEEDED',
    SET_EMAIL:                      'Authentication/SET_EMAIL',
    SET_NAME:                       'Authentication/SET_NAME',
    SET_PHONE:                      'Authentication/SET_PHONE',
    SET_COUNTRY_CODE:               'Authentication/SET_COUNTRY_CODE',
    SET_REFERRAL:                   'Authentication/SET_REFERRAL',
    UPDATE_DATA:                    'Authentication/UPDATE_DATA',
    VERIFY_SMS:                     'Authentication/VERIFY_SMS',
    VERIFY_SMS_FAILED:              'Authentication/VERIFY_SMS_FAILED',
    VERIFY_SMS_SUCCEEDED:           'Authentication/VERIFY_SMS_SUCCEEDED',
    RESET_AUTH_STATE:               'Authentication/RESET_AUTH_STATE',
};

const fetchReferrals = makeActionCreator(
    AuthenticationTypes.FETCH_REFERRALS,
);

const fetchReferralsFailed = makeActionCreator(
    AuthenticationTypes.FETCH_REFERRALS_FAILED,
);

const fetchReferralsSucceeded = makeActionCreator(
    AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED,
    {
        referralList: null,
    },
);
const logout                  = makeActionCreator(
    AuthenticationTypes.LOGOUT,
);

const requestSms = makeActionCreator(
    AuthenticationTypes.REQUEST_SMS,
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

const setPhone = makeActionCreator(
    AuthenticationTypes.SET_PHONE,
    {
        phone: null,
    },
);

const setCountry = makeActionCreator(
    AuthenticationTypes.SET_COUNTRY_CODE,
    {
        country: null,
    },
);

const setName = makeActionCreator(
    AuthenticationTypes.SET_NAME,
    {
        name:     null,
        username: null,
    },
);

const setReferral = makeActionCreator(
    AuthenticationTypes.SET_REFERRAL,
    {
        referral: null,
    },
);

const updateData = makeActionCreator(
    AuthenticationTypes.UPDATE_DATA,
    {
        balance:        null,
        profilePicture: null,
        username:       null,
        admin:          false,
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

const resetAuthState = makeActionCreator(
    AuthenticationTypes.RESET_AUTH_STATE,
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

export const AuthenticationActions = {
    fetchReferrals,
    fetchReferralsFailed,
    fetchReferralsSucceeded,
    logout,
    requestSms,
    requestSmsFailed,
    requestSmsSucceeded,
    saveAdditionalInfoFailed,
    saveAdditionalInfoSucceeded,
    setEmail,
    setName,
    setPhone,
    setCountry,
    setReferral,
    updateData,
    verifySms,
    verifySmsFailed,
    verifySmsSucceeded,
    resetAuthState,
};