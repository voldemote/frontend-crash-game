export default class Api {
    static getBackendUrl () {
        if (this.isLocal()) {
            return LOCAL_BACKEND_URL;
        }

        return PRODUCTION_BACKEND_URL;
    };

    static getBackendSocketUrl () {
        if (this.isLocal()) {
            return LOCAL_BACKEND_SOCKET_URL;
        }

        return PRODUCTION_BACKEND_SOCKET_URL;
    };

    static isLocal () {
        const url                       = window.location.href;
        const localBackendUrlIndicators = [
            '.test',
            'localhost',
            '127.0.0.1',
        ];

        for (const localBackendUrlIndicator of localBackendUrlIndicators) {
            if (url.indexOf(localBackendUrlIndicator) > -1) {
                return true;
            }
        }

        return false;
    }
}

export const PRODUCTION_BACKEND_URL               = 'https://backend-odxda.ondigitalocean.app';
export const PRODUCTION_BACKEND_SOCKET_URL        = 'wss://frontend-ce4ef.ondigitalocean.app/socket.io';
export const LOCAL_BACKEND_URL                    = 'http://localhost:8000';
export const LOCAL_BACKEND_SOCKET_URL             = 'ws://localhost:8999';
export const BACKEND_URL                          = Api.getBackendUrl();
export const BACKEND_SOCKET_URL                   = Api.getBackendSocketUrl();
export const API_AUTHENTICATION_REQUEST_SMS_URL   = 'api/user/login';
export const API_AUTHENTICATION_SAVE_ADD_INFO_URL = 'api/user/saveAdditionalInformation';
export const API_AUTHENTICATION_VERIFY_SMS_URL    = 'api/user/verifyLogin';
export const API_BET_CREATE                       = 'api/event/bet/create';
export const API_BET_OUTCOMES                     = 'api/event/bet/:id/outcomes';
export const API_BET_PLACE                        = 'api/event/bet/:id/place';
export const API_EVENT_CREATE                     = 'api/event/create';
export const API_EVENT_LIST                       = 'api/event/list';
export const API_USER                             = 'api/user/:id';