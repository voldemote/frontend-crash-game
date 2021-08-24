import update from 'immutability-helper';
import { EventTypes } from '../actions/event';

const initialState = {
    events: [],
    filteredEvents: [],
    defaultParams: {
        type: 'all',
        category: 'all',
        count: '30',
        page: '1',
        sortBy: 'name',
        searchQuery: '',
    },
    eventSortOptions: [
        {
            label: 'Alphabetically (A-Z)',
            value: 'name',
        },
        {
            label: 'Alphabetically (Z-A)',
            value: '-name',
        },
        {
            label: 'End date (newest first)',
            value: 'date',
        },
        {
            label: 'End date (oldest first)',
            value: '-date',
        },
    ],
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

const setDefaultParamsValues = (state, { payload }) => {
    return {
        ...state,
        defaultParams: {
            ...state.defaultParams,
            ...payload,
        },
    };
};

const resetDefaultParamsValues = (state, { payload }) => {
    return {
        ...state,
        defaultParams: {
            type: 'all',
            category: 'all',
            count: '30',
            page: '1',
            sortBy: 'name',
            searchQuery: '',
        },
    };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case EventTypes.FETCH_ALL_SUCCEEDED:
            return fetchAllSucceeded(action, state);
        case EventTypes.FETCH_FILTERED_SUCCESS:
            return setFilteredEvents(state, action);
        case EventTypes.SET_DEFAULT_PARAMS_VALUES:
            return setDefaultParamsValues(state, action);
        case EventTypes.RESET_DEFAULT_PARAMS_VALUES:
            return resetDefaultParamsValues(state, action);
        default:
            return state;
        // @formatter:on
    }
}
