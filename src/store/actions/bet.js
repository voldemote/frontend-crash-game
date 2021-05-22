import { makeActionCreator } from '../../helper/Store';

export const BetTypes = {
    CREATE:           'Bet/CREATE',
    CREATE_FAILED:    'Bet/CREATE_FAILED',
    CREATE_SUCCEEDED: 'Bet/CREATE_SUCCEEDED',
};

const create = makeActionCreator(
    BetTypes.CREATE,
    {
        eventId:        null,
        marketQuestion: null,
        outcomes:       null,
        startDate:      null,
        endDate:        null,
    },
);

const createSucceeded = makeActionCreator(
    BetTypes.CREATE_SUCCEEDED,
    {
        bet: null,
    },
);

const createFailed = makeActionCreator(
    BetTypes.CREATE_FAILED,
);

export const BetActions = {
    create,
    createSucceeded,
    createFailed,
};
