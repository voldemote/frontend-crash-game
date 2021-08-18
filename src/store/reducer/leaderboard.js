import update         from 'immutability-helper';
import { LeaderboardTypes } from '../actions/leaderboard';
import user from './user';

const initialState = {
    leaderboard: [],
};

const fetchAllSucceeded = (action, state) => {
    let users = [];

    if (action.leaderboard.page === 0) {
        users = action.leaderboard.users;
    } else if (action.leaderboard.page === state.leaderboard.page) {
        users = state.leaderboard.users;
    } else {
        let stateUsers = state.leaderboard.users;

        if (action.leaderboard.users.find(u => u._id === action.leaderboard.currentUser._id)) {
            stateUsers = state.leaderboard.users.filter(u => u._id != action.leaderboard.currentUser._id);
        }

        users = [...stateUsers, ...action.leaderboard.users];
    }

    let currentUser = users.find(u => u._id === action.leaderboard.currentUser._id);

    users = users.map((user, index) => {
        return {
            ...user,
            rank: index + 1,
        };
    });

    if (!currentUser) {
        users.push(action.leaderboard.currentUser);
    } else if (currentUser.rank > users.length) {
        users = users.filter(u => u._id != currentUser._id);
        users.push(currentUser);
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