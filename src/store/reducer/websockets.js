import { WebsocketsTypes } from "../actions/websockets";

const initialState = {
    init: false,
    connected: false
};

const initSucceeded = (action, state) => {
    return { ...state, init: true, connected: true };
};
const close = (action, state) => {
    return { ...state, init: false, connected: false };
};
const connected = (action, state) => {
    return { ...state, connected: true };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case WebsocketsTypes.INIT_SUCCEEDED:
            return initSucceeded(action, state);
        case WebsocketsTypes.CLOSE:
            return close(action, state);
        case WebsocketsTypes.CONNECTED:
            return connected(action, state);
        default:
            return state;
        // @formatter:on
    }
}
