import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import {
  EVOPLAY_GAMES
} from '../../constants/Games';
import GameEvoplay from '../../components/GameEvoplay';

const Games = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <GameEvoplay
          allgames={EVOPLAY_GAMES} />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;
