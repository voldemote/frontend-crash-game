import { put }                   from 'redux-saga/effects';
import { call }                  from 'redux-saga/effects';
import * as Api                  from '../../api';
import { select }                from 'redux-saga/effects';
import { UserActions }           from '../actions/user';
import { AuthenticationActions } from '../actions/authentication';

const fetch = function* (action) {
    let userId = action.userId;

    if (!userId) {
        userId = yield select(state => state.authentication.userId);
    }

    const response = yield call(
        Api.getUser,
        userId,
    );

    if (response) {
        const user = response.data;

        yield put(UserActions.fetchSucceeded({
            user,
        }));
    } else {
        yield put(UserActions.fetchFailed({
            userId,
        }));
    }
};

const fetchSucceeded = function* (action) {
    const selfUserId = yield select(state => state.authentication.userId);
    const user       = action.user;
    const userId     = user.userId;

    if (userId === selfUserId) {
        const profilePicture = user.profilePicture;
        const balance        = user.balance;

        yield put(AuthenticationActions.updateData({
            profilePicture,
            balance,
        }));
    }
};

export default {
    fetch,
    fetchSucceeded,
};