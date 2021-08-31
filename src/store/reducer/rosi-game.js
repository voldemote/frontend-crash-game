import { RosiGameTypes } from '../actions/rosi-game';

const initialState = {
  lastCrashes: [],
  inGameBets: [],
  userPlacedABet: false,
};

const fetchCurrenGameInfoSuccess = (action, state) => {
   return {
     ...state,
     lastCrashes: action.payload.lastCrashes
   }
};

const addLastCrash = (action, state) => {
  return {
    ...state,
    lastCrashes: [action.payload.lastCrash, ...state.lastCrashes],
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RosiGameTypes.FETCH_ALL_SUCCEEDED:
      return fetchCurrenGameInfoSuccess(action, state);
    case RosiGameTypes.ADD_LAST_CRASH:
      return addLastCrash(action, state);
    default:
      return state;
  }
}
