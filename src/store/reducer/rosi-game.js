import { RosiGameTypes } from '../actions/rosi-game';

const initialState = {
  hasStarted: false,
  lastCrashes: [],
  inGameBets: [],
  userBet: null,
};

const initializeState = (action, state) => {
  return {
    ...state,
    lastCrashes: action.payload.lastCrashes,
  };
};

const fetchCurrenGameInfoSuccess = (action, state) => {
  return {
    ...state,
    lastCrashes: action.payload.lastCrashes,
  };
};

const setHasStarted = (action, state) => {
  return {
    ...state,
    hasStarted: true,
  };
};

const setUserBet = (action, state) => {
  return {
    ...state,
    userBet: action.payload,
  };
};

const addLastCrash = (action, state) => {
  return {
    ...state,
    hasStarted: false,
    userBet: null,
    lastCrashes: [action.payload.lastCrash, ...state.lastCrashes],
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RosiGameTypes.INITIALIZE_STATE:
      return initializeState(action, state);
    case RosiGameTypes.FETCH_CURRENT_GAME_INFO_SUCCESS:
      return fetchCurrenGameInfoSuccess(action, state);
    case RosiGameTypes.SET_HAS_STARTED:
      return setHasStarted(action, state);
    case RosiGameTypes.SET_USER_BET:
      return setUserBet(action, state);
    case RosiGameTypes.ADD_LAST_CRASH:
      return addLastCrash(action, state);
    default:
      return state;
  }
}
