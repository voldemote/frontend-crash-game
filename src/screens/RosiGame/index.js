import { useCallback, useEffect, useState } from 'react';
import * as Api from 'api/crash-game';
import { connect, useDispatch } from 'react-redux';
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
import useRosiData from 'hooks/useRosiData';
import MobileBets from './MobileBets';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import EventActivitiesTracker from '../../components/EventActivitiesTracker';
import TabOptions from '../../components/TabOptions';

const RosiGame = ({ showPopup, connected, userId }) => {
  const dispatch = useDispatch();
  const { lastCrashes, inGameBets, cashedOut, hasStarted, isEndgame } =
    useRosiData();
  const [audio, setAudio] = useState(null);
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [tabIndex, setTabIndex] = useState(0);
  const tabOptions = [
    { name: 'ALL', index: 0 },
    { name: 'HIGH WINS', index: 1 },
    { name: 'LUCKY WINS', index: 2 },
  ];
  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  useEffect(() => {
    Api.getCurrentGameInfo()
      .then(response => {
        dispatch(
          RosiGameActions.initializeState({
            ...response.data,
            userId,
          })
        );
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
    dispatch(ChatActions.fetchByRoom({ roomId: ROSI_GAME_EVENT_ID }));
  }, [dispatch, connected]);

  //Bets state update interval
  useEffect(() => {
    const interval = setInterval(() => dispatch(RosiGameActions.tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (hasAcceptedTerms() && !isPopupDisplayed()) {
        showPopup(PopupTheme.explanation);
        localStorage.setItem('gameHowDoesItWorkTip', true);
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  const hasAcceptedTerms = () => {
    return localStorage.getItem('acceptedTerms') || false;
  };

  const isPopupDisplayed = () => {
    return localStorage.getItem('gameHowDoesItWorkTip') || false;
  };

  const handleSwitchTab = option => {
    setTabIndex(option.index);
  };

  const renderActivities = () => (
    <Grid item xs={12} md={12}>
      <div className={styles.activityWrapper}>
        <TabOptions options={tabOptions} className={styles.tabLayout}>
          {option => (
            <div
              className={
                option.index === tabIndex
                  ? styles.tabItemSelected
                  : styles.tabItem
              }
              onClick={() => handleSwitchTab(option)}
            >
              {option.name}
            </div>
          )}
        </TabOptions>
        <div className={styles.activityContainer}>
          <EventActivitiesTracker
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'elongame'}
          />
        </div>
      </div>
    </Grid>
  );

  const renderBets = () => (
    <GameBets
      label="Cashed Out"
      bets={[
        ...inGameBets.map(b => ({
          ...b,
          cashedOut: false,
        })),
        ...cashedOut.map(b => ({
          ...b,
          cashedOut: true,
        })),
      ]}
      gameRunning={hasStarted}
      endGame={isEndgame}
    />
  );

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text="Elon Game" />
            <Share popupPosition="right" className={styles.shareButton} />
            <Icon
              className={styles.questionIcon}
              iconType={IconType.question}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
              onClick={handleHelpClick}
            />
            <span
              onClick={handleHelpClick}
              className={styles.howtoLink}
              data-tracking-id="elongame-how-does-it-work"
            >
              How does it work?
            </span>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <LastCrashes lastCrashes={lastCrashes} />
              <GameAnimation
                inGameBets={inGameBets}
                onInit={audio => setAudio(audio)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={styles.placeContainer}>
                <PlaceBet
                  connected={connected}
                  onBet={() => {
                    audio.playBetSound();
                  }}
                  onCashout={() => {
                    audio.playWinSound();
                  }}
                />
                {isMiddleOrLargeDevice ? renderBets() : null}
              </div>
            </Grid>
          </Grid>
          {isMiddleOrLargeDevice ? (
            <div className={styles.chatWrapper}>
              <Chat
                roomId={ROSI_GAME_EVENT_ID}
                className={styles.chatContainer}
                chatMessageType={ChatMessageType.game}
              />
            </div>
          ) : null}
          {isMiddleOrLargeDevice ? renderActivities() : renderBets()}

          <ContentFooter className={styles.betFooter} />
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RosiGame);
