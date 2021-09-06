import { useEffect } from 'react';
import * as Api from 'api/crash-game';
import { useDispatch } from 'react-redux';
import Link from 'components/Link';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
// import PlaceBet from 'components/PlaceBet';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import { RosiGameActions } from 'store/actions/rosi-game';
import { winners, inGameBets } from './fakeData';
import { ReactComponent as ArrowIcon } from '../../data/icons/arrow-left.svg';
import styles from './styles.module.scss';

const rosiGameEvent = { _id: ROSI_GAME_EVENT_ID };

const RosiGame = () => {
  const dispatch = useDispatch();

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
          <GameAnimation />
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Chat event={rosiGameEvent} />
            </Grid>
            <Grid item md={4}>
              <GameBets
                label="In Game Bets"
                total="2.700,50"
                bets={inGameBets}
              />
            </Grid>
            <Grid item md={4}>
              <GameBets
                label="Cashed Out"
                total="2.700,50"
                bets={winners}
                showCrashFactor
              />
            </Grid>
          </Grid>
        </div>
        {/* <div className={styles.sidebar}>
          <PlaceBet />
        </div> */}
      </div>
    </BaseContainerWithNavbar>
  );
};

export default RosiGame;
