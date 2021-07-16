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
    ).catch((error) => {
        console.log('[API Error] called: requestSms', error);
    });
};

const verifySms = (phone, smsToken) => {
    return Api.post(
        ApiUrls.API_AUTHENTICATION_VERIFY_SMS_URL,
        {
            phone,
            smsToken,
        },
    ).catch((error) => {
        console.log('[API Error] called: verifySms', error);
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
    ).catch((error) => {
        console.log('[API Error] called: saveAdditionalInfo', error);
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
    ).catch((error) => {
        console.log('[API Error] called: fetchReferrals', error);
    });
};

const listEvents = () => {
    return Api.get(
        ApiUrls.API_EVENT_LIST,
    ).catch((error) => {
        console.log('[API Error] called: listEvents', error);
    });
};

const getUser = (userId) => {
    return Api.get(
        _.replace(ApiUrls.API_USER, ':id', userId),
    ).catch((error) => {
        console.log('[API Error] called: getUser', error);
    });
};

const getLeaderboard = () => {
    return Api.get(
        ApiUrls.API_LEADERBOARD,
    ).catch((error) => {
        console.log('[API Error] called: getLeaderboard', error);
    });
}

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
    ).catch((error) => {
        console.log('[API Error] called: createBet', error);
    });
};

const getOutcomes = (betId, amount) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_OUTCOMES, ':id', betId),
        {
            amount,
        },
    ).catch((error) => {
        console.log('[API Error] called: getOutcomes', error);
    });
};

const getSellOutcomes = (betId, amount) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_SELL_OUTCOMES, ':id', betId),
        {
            amount,
        },
    ).catch((error) => {
        console.log('[API Error] called: getSellOutcomes', error);
    });
};

const pullOutBet = (betId, amount, outcome) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PULL_OUT, ':id', betId),
        {
            amount,
            outcome,
        },
    ).catch((error) => {
        console.log('[API Error] called: pullOutBet', error);
    });
};

const getOpenBets = () => {
    return Api.get(
        ApiUrls.API_USER_OPEN_BETS,
    ).catch((error) => {
        console.log('[API Error] called: getOpenBets', error);
    });
};

const getTransactions = () => {
    return Api.get(
        ApiUrls.API_USER_HISTORY,
    ).catch((error) => {
        console.log('[API Error] called: getTransactions', error);
    });
};

const placeBet = (betId, amount, outcome) => {
    return Api.post(
        _.replace(ApiUrls.API_BET_PLACE, ':id', betId),
        {
            amount,
            outcome,
        },
    ).catch((error) => {
        console.log('[API Error] called: placeBet', error);
    });
};

const getChatMessagesByEventId = (eventId) => {
    return Api.get(
        _.replace(ApiUrls.API_EVENT_CHAT_MESSAGES, ':id', eventId),
    ).then(response => ({ response })
    ).catch((error) => {
        console.log('[API Error] called: getChatMessagesByEventId', error);
    });
};
export {
    Api,
    createBet,
    fetchReferrals,
    getChatMessagesByEventId,
    getOpenBets,
    getOutcomes,
    getSellOutcomes,
    getTransactions,
    getUser,
    getLeaderboard,
    listEvents,
    placeBet,
    pullOutBet,
    requestSms,
    saveAdditionalInfo,
    setToken,
    verifySms,
};
