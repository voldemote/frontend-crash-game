import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ROSI_GAME_INTERVAL,
  ROSI_GAME_AFTER_CRASH_DELAY,
} from 'constants/RosiGame';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
} from 'store/selectors/rosi-game';
import Timer from './Timer';
import Counter from './Counter';
import styles from './styles.module.scss';
import RosiGameAnimationController from './canvas/RosiGameAnimationController';

const RosiGameAnimation = () => {
  const canvasRef = useRef(null);
  const lastCrashValue = useSelector(selectLastCrash);
  const gameStarted = useSelector(selectHasStarted);
  const cashedOut = useSelector(selectCashedOut);
  const [cashedOutCount, setCashedOutCount] = useState(0);
  const [isPreparingRound, setIsPreparingRound] = useState(!gameStarted);
  const [animationReady, setAnimationReady] = useState(false);

  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp);

  const elapsed = new Date(Date.now() - gameStartedTime.getTime());
  const timerSeconds = elapsed.getSeconds();
  const timerMs = Math.round(elapsed.getMilliseconds() / 10) * 10;

  // init animation on mount
  useEffect(() => {
    if (canvasRef.current) {
      RosiGameAnimationController.init(canvasRef.current);
      RosiGameAnimationController.load(() => {
        setAnimationReady(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!animationReady) {
      return;
    }

    if (gameStarted) {
      setCashedOutCount(0);
      setIsPreparingRound(false);
      RosiGameAnimationController.start();
      return;
    }

    const elapsedAfterGameStart = Date.now() - gameStartedTime.getTime();
    if (!gameStarted && elapsedAfterGameStart > 100) {
      RosiGameAnimationController.end();
      // leave some time for player to see crash value
      setTimeout(() => setIsPreparingRound(true), ROSI_GAME_AFTER_CRASH_DELAY);
    }
  }, [gameStarted, animationReady]); // eslint-disable-line

  useEffect(() => {
    if (!animationReady || !gameStarted) {
      return;
    }

    if (cashedOut && cashedOut.length > cashedOutCount) {
      setCashedOutCount(cashedOutCount + 1);
      RosiGameAnimationController.doCashedOutAnimation(
        cashedOut[cashedOut.length - 1]
      );
    }
  }, [animationReady, gameStarted, cashedOut]);

  return (
    <div className={styles.animation}>
      <canvas
        className={styles.canvas}
        id="rosi-game-animation"
        ref={canvasRef}
      />
      {isPreparingRound ? (
        <div className={styles.preparingRound}>
          <div>
            <h2 className={styles.title}>Preparing Round</h2>
            <div className={styles.description}>
              Starting in <Counter number={ROSI_GAME_INTERVAL} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.timer}>
          {gameStarted ? (
            <Timer
              pause={!gameStarted}
              startSeconds={timerSeconds}
              startMs={timerMs}
            />
          ) : (
            <span>{lastCrashValue.toFixed(2)}</span>
          )}
          x
        </div>
      )}
    </div>
  );
};

export default RosiGameAnimation;
