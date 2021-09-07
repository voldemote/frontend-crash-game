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
    lastCrashes: [action.payload, ...state.lastCrashes],
  };
};

const addInGameBet = (action, state) => {
  return {
    ...state,
    inGameBets: [action.payload, ...state.inGameBets],
  };
};

const resetInGameBets = (action, state) => {
  return {
    ...state,
    inGameBets: [],
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RosiGameTypes.INITIALIZE_STATE:
      return initializeState(action, state);
    case RosiGameTypes.SET_HAS_STARTED:
      return setHasStarted(action, state);
    case RosiGameTypes.SET_USER_BET:
      return setUserBet(action, state);
    case RosiGameTypes.ADD_LAST_CRASH:
      return addLastCrash(action, state);
    case RosiGameTypes.ADD_IN_GAME_BET:
      return addInGameBet(action, state);
    case RosiGameTypes.RESET_IN_GAME_BETS:
      return resetInGameBets(action, state);
    default:
      return state;
  }
}
