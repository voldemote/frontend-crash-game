import update from 'immutability-helper';
import EventTypes from 'constants/EventTypes';

const initialState = {
  rangeType: 'hour',
  rangeValue: '24',
};

const updateChartParams = (state, action) => {
  return update(state, {
    $set: action.params,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EventTypes.UPDATE_CHART_PARAMS:
      return updateChartParams(state, action);
    default:
      return state;
  }
}
