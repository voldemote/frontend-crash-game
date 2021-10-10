import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import { CASINO_GAMES, SLOTS_GAMES } from '../../constants/Games';
import GameCards from '../../components/GameCards';
import ContentFooter from 'components/ContentFooter';
import ElonGame from 'components/ElonGame';
import { useEffect } from 'react';
import { trackPageView } from 'config/gtm';

const Games = () => {
  useEffect(() => {
    trackPageView({
      pageTitle: 'Games',
    });
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <ElonGame />
        {/* <GameCards
          games={CASINO_GAMES}
          category="Elon Game"
          showHowtoLink={true}
        /> */}
        <GameCards games={SLOTS_GAMES} category="House Games" />
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Games;
