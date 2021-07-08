import { makeActionCreator } from '../../helper/Store';

export const ChatTypes = {
    FETCH:           'Chat/FETCH',
    FETCH_FAILED:    'Chat/FETCH_FAILED',
    FETCH_SUCCEEDED: 'Chat/FETCH_SUCCEEDED',
    FETCH_INITIAL:           'Chat/FETCH_INITIAL',
    FETCH_INITIAL_FAILED:    'Chat/FETCH_INITIAL_FAILED',
    FETCH_INITIAL_SUCCEEDED: 'Chat/FETCH_INITIAL_SUCCEEDED',
    ADD_MESSAGE: 'Chat/ADD_MESSAGE',
};
// fetch is for getting past messages in a event room
const fetch = makeActionCreator(
    ChatTypes.FETCH,
    {
        eventId: null,
    },
);

const fetchSucceeded = makeActionCreator(
    ChatTypes.FETCH_SUCCEEDED,
    {
        eventId: null,
        messages: null,
    },
);


const fetchFailed = makeActionCreator(
    ChatTypes.FETCH_FAILED,
    {
        eventId: null,
    },
);

// fetch all is for getting initial data
const fetchInitial = makeActionCreator(
    ChatTypes.FETCH_INITIAL,
);

const fetchInitialSucceeded = makeActionCreator(
    ChatTypes.FETCH_INITIAL_SUCCEEDED,
    {
        eventId: null,
        messages: null,
    },
);

const fetchInitialFailed = makeActionCreator(
    ChatTypes.FETCH_INITIAL_FAILED,
    {
        eventId: null,
    },
    );

const addMessage = makeActionCreator(
    ChatTypes.ADD_MESSAGE,
    {
        eventId: null,
        message: null,
    },
);
export const ChatActions = {
    fetch,
    fetchSucceeded,
    fetchFailed,
    fetchInitial,
    fetchInitialSucceeded,
    fetchInitialFailed,
    addMessage,
};
