import Link from 'components/Link';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BetHistory from 'components/BetHistory';
import Chat from 'components/Chat';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import styles from './styles.module.scss';

const rosiGameEvent = { _id: 'CASINO_ROSI' };

const RosiGame = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>

          <div>
            <Link
              to="/games"
              className={styles.backLink}
            >
              <ArrowIcon />
              <h2>Rosi Game</h2>
            </Link>
          </div>

          <div className={styles.animation}>Bet Animation</div>
          <div className={styles.chatContainer}>
            <Chat
              event={rosiGameEvent}
              className={styles.chat}
              inputClassName={styles.chatInput}
              messagesClassName={styles.messagesContainer}
            />
          </div>
        </div>
        <div className={styles.sidebar}>
          <PlaceBet />
          <BetHistory />
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default RosiGame;
