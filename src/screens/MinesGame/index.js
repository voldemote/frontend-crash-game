import * as PIXI from 'pixi.js-legacy';
import { useCallback, useEffect, useState } from 'react';
import { getSpinsAlpacaWheel, GameApi } from 'api/casino-games';
//import * as ApiUser from 'api/crash-game';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBetMines from 'components/PlaceBetMines';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/MinesGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import useRosiData from 'hooks/useRosiData';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import TabOptions from '../../components/TabOptions';
import Routes from 'constants/Routes';
import { getGameById } from '../../helper/Games';
import { GAMES } from '../../constants/Games';
import { UserActions } from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import {getLastCashoutsMines} from "../../api/casino-games";

const Game = ({
  showPopup,
  connected,
  userId,
  token,
  updateUserBalance
}) => {
  const gameCfg = GAMES.mines;
  const GAME_TYPE_ID = gameCfg.id;
  const GAME_NAME = gameCfg.name;
  const gameApi = new GameApi(gameCfg.url, token);
  const dispatch = useDispatch();
  const {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
  } = useRosiData();
  const [audio, setAudio] = useState(null);
  const [cashouts, setCashouts] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [mines, setMines] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [bet, setBet] = useState({
    pending: false,
    done: false
  });
  const [gameOver, setGameOver] = useState(false);
  const [amount, setAmount] = useState(50);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  const getLastCashout = (profit) => {
    let prepareObj = {};
    if(profit > 0) {
      prepareObj = {
        type: 'win',
        value: '+' + profit
      };
    } else {
      prepareObj = {
        type: 'loss',
        value: profit
      };
    }
    setCashouts([prepareObj, ...cashouts])
  }

  useEffect(() => {
    getLastCashoutsMines(GAME_TYPE_ID)
      .then(response => {
        const lastCashouts = response?.data.lastCrashes;
        setCashouts(lastCashouts.map((entry)=> {
          if(entry.profit > 0) {
            return {
              type: 'win',
              value: '+' + entry.profit
            };
          } else {
            return {
              type: 'loss',
              value: entry.profit
            };
          }
        }))

      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });

  }, [])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({ roomId: GAME_TYPE_ID }));
  }, [dispatch, connected]);

  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };

  async function handleBet(payload) {
    // audio.playBetSound();
    if (!payload) return;
    try {
      if(payload.demo) {
        // setBet({...payload })
        // trackAlpacaWheelPlaceBetGuest({ amount: payload.amount, multiplier: risk });
      } else {
        const { data } = await gameApi.createTradeMines(payload);
        setBet({...payload, ...data});
        updateUserBalance(userId);
        return data;
      }
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${GAME_NAME}: Place Bet failed`,
        })
      );
    }
  }

  async function handleCashout(payload) {
    // audio.playBetSound();
    try {
      const { data } = await gameApi.cashoutMines(payload);
      getLastCashout(data.profit);
      setGameOver(true);
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${GAME_NAME}: Cashout failed`,
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

  const renderWallpaperBanner = () => {
    return (
      <Link data-tracking-id="alpacawheel-wallpaper" to={Routes.elonWallpaper}>
        <div className={styles.banner}></div>
      </Link>
    );
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text={GAME_NAME} />
            <Share popupPosition="right" className={styles.shareButton} />
            <Icon
              className={styles.questionIcon}
              iconType={IconType.question}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
              onClick={handleHelpClick}
            />
            {/*}
            <span
              onClick={handleHelpClick}
              className={styles.howtoLink}
              data-tracking-id="alpacawheel-how-does-it-work"
            >
              How does it work?
            </span>
            */}
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
              <GameAnimation
                cashouts={cashouts}
                setCashouts={setCashouts}
                inGameBets={inGameBets}
                bet={bet}
                amount={amount}
                setBet={setBet}
                mines={mines}
                setMines={setMines}
                onInit={audio => setAudio(audio)}
                gameInProgress={gameInProgress}
                setGameInProgress={setGameInProgress}
                gameApi={gameApi}
                setCurrentStep={setCurrentStep}
                gameOver={gameOver}
                setGameOver={setGameOver}
              />
              <Spins text="My Cashouts" spins={cashouts} />
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBetMines
                  connected={connected}
                  setAmount={setAmount}
                  amount={amount}
                  onBet={handleBet}
                  onCashout={handleCashout}
                  bet={bet}
                  setBet={setBet}
                  setMines={setMines}
                  mines={mines}
                  gameInProgress={gameInProgress}
                  setGameInProgress={setGameInProgress}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            </div>
          </div>
          {isMiddleOrLargeDevice ? (
            <div className={styles.bottomWrapper}>
              {renderChat()}
              {renderActivities()}
            </div>
          ) : null}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
