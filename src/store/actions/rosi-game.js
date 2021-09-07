export const RosiGameTypes = {
  INITIALIZE_STATE: 'RosiGame/INITIALIZE_STATE',
  FETCH_CURRENT_GAME_INFO_SUCCESS: 'RosiGame/FETCH_CURRENT_GAME_INFO_SUCCESS',
  SET_HAS_STARTED: 'RosiGame/SET_HAS_STARTED',
  SET_USER_BET: 'RosiGame/SET_USER_BET',
  ADD_LAST_CRASH: 'RosiGame/ADD_LAST_CRASH',
};

const initializeState = payload => ({
  type: RosiGameTypes.INITIALIZE_STATE,
  payload,
});

const fetchCurrenGameInfoSuccess = payload => ({
  type: RosiGameTypes.FETCH_CURRENT_GAME_INFO_SUCCESS,
  payload,
});

const setHasStarted = payload => ({
  type: RosiGameTypes.SET_HAS_STARTED,
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
  fetchCurrenGameInfoSuccess,
  setHasStarted,
  setUserBet,
  addLastCrash,
};
