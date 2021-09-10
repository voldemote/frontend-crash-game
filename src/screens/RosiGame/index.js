import { useEffect } from 'react';
import * as Api from 'api/crash-game';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BackLink from 'components/BackLink';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import { RosiGameActions } from 'store/actions/rosi-game';
import {
  selectLastCrashes,
  selectInGameBets,
  selectCashedOut,
} from 'store/selectors/rosi-game';
import MobileBets from './MobileBets';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';

const gameEvent = { _id: ROSI_GAME_EVENT_ID };

const RosiGame = () => {
  const dispatch = useDispatch();
  const lastCrashes = useSelector(selectLastCrashes);
  const inGameBets = useSelector(selectInGameBets);
  const cashedOut = useSelector(selectCashedOut);
  const isSmallDevice = useMediaQuery('(max-width:768px)');
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');

  useEffect(() => {
    Api.getCurrentGameInfo()
      .then(response => {
        dispatch(RosiGameActions.initializeState(response.data));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  }, [dispatch]);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <BackLink to="/games" text="Rosi Game" />
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <LastCrashes lastCrashes={lastCrashes} />
              <GameAnimation inGameBets={inGameBets} />
            </Grid>
            {isMiddleOrLargeDevice && (
              <>
                <Grid item xs={12} md={3}>
                  <PlaceBet />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Chat event={gameEvent} className={styles.chatContainer} />
                </Grid>
                <Grid item md={4}>
                  <GameBets label="In Game Bets" bets={inGameBets} />
                </Grid>
                <Grid item md={4}>
                  <GameBets label="Cashed Out" bets={cashedOut} />
                </Grid>
              </>
            )}
          </Grid>
          {isSmallDevice && <MobileBets />}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default RosiGame;
