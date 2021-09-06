import { useSelector } from 'react-redux';
import { ROSI_GAME_INTERVAL } from 'constants/RosiGame';
import { selectHasStarted } from '../../store/selectors/rosi-game';
import Timer from './Timer';
import Counter from './Counter';
import styles from './styles.module.scss';

const RosiGameAnimation = () => {
  const gameStarted = useSelector(selectHasStarted);

  return (
    <div className={styles.animation}>
      {gameStarted ? (
        <div className={styles.timer}>
          <Timer />x
        </div>
      ) : (
        <div>
          Next game starts in <Counter number={ROSI_GAME_INTERVAL} />s
        </div>
      )}
    </div>
  );
};

export default RosiGameAnimation;
