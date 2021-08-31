export const RosiGameTypes = {
  INITIALIZE_STATE: 'RosiGame/INITIALIZE_STATE',
  FETCH_CURRENT_GAME_INGO: 'RosiGame/FETCH_ALL',
  SET_HAS_STARTED: 'RosiGame/SET_HAS_STARTED',
  SET_USER_BET: 'RosiGame/SET_USER_BET',
  ADD_LAST_CRASH: 'RosiGame/ADD_LAST_CRASH'
};

const initializeState = payload => ({
  type: RosiGameTypes.INITIALIZE_STATE,
  payload,
});

const setHasStarted = payload => ({
  type: RosiGameTypes.SET_HAS_STARTED
});

const setUserBet = payload => ({
  type: RosiGameTypes.SET_USER_BET,
  payload,
});

const addLastCrash = payload => ({
  type: RosiGameTypes.ADD_LAST_CRASH,
  payload,
});

export const RosiGameActions = {
  initializeState,
  setHasStarted,
  setUserBet,
  addLastCrash
};
