import { makeActionCreator } from '../../helper/Store';

export const BetTypes = {
    CREATE:                    'Bet/CREATE',
    CREATE_FAILED:             'Bet/CREATE_FAILED',
    CREATE_SUCCEEDED:          'Bet/CREATE_SUCCEEDED',
    PLACE:                     'Bet/PLACE',
    PLACE_FAILED:              'Bet/PLACE_FAILED',
    PLACE_SUCCEEDED:           'Bet/PLACE_SUCCEEDED',
    SELECT_BET:                'Bet/SELECT_BET',
    SELECT_CHOICE:             'Bet/SELECT_CHOICE',
    SET_COMMITMENT:            'Bet/SET_COMMITMENT',
    SET_OUTCOMES:              'Bet/SET_OUTCOMES',
    FETCH_OUTCOMES:            'Bet/FETCH_OUTCOMES',
    FETCH_OPEN_BETS:           'Bet/FETCH_OPEN_BETS',
    FETCH_OPEN_BETS_SUCCEEDED: 'Bet/FETCH_OPEN_BETS_SUCCEEDED',
    FETCH_OPEN_BETS_FAILED:    'Bet/FETCH_OPEN_BETS_FAILED',
};

const create = makeActionCreator(
    BetTypes.CREATE,
    {
        eventId:         null,
        marketQuestion:  null,
        description:     null,
        outcomes:        null,
        endDate:         null,
        liquidityAmount: 1,
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

const place = makeActionCreator(
    BetTypes.PLACE,
    {
        betId:        null,
        amount:       null,
        isOutcomeOne: null,
    },
);

const placeSucceeded = makeActionCreator(
    BetTypes.PLACE_SUCCEEDED,
    {
        betId:   null,
        amount:  null,
        outcome: null,
    },
);

const placeFailed = makeActionCreator(
    BetTypes.PLACE_FAILED,
);

const selectBet = makeActionCreator(
    BetTypes.SELECT_BET,
    {
        eventId: null,
        betId:   null,
    },
);

const selectChoice = makeActionCreator(
    BetTypes.SELECT_CHOICE,
    {
        choice: null,
    },
);

const setCommitment = makeActionCreator(
    BetTypes.SET_COMMITMENT,
    {
        commitment: null,
        betId:      null,
    },
);

const setOutcomes = makeActionCreator(
    BetTypes.SET_OUTCOMES,
    {
        outcomes: [],
    },
);

const fetchOutcomes = makeActionCreator(
    BetTypes.FETCH_OUTCOMES,
    {
        betId:  null,
        amount: null,
    },
);

const fetchOpenBets = makeActionCreator(
    BetTypes.FETCH_OPEN_BETS,
);

const fetchOpenBetsSucceeded = makeActionCreator(
    BetTypes.FETCH_OPEN_BETS_SUCCEEDED,
    {
        openBets: null,
    },
);

const fetchOpenBetsFailed = makeActionCreator(
    BetTypes.FETCH_OPEN_BETS_FAILED,
);

export const BetActions = {
    create,
    createSucceeded,
    createFailed,
    place,
    placeSucceeded,
    placeFailed,
    selectBet,
    selectChoice,
    setCommitment,
    setOutcomes,
    fetchOutcomes,
    fetchOpenBets,
    fetchOpenBetsSucceeded,
    fetchOpenBetsFailed,
};
