import { useCallback, useEffect, useState, memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import lifecycle from 'page-lifecycle'
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BackLink from 'components/BackLink';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { RosiGameActions } from 'store/actions/rosi-game';
import useRosiData from 'hooks/useRosiData';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import { UserActions } from '../../store/actions/user';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import {
  trackElonCancelBet,
  trackElonCashout,
  trackElonPlaceBet,
  trackPumpDumpCancelBet,
  trackPumpDumpCashout,
  trackPumpDumpPlaceBet,
} from '../../config/gtm';
import { GameApi } from '../../api/crash-game';
import { GAMES } from '../../constants/Games';
import Routes from 'constants/Routes';
import PumpDumpAnimation from '../../components/PumpDumpAnimation';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import TabOptions from 'components/TabOptions';


const RosiGame = ({
  showPopup,
  connected,
  userId,
  path,
  token,
  updateUserBalance
}) => {
  const dispatch = useDispatch();
  const {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
  } = useRosiData();
  const { slug } = useParams();
  const [audio, setAudio] = useState(null);
  const [flag, setFlag] = useState(false);
  const [visibility, setVisibility] = useState('visible');
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];
  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);
  const game = Object.values(GAMES).find(g => g.slug === slug);
  const GAME_TYPE_ID = game.id;
  const Api = new GameApi(game.url, token, game.id);
  function getCurrentGameState(){
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
  }
  useEffect(() => {
    getCurrentGameState()
    dispatch(ChatActions.fetchByRoom({ roomId: GAME_TYPE_ID }));
  }, [dispatch, connected]);

  /*
  * When we switch from inactive tab to active
  * request game state
  * */

  useEffect(() => {
    const handler = (event) => {
      if(document.visibilityState === 'visible'){
        if((event.oldState === 'hidden' || event.oldState === 'frozen')
          && (event.newState === 'active' || event.newState === 'passive')){
          getCurrentGameState()
        }
        setVisibility(event.newState)
      }
    };
    lifecycle.addEventListener('statechange', handler);
    return () => {
      lifecycle.removeEventListener('statechange', handler);
    }
  }, [])

  //Bets state update interval
  useEffect(() => {
    const interval = setInterval(() => dispatch(RosiGameActions.tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (slug === GAMES['elonGame'].slug) {
        if (hasAcceptedTerms() && !isPopupDisplayed()) {
          showPopup(PopupTheme.explanation);
          localStorage.setItem('gameHowDoesItWorkTip', true);
        }
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

  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };

  async function handleBet(payload, crashFactor) {
    if(flag) return
    setFlag(true)
    audio.playBetSound();
    if (!payload) return;
    try {
      const result = await Api.createTrade(payload);
      if (slug === GAMES['elonGame'].slug) {
        trackElonPlaceBet({ amount: payload.amount, multiplier: crashFactor, autobet: payload.autobet ? 1 : 0 });
      } else if (slug === GAMES['pumpDump'].slug) {
        trackPumpDumpPlaceBet({ amount: payload.amount, multiplier: crashFactor, autobet: payload.autobet ? 1 : 0 });
      }
      dispatch(RosiGameActions.setUserBet(payload));
      setFlag(false)
      updateUserBalance(userId);
      return result;
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Place Bet failed`,
        })
      );
    }
  }

  function handleBetCancel(userId, amount) {
    if(flag) return
    setFlag(true)
    Api.cancelBet()
      .then(() => {
        if (slug === GAMES['elonGame'].slug) {
          trackElonCancelBet({ amount });

        } else if (slug === GAMES['pumpDump'].slug) {
          trackPumpDumpCancelBet({ amount });
        }

        dispatch(RosiGameActions.cancelBet({ userId }));
        setFlag(false);
        updateUserBalance(userId);
        return true
      })
      .catch(() => {
        dispatch(
          AlertActions.showError({
            message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Cancel Bet failed`,
          })
        );
        setFlag(false)
        return true
      });
  }

  async function handleCashout(isGuest, autobet) {
    audio.playWinSound();
    if (isGuest) return;
    try {
      const response = await Api.cashOut();
      const { crashFactor: crashFactorCashout, reward } = response.data;

      if (slug === GAMES['elonGame'].slug) {
        trackElonCashout({
          amount: reward,
          multiplier: parseFloat(crashFactorCashout),
          autobet: autobet != null ? 1 : 0,
          accumulated: autobet?.accumulated,
        });

      } else if (slug === GAMES['pumpDump'].slug) {
        trackPumpDumpCashout({
          amount: reward,
          multiplier: parseFloat(crashFactorCashout),
          autobet: autobet != null ? 1 : 0,
          accumulated: autobet?.accumulated,
        });
      }
      updateUserBalance(userId);
      AlertActions.showSuccess(JSON.stringify(response));
      return response;
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Cashout failed`,
        })
      );
    }
  }

  const renderActivities = () => (
    <Grid item xs={12} md={6}>
      <EventActivitiesTabs
              activitiesLimit={50}
              className={styles.activitiesTrackerGamesBlock}
              preselectedCategory={'game'}
              gameId={GAME_TYPE_ID}></EventActivitiesTabs>
    </Grid>
  );

  const renderChat = () => (
    <Grid item xs={12} md={6}>
      <div className={styles.chatWrapper}>
        <TabOptions options={chatTabOptions} className={styles.tabLayout}>
          {option => (
            <div
              className={
                option.index === chatTabIndex
                  ? styles.tabItemSelected
                  : styles.tabItem
              }
              onClick={() => handleChatSwitchTab(option)}
            >
              {option.name}
            </div>
          )}
        </TabOptions>
        <Chat
          roomId={GAME_TYPE_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
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

  const renderAnimation = () => {
    if (slug === GAMES['elonGame'].slug && visibility !== 'frozen') {
      return (
        <GameAnimation
          inGameBets={inGameBets}
          onInit={audio => setAudio(audio)}
        />
      );
    }
    if (slug === GAMES['pumpDump'].slug) {
      return (
        <PumpDumpAnimation
          inGameBets={inGameBets}
          onInit={audio => setAudio(audio)}
        />
      );
    }
  };

  const showHowDoesItWork = () => {
    if (slug === GAMES['elonGame'].slug) {
      return (
        <span
          onClick={handleHelpClick}
          className={styles.howtoLink}
          data-tracking-id="elongame-how-does-it-work"
        >
          How does it work?
        </span>
      )
    }
    if (slug === GAMES['pumpDump'].slug) {
      return (
        <span></span>
      );
    }
  }

  const renderWallpaperBanner = () => {
    return (
      <Link data-tracking-id="elon-wallpaper" to={Routes.elonWallpaper}>
        <div className={styles.banner}></div>
      </Link>
    );
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.headlineWrapper} ${(slug === GAMES['pumpDump'].slug) && styles.hideElon}`}>
            <BackLink to="/games" text={(slug === GAMES['elonGame'].slug) ? "Elon Game" : "Pump & Dump"} showArrow={(slug === GAMES['elonGame'].slug)} />
            <Share popupPosition="right" className={styles.shareButton} />
            {(slug === GAMES['elonGame'].slug) &&
              <Icon
                className={styles.questionIcon}
                iconType={IconType.question}
                iconTheme={IconTheme.white}
                height={25}
                width={25}
                onClick={handleHelpClick}
              />
            }
            {showHowDoesItWork()}
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
              <LastCrashes lastCrashes={lastCrashes} game={game}/>
              {renderAnimation()}
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBet
                  connected={connected}
                  onBet={handleBet}
                  onCashout={handleCashout}
                  onCancel={handleBetCancel}
                  gameId={path}
                />
                {isMiddleOrLargeDevice ? renderBets() : null}
              </div>
            </div> 
          </div>
          {isMiddleOrLargeDevice ? null : renderBets()}
          {isMiddleOrLargeDevice ? (
            <div className={styles.bottomWrapper}>
              {renderChat()}
              {renderActivities()}
            </div>
          ) : null}
          {renderWallpaperBanner()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
    path: state.router.location.pathname,
    token: state.authentication.token,
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
    updateUserBalance: (userId) => {
      dispatch(UserActions.fetch({ userId, forceFetch: true }));
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(RosiGame);
export default memo(Connected);
