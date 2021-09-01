import * as Api from '../../api';

import { call, put } from 'redux-saga/effects';
import { RosiGameActions } from '../actions/rosi-game';

export const createTrade = function* (action) {
  const { trade } = action;
  const { response } = yield call(Api.createTrade, trade);

  console.log(response.data);

  yield put(RosiGameActions.setUserBet())

  // if (response) {
  //   console.log(response.data);

  //   yield put(
  //     RosiGameActions.setUserBet();
  //   );
  // }

  // else {
  //   yield put(
  //     ChatActions.fetchFailed({
  //       eventId,
  //       error,
  //     })
  //   );
  // }
};

export default {
  createTrade
};
