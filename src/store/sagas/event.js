import { put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import * as Api from "../../api";
import { EventActions } from "../actions/event";
import { select } from "redux-saga/effects";
import AuthState from "../../constants/AuthState";
import _ from "lodash";
import { UserActions } from "../actions/user";

const fetchAll = function* (action) {
    const authState = yield select((state) => state.authentication.authState);
    const response = yield call(Api.listEvents);

    if (response) {
        const events = response.data;

        yield put(
            EventActions.fetchAllSucceeded({
                events,
            })
        );
    } else {
        yield put(EventActions.fetchAllFailed());
    }
};

const fetchAllSucceeded = function* (action) {
    const events = action.events;

    if (!_.isEmpty(events)) {
        const currentlyFetchingUsers = [];

        for (const event of events) {
            const bets = event.bets;

            if (!_.isEmpty(bets)) {
                for (const bet of bets) {
                    const users = yield select((state) => state.user.users);
                    const userId = bet.creator;

                    if (userId) {
                        const userFetched =
                            _.some(users, {
                                userId: userId,
                            }) || currentlyFetchingUsers[userId] !== undefined;

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

const fetchFilteredEvents = function* (action) {
    console.log("action. payload :>> ", action);
    try {
        const { data } = yield call(() =>
            Api.listEventsFiltered(action.payload)
        );

        console.log('data :>> ', data);

        yield put(EventActions.fetchFilteredEventsSuccess(data));
    } catch (error) {
        yield put(EventActions.fetchFilteredEventsFail());
    }
};

export default {
    fetchAll,
    fetchAllSucceeded,
    fetchFilteredEvents,
};
