import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ROSI_GAME_INTERVAL,
  ROSI_GAME_AFTER_CRASH_DELAY,
} from 'constants/RosiGame';
import {
  selectHasStarted,
  selectGameStartTimestamp,
} from 'store/selectors/rosi-game';
import Timer from './Timer';
import Counter from './Counter';
import styles from './styles.module.scss';
import RosiGameAnimationController from './canvas/RosiGameAnimationController';

const RosiGameAnimation = () => {
  const canvasRef = useRef(null);
  const [animationReady, setAnimationReady] = useState(false);
  const gameStarted = useSelector(selectHasStarted);
  const gameStartTimestamp = useSelector(selectGameStartTimestamp);
  const [isPreparingRound, setIsPreparingRound] = useState(!gameStarted);

  const elapsed = new Date(Date.now() - gameStartTimestamp);
  const gameStartSeconds = elapsed.getSeconds();
  const gameStartMs = Math.round(elapsed.getMilliseconds() / 10) * 10;

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
      setIsPreparingRound(false);
      RosiGameAnimationController.start();
      return;
    }

    if (!gameStarted && Date.now() - gameStartTimestamp > 100) {
      RosiGameAnimationController.end();
      // leave some time for player to see crash value
      setTimeout(() => setIsPreparingRound(true), ROSI_GAME_AFTER_CRASH_DELAY);
    }
  }, [gameStarted, animationReady, gameStartTimestamp]);

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
          <Timer
            pause={!gameStarted}
            startSeconds={gameStartSeconds}
            startMs={gameStartMs}
          />
          x
        </div>
      )}
    </div>
  );
};

export default RosiGameAnimation;
