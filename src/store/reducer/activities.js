import { ActivitiesTypes } from '../actions/activities';
import _ from 'lodash';
import update from 'immutability-helper';
const initialState = {
  activities: [],
};

const addActivity = (action, state) => {
  return {
    ...state,
    activities: [action, ...state.activities],
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ActivitiesTypes.ADD_ACTIVITY:
      return addActivity(action, state);
    default:
      return state;
    // @formatter:on
  }
}
