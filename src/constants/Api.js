export default class Api {
    static getBackendUrl () {
        const url                       = window.location.href;
        const localBackendUrlIndicators = [
            '.test',
            'localhost',
            '127.0.0.1',
        ];

        for (const localBackendUrlIndicator of localBackendUrlIndicators) {
            if (url.indexOf(localBackendUrlIndicator) > -1) {
                return LOCAL_BACKEND_URL;
            }
        }

        return PRODUCTION_BACKEND_URL;
    };

    static getAbsoluteUri (path) {
        let backendUrl = BACKEND_URL;

        if (path.startsWith('/') && backendUrl.endsWith('/')) {
            backendUrl = backendUrl.slice(0, -1);
        }

        const absoluteUri = backendUrl + path;

        return absoluteUri;
    }
}

export const PRODUCTION_BACKEND_URL               = 'https://wallfair.herokuapp.com';
export const LOCAL_BACKEND_URL                    = 'http://localhost:8000';
export const BACKEND_URL                          = Api.getBackendUrl();
export const API_AUTHENTICATION_REQUEST_SMS_URL   = 'api/user/login';
export const API_AUTHENTICATION_SAVE_ADD_INFO_URL = 'api/user/saveAdditionalInformation';
export const API_AUTHENTICATION_VERIFY_SMS_URL    = 'api/user/verifyLogin';
export const API_EVENT_CREATE                     = 'api/event/create';
export const API_BET_CREATE                       = 'api/event/bet/create';
export const API_EVENT_LIST                       = 'api/event/list';
