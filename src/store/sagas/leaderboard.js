import { put }          from 'redux-saga/effects';
import { call }         from 'redux-saga/effects';
import * as Api         from '../../api';
import { LeaderboardActions } from '../actions/leaderboard';
import { select }       from 'redux-saga/effects';
import AuthState        from '../../constants/AuthState';
import _                from 'lodash';
import { UserActions }  from '../actions/user';

const fetchAll = function* (action) {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        const response = yield call(Api.getLeaderboard);

        if (response) {
            const leaderboard = response.data;

            yield put(LeaderboardActions.fetchAllSucceeded({
                leaderboard,
            }));
        } else {
            yield put(LeaderboardActions.fetchAllFailed());
        }
    }
};

const fetchAllSucceeded = function* (action) {
    const leaderboard = action.leaderboard;

    if (!_.isEmpty(leaderboard)) {
        const currentlyFetchingUsers = [];

        for (const event of leaderboard) {
            const bets = event.bets;

            if (!_.isEmpty(bets)) {
                for (const bet of bets) {
                    const users  = yield select(state => state.user.users);
                    const userId = bet.creator;

                    if (userId) {
                        const userFetched = (
                            _.some(
                                users,
                                {
                                    userId: userId,
                                },
                            ) ||
                            currentlyFetchingUsers[userId] !== undefined
                        );

                        if (!userFetched) {
                            currentlyFetchingUsers[userId] = true;
                            yield put(UserActions.fetch({ userId }));
                        }
                        // TODO fetch all user at once
                    }
                }
            }
        }
    }
};

export default {
    fetchAll,
    fetchAllSucceeded,
};