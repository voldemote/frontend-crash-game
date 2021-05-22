import update         from 'immutability-helper';
import { EventTypes } from '../actions/event';

const initialState = {
    events: [],
};

const fetchAllSucceeded = (action, state) => {
    console.debug(action);
    return update(state, {
        events: {
            $set: action.events,
        },
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case EventTypes.FETCH_ALL_SUCCEEDED: return fetchAllSucceeded(action, state);
        default:                             return state;
        // @formatter:on
    }
}