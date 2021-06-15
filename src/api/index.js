import * as ApiUrls               from '../constants/Api';
import axios                      from 'axios';
import ContentTypes               from '../constants/ContentTypes';
import _                          from 'lodash';
import { API_USER_REFERRAL_LIST } from '../constants/Api';
import { API_USER_OPEN_BETS }     from '../constants/Api';

const createInstance = (host, apiPath) => {
    return axios.create({
        baseURL: `${host}${apiPath}`,
        timeout: 30000,
        headers: {
            'content-type': ContentTypes.applicationJSON,
            'accept':       ContentTypes.applicationJSON,
        },
    });
};

const Api = createInstance(ApiUrls.BACKEND_URL, '/');

const setToken = (token) => {
    const authentication = 'Bearer ' + token;

    Api.defaults.headers.common['Authorization'] = authentication;
};

const requestSms = (phone, ref) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_REQUEST_SMS_URL,
        {
            phone,
            ref,
        },
    ).catch(() => {
    });
};

const verifySms = (phone, smsToken) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_VERIFY_SMS_URL,
        {
            phone,
            smsToken,
        },
    ).catch(() => {
    });
};

const saveAdditionalInfo = (name, email) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_SAVE_ADD_INFO_URL,
        {
            name,
            email,
        },
    ).catch(() => {
    });
};

const fetchReferrals = (userId) => {
    return Api.get(
        ApiUrls.API_USER_REFERRAL_LIST,
        {
            user: {
                id: userId,
            },
        },
    ).catch(() => {
    });
};

const listEvents = () => {
    return Api.get(
        ApiUrls.API_EVENT_LIST,
    ).catch(() => {
    });
};

const getUser = (userId) => {
    return Api.get(
        _.replace(ApiUrls.API_USER, ':id', userId),
    ).catch(() => {
    });
};

const createBet = (eventId, marketQuestion, description, betOne, betTwo, endDate, liquidityAmount) => {
    return Api.post(
        ApiUrls.API_BET_CREATE,
        {
            eventId,
            marketQuestion,
            description,
            betOne,
            betTwo,
            endDate,
            liquidityAmount,
        },
    ).catch(() => {
    });
};

const getOutcomes = (betId, amount) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_OUTCOMES, ':id', betId),
        {
            amount,
        },
    ).catch(() => {
    });
};

const pullOutBet = (betId, amount, isOutcomeOne) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PULL_OUT, ':id', betId),
        {
            amount,
            isOutcomeOne,
        },
    ).catch(() => {
    });
};

const getOpenBets = () => {
    return Api.get(
        ApiUrls.API_USER_OPEN_BETS,
    ).catch(() => {
    });
};

const placeBet = (betId, amount, isOutcomeOne) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PLACE, ':id', betId),
        {
            amount,
            isOutcomeOne,
        },
    ).catch(() => {
    });
};

export {
    Api,
    createBet,
    fetchReferrals,
    getOpenBets,
    getOutcomes,
    getUser,
    listEvents,
    placeBet,
    pullOutBet,
    requestSms,
    saveAdditionalInfo,
    setToken,
    verifySms,
};