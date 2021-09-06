import { useEffect } from 'react';
import * as Api from 'api/crash-game';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'components/Link';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BetHistory from 'components/BetHistory';
import LastCrashes from 'components/LastCrashes';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID, ROSI_GAME_INTERVAL } from 'constants/RosiGame';
import { RosiGameActions } from 'store/actions/rosi-game';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import { selectHasStarted } from '../../store/selectors/rosi-game';
import styles from './styles.module.scss';

import Timer from './Timer';
import Counter from './Counter';

const rosiGameEvent = { _id: ROSI_GAME_EVENT_ID };

const RosiGame = () => {
  const dispatch = useDispatch();
  const gameStarted = useSelector(selectHasStarted);

  useEffect(() => {
    Api.getCurrentGameInfo().then(response => {
      dispatch(RosiGameActions.initializeState(response.data));
    });
  }, [dispatch]);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <Link to="/games" className={styles.backLink}>
              <ArrowIcon />
              <h2>Rosi Game</h2>
            </Link>
          </div>
          <LastCrashes />
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
