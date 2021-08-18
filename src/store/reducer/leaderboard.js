import update         from 'immutability-helper';
import { LeaderboardTypes } from '../actions/leaderboard';

const initialState = {
    leaderboard: [],
};

const fetchAllSucceeded = (action, state) => {
    let users = [];
    
    if (action.leaderboard.page === 1) {
        users = action.leaderboard.users;
    } else if (action.leaderboard.page === state.leaderboard.page) {
        users = state.leaderboard.users;
    } else {
        users = [...state.leaderboard.users, ...action.leaderboard.users];
    }

    return {
        ...state,
        leaderboard: {
            ...action.leaderboard,
            users,
        }
    };
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case LeaderboardTypes.FETCH_ALL_SUCCEEDED: return fetchAllSucceeded(action, state);
        default:                                   return state;
        // @formatter:on
    }
}