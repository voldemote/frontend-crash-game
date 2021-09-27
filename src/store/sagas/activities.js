import * as Api from '../../api';
import { call, put, select } from 'redux-saga/effects';
import { ActivitiesActions } from '../actions/activities';
import _ from 'lodash';
import State from '../../helper/State';

const addActivity = function* (action) {
  console.log('#####action', action);

  yield put(
    ActivitiesActions.addActivity({
      action,
    })
  );
};

export default {
  addActivity,
};
