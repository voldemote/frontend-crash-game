import { InfoChannelTypes } from '../actions/info-channel';

const INITIAL_STATE = {
  prices: {}
};

const resetState = state => {
  return INITIAL_STATE;
};

const setPrices = (state, action) => {
    const newState = {...state};
  newState.prices = action.payload;
  return newState;
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case InfoChannelTypes.RESET_STATE:
      return resetState(state);
    case InfoChannelTypes.SET_PRICES:
      return setPrices(state, action);
    default:
      return state;
  }
}
