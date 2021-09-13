export const selectHasStarted = state => state.rosiGame.hasStarted;
export const selectGameStartTimestamp = state =>
  state.rosiGame.gameStartTimestamp;
export const selectUserBet = state => state.rosiGame.userBet;
export const selectLastCrashes = state =>
  state.rosiGame.lastCrashes.slice(0, 10);
export const selectInGameBets = ({ rosiGame }) => {
  if (rosiGame.hasStarted) {
    const currentCrashFactor =
      (Date.now() - rosiGame.gameStartTimestamp) / 1000;
    return rosiGame.inGameBets.filter(
      bet => bet.crashFactor > currentCrashFactor
    );
  } else {
    return rosiGame.inGameBets;
  }
};

export const selectCashedOut = ({ rosiGame }) => {
  if (rosiGame.hasStarted) {
    const currentCrashFactor =
      (Date.now() - rosiGame.gameStartTimestamp) / 1000;
    return rosiGame.inGameBets
      .filter(bet => bet.crashFactor <= currentCrashFactor)
      .map(bet => ({ ...bet, amount: bet.amount * bet.crashFactor }));
  } else {
    return rosiGame.cashedOut;
  }
};
