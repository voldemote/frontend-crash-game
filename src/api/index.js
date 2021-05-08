import * as ApiUrls                            from '../constants/Api';
import axios                                   from 'axios';
import ContentTypes                            from '../constants/ContentTypes';
import { API_AUTHORIZATION_SAVE_ADD_INFO_URL } from '../constants/Api';

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
    const authorization = 'Bearer ' + token;

    Api.defaults.headers.common['Authorization'] = authorization;
};

const requestSms = (phone) => {
    return Api.post(
        ApiUrls.API_AUTHORIZATION_REQUEST_SMS_URL,
        {
            phone,
        },
    ).catch(() => {
    });
};

const verifySms = (phone, smsToken) => {
    return Api.post(
        ApiUrls.API_AUTHORIZATION_VERIFY_SMS_URL,
        {
            phone,
            smsToken,
        },
    ).catch(() => {
    });
};

const saveAdditionalInfo = (name, email) => {
    return Api.post(
        ApiUrls.API_AUTHORIZATION_SAVE_ADD_INFO_URL,
        {
            name,
            email,
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
};