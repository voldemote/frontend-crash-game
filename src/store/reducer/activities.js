import { ActivitiesTypes } from '../actions/activities';
import _ from 'lodash';
const initialState = {
  activities: [],
};

const addActivity = (action, state) => {
  return {
    ...state,
    activities: [action.payload, ...state.activities],
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ActivitiesTypes.ADD_ACTIVITY:
      console.log('ADD ACTIVITY REDUCER');
      return addActivity(action, state);
    default:
      return state;
    // @formatter:on
  }
}
