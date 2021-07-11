import { put } from "redux-saga/effects";
import {all} from "redux-saga/effects";
import { call } from "redux-saga/effects";
import * as Api from "../../api";
import { LeaderboardActions } from "../actions/leaderboard";
import { select } from "redux-saga/effects";
import _ from "lodash";
import { UserActions } from "../actions/user";
import State from "../../helper/State";

const fetchAll = function* (action) {
    const response = yield call(Api.getLeaderboard);

    if (response) {
        const leaderboard = response.data;

        yield put(
            LeaderboardActions.fetchAllSucceeded({
                leaderboard,
            })
        );
    } else {
        yield put(LeaderboardActions.fetchAllFailed());
    }
};

const fetchAllSucceeded = function* (action) {
    const leaderboard = action.leaderboard.users;

    const users = yield select((state) => state.user.users);

    const userIds = _.uniq(
        _.flatten(_.map(leaderboard, (user) => _.get(user, "userId")))
    );

    const missingUserIds = _.filter(userIds, (userId) =>
        _.isNil(State.getUser(userId, users))
    );

    yield all(
        _.map(
            missingUserIds,
            (userId) => put(UserActions.fetch({ userId })),
        ),
    );
};

export default {
    fetchAll,
    fetchAllSucceeded,
};
