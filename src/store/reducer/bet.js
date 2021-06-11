import _              from 'lodash';
import update         from 'immutability-helper';
import { BetTypes }   from '../actions/bet';
import { PopupTypes } from '../actions/popup';
import { REHYDRATE }  from 'redux-persist';

const initialState = {
    selectedEventId:    null,
    selectedBetId:      null,
    selectedChoice:     null,
    selectedCommitment: null,
    outcomes:           [],
    openBets:           [],
};

const reset = (action, state) => {
    return update(state, {
        selectedEventId: {
            $set: initialState.selectedEventId,
        },
        selectedBetId: {
            $set: initialState.selectedBetId,
        },
        selectedChoice: {
            $set: initialState.selectedChoice,
        },
    });
};

const selectBet = (action, state) => {
    return update(state, {
        selectedEventId: {
            $set: action.eventId,
        },
        selectedBetId:   {
            $set: action.betId,
        },
    });
};

const selectChoice = (action, state) => {
    return update(state, {
        selectedChoice: {
            $set: action.choice,
        },
    });
};

const setCommitment = (action, state) => {
    const commitment = action.commitment;
    const betId      = action.betId;

    if (
        _.isEmpty(commitment) ||
        (
            (
                commitment >= 0.001 ||
                commitment == 0
            ) &&
            commitment <= 20000000
        )
    ) {
        return update(state, {
            selectedCommitment: {
                $set: action.commitment,
            },
            selectedEventId:    {
                $set: action.commitment,
            },
        });
    }

    return state;
};

const setOutcomes = (action, state) => {
    let newState      = state;
    const newOutcomes = action.outcomes;
    const time        = new Date().getTime();

    _.forEach(
        newOutcomes,
        (outcome, index) => {
            const exists = _.get(newState, 'outcomes[' + index + '].values');

            if (exists) {
                newState = update(newState, {
                    outcomes: {
                        [index]: {
                            values: {
                                [outcome.amount]: {
                                    $set: {
                                        time,
                                        ...outcome,
                                    },
                                },
                            },
                        },
                    },
                });
            } else {
                newState = update(newState, {
                    outcomes: {
                        $set: {
                            [index]: {
                                values: {
                                    [outcome.amount]: {
                                        time,
                                        ...outcome,
                                    },
                                },
                            },
                        },
                    },
                });
            }

            // TODO remove old
        },
    );

    return newState;
};

const placeSucceeded = (action, state) => {
    const betId   = _.get(action, 'betId');
    const amount  = _.get(action, 'amount');
    const outcome = _.get(action, 'isOutcomeOne', false) ? 1 : 0;

    return update(state, {
        openBets: {
            $set: {
                [betId]: {
                    betId,
                    amount,
                    outcome,
                },
            },
        },
    });

};
const resetOutcomes  = (action, state) => {
    return update(state, {
        outcomes: {
            $set: [],
        },
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case PopupTypes.HIDE:          return reset(action, state);
        case BetTypes.SELECT_BET:      return selectBet(action, state);
        case BetTypes.SELECT_CHOICE:   return selectChoice(action, state);
        case BetTypes.SET_COMMITMENT:  return setCommitment(action, state);
        case BetTypes.SET_OUTCOMES:    return setOutcomes(action, state);
        case BetTypes.PLACE_SUCCEEDED: return placeSucceeded(action, state);
        case REHYDRATE:                return resetOutcomes(action, state);
        default:                       return state;
        // @formatter:on
    }
}