import { makeActionCreator } from '../../helper/Store';

export const ActivitiesTypes = {
  ADD_ACTIVITY: 'Activities/ADD_ACTIVITY',
};

const addActivity = makeActionCreator(ActivitiesTypes.ADD_ACTIVITY, {
  type: null,
  data: null,
});

export const ActivitiesActions = {
  addActivity,
};
