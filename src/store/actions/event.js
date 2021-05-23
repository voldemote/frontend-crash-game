import { makeActionCreator } from '../../helper/Store';

export const EventTypes = {
    FETCH_ALL:           'Event/FETCH_ALL',
    FETCH_ALL_FAILED:    'Event/FETCH_ALL_FAILED',
    FETCH_ALL_SUCCEEDED: 'Event/FETCH_ALL_SUCCEEDED',
};

const fetchAll = makeActionCreator(
    EventTypes.FETCH_ALL,
);

const fetchAllSucceeded = makeActionCreator(
    EventTypes.FETCH_ALL_SUCCEEDED,
    {
        events: null,
    },
);

const fetchAllFailed = makeActionCreator(
    EventTypes.FETCH_ALL_FAILED,
);

export const EventActions = {
    fetchAll,
    fetchAllSucceeded,
    fetchAllFailed,
};
