export const selectHasStarted = state => state.rosiGame.hasStarted;
export const selectGameStartTimestamp = state =>
  state.rosiGame.gameStartTimestamp;
export const selectUserBet = state => state.rosiGame.userBet;
export const selectLastCrashes = state =>
  state.rosiGame.lastCrashes.slice(0, 10);
export const selectInGameBets = state => state.rosiGame.inGameBets;
export const selectCashedOut = state => state.rosiGame.cashedOut;
