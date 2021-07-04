import update         from 'immutability-helper';
import { LeaderboardTypes } from '../actions/leaderboard';

const initialState = {
    leaderboard: [],
};

const fetchAllSucceeded = (action, state) => {
    return update(state, {
        leaderboard: {
            $set: action.leaderboard,
        },
    });
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case LeaderboardTypes.FETCH_ALL_SUCCEEDED: return fetchAllSucceeded(action, state);
        default:                                   return state;
        // @formatter:on
    }
}