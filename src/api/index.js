import * as ApiUrls from '../constants/Api';
import axios        from 'axios';
import ContentTypes from '../constants/ContentTypes';
import _            from 'lodash';

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

const requestSms = (phone) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_REQUEST_SMS_URL,
        {
            phone,
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

const createBet = (eventId, marketQuestion, betOne, betTwo, startDate, endDate, liquidityAmount) => {
    return Api.post(
        ApiUrls.API_BET_CREATE,
        {
            eventId,
            marketQuestion,
            betOne,
            betTwo,
            startDate,
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
    setToken,
    requestSms,
    verifySms,
    saveAdditionalInfo,
    listEvents,
    getUser,
    createBet,
    getOutcomes,
    placeBet,
};