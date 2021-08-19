import update from "immutability-helper";
import { EventTypes } from "../actions/event";

const initialState = {
    events: [],
    filteredEvents: [],
    defaultParams: {},
};

const fetchAllSucceeded = (action, state) => {
    return update(state, {
        events: {
            $set: action.events,
        },
    });
};

const setFilteredEvents = (state, { payload }) => {
    return {
        ...state,
        filteredEvents: payload,
    };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case EventTypes.FETCH_ALL_SUCCEEDED:
            return fetchAllSucceeded(action, state);
        case EventTypes.FETCH_FILTERED_SUCCESS:
            return setFilteredEvents(state, action);
        default:
            return state;
        // @formatter:on
    }
}
