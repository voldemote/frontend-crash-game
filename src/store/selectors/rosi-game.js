export const selectHasStarted = state => state.rosiGame.hasStarted;
export const selectUserBet = state => state.rosiGame.userBet;
export const selectLastTenCrashes = state => state.rosiGame.lastCrashes.slice(0, 10);
