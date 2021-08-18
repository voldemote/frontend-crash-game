import update         from 'immutability-helper';
import { LeaderboardTypes } from '../actions/leaderboard';
import user from './user';

const initialState = {
    leaderboard: {
        currentUser: {
            _id: null,
            username: null,
            rank: null,
            amountWon: null,
            toNextRank: null
        },
        users: [],
        total: 0,
        page: 0,
        perPage: 0
    },
};

const findUser = (userList, id) => {
    return userList.find(u => u._id === id);
}

const fetchAllSucceeded = (action, state) => {
    let users = [];
    const loggedInUser = action.leaderboard.currentUser;

    if (action.leaderboard.page === 0) {
        users = action.leaderboard.users;
    } else if (action.leaderboard.page === state.leaderboard.page) {
        users = state.leaderboard.users;
    } else {
        let stateUsers = state.leaderboard.users;

        if (findUser(action.leaderboard.users, loggedInUser._id)) {
            stateUsers = stateUsers.filter(u => u._id != loggedInUser._id);
        }

        users = [...stateUsers, ...action.leaderboard.users];
    }

    const currentUser = findUser(users, loggedInUser._id);

    users = users.map((user, index) => {
        return {
            ...user,
            rank: index + 1,
        };
    });

    if (!currentUser) {
        users.push(loggedInUser);
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