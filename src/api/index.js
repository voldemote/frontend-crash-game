import * as ApiUrls from '../constants/Api';
import _            from 'lodash';
import axios        from 'axios';
import ContentTypes from '../constants/ContentTypes';

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

const saveAdditionalInfo = (name, username, email) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_SAVE_ADD_INFO_URL,
        {
            name,
            username,
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

const createBet = (eventId, marketQuestion, description, outcomes, endDate, liquidityAmount) => {
    return Api.post(
        ApiUrls.API_BET_CREATE,
        {
            eventId,
            marketQuestion,
            description,
            outcomes,
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

const getSellOutcomes = (betId, amount) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_SELL_OUTCOMES, ':id', betId),
        {
            amount,
        },
    ).catch(() => {
    });
};

const pullOutBet = (betId, amount, outcome) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PULL_OUT, ':id', betId),
        {
            amount,
            outcome,
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

const getTransactions = () => {
    return Api.get(
        ApiUrls.API_USER_HISTORY,
    ).catch(() => {
    });
};

const placeBet = (betId, amount, outcome) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PLACE, ':id', betId),
        {
            amount,
            outcome,
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
    getSellOutcomes,
    getTransactions,
    getUser,
    listEvents,
    placeBet,
    pullOutBet,
    requestSms,
    saveAdditionalInfo,
    setToken,
    verifySms,
};