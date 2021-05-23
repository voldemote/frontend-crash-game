import update         from 'immutability-helper';
import { EventTypes } from '../actions/event';
import { BetTypes }   from '../actions/bet';
import { PopupTypes } from '../actions/popup';

const initialState = {
    selectedEventId:    null,
    selectedBetId:      null,
    selectedChoice:     null,
    selectedCommitment: null,
    outcomes:           [],
};

const reset = (action, state) => {
    return update(state, {
        $set: initialState,
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

    if (
        !commitment ||
        (
            commitment >= 0 &&
            commitment <= 20000000
        )
    ) {
        return update(state, {
            selectedCommitment: {
                $set: action.commitment,
            },
        });
    }

    return state;
};

const setOutcomes = (action, state) => {
    return update(state, {
        outcomes: {
            $set: action.outcomes,
        },
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case PopupTypes.HIDE:         return reset(action, state);
        case BetTypes.SELECT_BET:     return selectBet(action, state);
        case BetTypes.SELECT_CHOICE:  return selectChoice(action, state);
        case BetTypes.SET_COMMITMENT: return setCommitment(action, state);
        case BetTypes.SET_OUTCOMES:   return setOutcomes(action, state);
        default:                      return state;
        // @formatter:on
    }
}