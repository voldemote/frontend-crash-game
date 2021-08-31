export const RosiGameTypes = {
  FETCH_CURRENT_GAME_INGO: 'RosiGame/FETCH_ALL',
  ADD_LAST_CRASH: 'RosiGame/ADD_LAST_CRASH'
};

const addLastCrash = payload => ({
  type: RosiGameTypes.ADD_LAST_CRASH,
  payload,
});

export const RosiGameActions = {
  addLastCrash
};
