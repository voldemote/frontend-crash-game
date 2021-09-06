import { useEffect } from 'react';
import * as Api from 'api/crash-game';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BackLink from 'components/BackLink';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import { RosiGameActions } from 'store/actions/rosi-game';
import { winners, inGameBets } from './fakeData';
import MobileBets from './MobileBets';
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
          <BackLink to="/games" text="Rosi Game" />
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <LastCrashes />
              <GameAnimation />
            </Grid>
            <Grid item xs={12} md={3}>
              <PlaceBet />
            </Grid>
            <Grid item xs={12} md={4}>
              <Chat event={rosiGameEvent} className={styles.chatContainer} />
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
          {/* <MobileBets /> */}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default RosiGame;
