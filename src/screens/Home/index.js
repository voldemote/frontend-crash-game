import { useEffect, useState, memo } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { LOGGED_IN } from 'constants/AuthState';
import {
  EXTERNAL_GAMES
} from '../../constants/Games';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import Button from '../../components/Button';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import SocialIcons from 'components/SocialIcons';
import GameSmartsoft from 'components/GameSmartsoft';
import { GeneralActions } from '../../store/actions/general';
import howTokenWorkPToken from '../../data/images/token/PToken.png';
import howTokenWorkWToken from '../../data/images/token/WToken.png';
import EloneWithPhone from '../../data/images/elon-with-phone.png';
import gameCardWheel from '../../data/images/house-games/card-wheel.png';
import gameCardElon from '../../data/images/house-games/card-elon.png';
import gameCardPlinko from '../../data/images/house-games/card-plinko.png';
import gameCardPumpDump from '../../data/images/house-games/card-pumpdump.png';
import gameCardMines from '../../data/images/house-games/card-mines.png';
import MagentaAlpaca from '../../data/images/alpaca-dopter/magenta-alpaca.png';
import MagentaChip from '../../data/images/alpaca-dopter/magenta-chip.png';
import MagentaThumbnail from '../../data/images/alpaca-dopter/magenta-thumbnail.png';
import BlueAlpaca from '../../data/images/alpaca-dopter/blue-alpaca.png';
import BlueChip from '../../data/images/alpaca-dopter/blue-chip.png';
import BlueThumbnail from '../../data/images/alpaca-dopter/blue-thumbnail.png';
import YellowAlpaca from '../../data/images/alpaca-dopter/yellow-alpaca.png';
import YellowChip from '../../data/images/alpaca-dopter/yellow-chip.png';
import YellowThumbnail from '../../data/images/alpaca-dopter/yellow-thumbnail.png';
import AlphaLogo from '../../data/images/alpaca-dopter/alpha.png';

import AlpacaPink from '../../data/images/home/alpaca-pink.svg';
import AlpacaBlue from '../../data/images/home/alpaca-blue.svg';
import AlpacaYellow from '../../data/images/home/alpaca-yellow.svg';

import EventActivitiesTab from 'components/EventActivitiesTabs';
import classNames from 'classnames';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { OnboardingActions } from 'store/actions/onboarding';
import GameContentCards from 'components/GameContentCards/GameContentCards';
import { TOKEN_NAME } from 'constants/Token';

const Home = ({
  authState,
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  startOnboardingFlow
}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);

  useOAuthCallback();

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderBetApprovePopup = async () => {
    if (isMount) {
      if (eventId && betId && tradeId) {
        const event = State.getEventByTrade(betId, events);
        const bet = State.getTradeByEvent(betId, event);
        const tradeResponse = await getTradeById(tradeId).catch(err => {
          console.error("Can't get trade by id:", err);
        });

        const trade = _.get(tradeResponse, 'data', null);

        const options = {
          eventId: eventId,
          betId: betId,
          tradeId: tradeId,
          data: {
            bet: bet,
            trade: trade,
          },
          hideShare: true,
        };

        if (betId && tradeId && eventId) {
          showPopup('betApprove', options);
        }
      }
    }
  };

  const handleRefPersistent = () => {
    const ref = urlParams.get('ref');

    if (ref) {
      localStorage.setItem('urlParam_ref', ref);
    }
  };

  useEffect(() => {
    if (isMount) {
      // fetchTags();
      renderBetApprovePopup();
      handleRefPersistent();
    }
  }, []);

  const renderHeadline = () => {
    return (
      <div className={styles.mainHeadline}>
        <h1>Betting Reimagined</h1>

        <div className={styles.slogan}>Clear, Social &amp; Fair</div>

        <SocialIcons
          className={styles.socialIcons}
          dataTrackingIds={{
            telegram: 'home-telegram',
            instagram: 'home-instagram',
            twitter: 'home-twitter',
          }}
        />
      </div>
    );
  };

  const renderHowTokenWorks = () => {
    return (
      <div className={styles.howTokenWorks}>
        <div className={styles.tokenDetail}>
          <div className={styles.token}>
            <div className={styles.thumbnail}>
              <img src={howTokenWorkPToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>$PFAIR Token?</h3>
              <p>
                PFAIR is Wallfair's FREE-TO-PLAY token. The tokens can be used
                in the ALPACASINO playground for risk and care free betting fun
              </p>
            </div>
          </div>
          <div className={styles.token}>
            <div className={styles.thumbnail}>
              <img src={howTokenWorkWToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>$WFAIR Token?</h3>
              <p>
                WFAIR is the protocol token used on smart contracts. Alpacasino
                is a play-money simulation (“PFAIR”) of WFAIR use cases. You can
                buy and trade WFAIR{' '}
                <a
                  href="https://wallfair.io/buy-wfair"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
              </p>
            </div>
          </div>
          <div className={styles.token}>
            <div className={styles.thumbnails}>
              <img src={howTokenWorkPToken} alt="" />
              <img className={styles.second} src={howTokenWorkWToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>WEEKLY Awards</h3>
              <p>
                Keep playing and rise to the top of the leaderboard every week
                and increase the chances of winning real WFAIR tokens. Winners
                will be announced every Monday!
              </p>
            </div>
          </div>
          <div className={styles.elonImg}>
            <img src={EloneWithPhone} alt="elon-with-phone" />
          </div>
        </div>
      </div>
    );
  };

  const renderUniswap = () => {
    return (
      <div className={styles.lightboxWrapper}>
        <Lightbox>
          <UniswapContent />
        </Lightbox>
      </div>
    );
  };

  const renderActivities = () => {
    return (
      <div className={styles.activities}>
        <div className={styles.title}>
          <h2>Activities</h2>
        </div>
        <Grid item xs={12}>
          <EventActivitiesTab
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            layout="wide"
          ></EventActivitiesTab>
        </Grid>
      </div>
    );
  };

  const renderHouseGames = () => {
    return (
      <div className={styles.gameCards}>
        <div className={styles.title}>
          <h2>House Games</h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} xs={6}>
              <Link to={'/games/pump-dump'}>
                <img src={gameCardPumpDump} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={3} xs={6}>
              <Link to={'/games/elon-game'}>
                <img src={gameCardElon} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={3} xs={6}>
              <Link to={'/games/plinko'}>
                <img src={gameCardPlinko} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={3} xs={6}>
              <Link to={'/games/mines'}>
                <img src={gameCardMines} alt="" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const renderSlogGames = () => {
    return (
      <div className={styles.gameCards}>
        <GameSmartsoft
          games={EXTERNAL_GAMES}
          category="Slot Games"
        />
      </div>
    )
  }

  const renderWelcome = () => {
    const showPopupForUnauthenticated = () => {
      if (!isLoggedIn()) {
        startOnboardingFlow();
      }
    };
    return (
      <div className={styles.welcomeContainer}>
        <div className={styles.cardBox}>
          <h1>Alpacasino</h1>
          <h2>
            Get your <span className={styles.highlight}>50 {TOKEN_NAME} bonus</span> and<br/>
            create your <span className={styles.highlight}>alpaca</span>
          </h2>

          <Button
            className={styles.startButton}
            onClick={showPopupForUnauthenticated}>
            <span className={styles.buttonText}>Sign up</span>
          </Button>
          <img className={styles.alpacaPink} src={AlpacaPink} alt="" />
          <img className={styles.alpacaYellow} src={AlpacaYellow} alt="" />
          <img className={styles.alpacaBlue} src={AlpacaBlue} alt="" />
        </div>
      </div>
    );
  };
  const renderAlpacaDopter = () => {
    return (
      <div className={styles.alpacadopter}>
        <div className={styles.title}>
          <h2>
            Become an Early <span className={styles.pink}>ALPACA</span>DOPTER
          </h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailMagenta}>
                  <img src={MagentaAlpaca} alt="" />
                  <img src={MagentaChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <h3>Choose your Alpaca</h3>
                    <p>
                      Choose your Alpacavatar and name to join the gang. Play
                      fun games, interact, follow, chat to grow your Alpaca to
                      win the leaderboard and unlock cool NFT and crypto prices.
                    </p>
                  </div>
                  <div
                    className={classNames(styles.thumbnail, styles.cactusJack)}
                  >
                    <img src={MagentaThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailBlue}>
                  <img src={BlueAlpaca} alt="" />
                  <img src={BlueChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <h3>Grow your Alpaca</h3>
                    <p>
                      You can earn {TOKEN_NAME} tokens in multiple ways: You can play
                      our house games (we are going to launch new games weekly),
                      invite other alpacas, provide feedback and (soon) battle
                      other alpacas(or bet on other alpaca fights) and send
                      tokens among each other.
                    </p>
                  </div>
                  <div className={styles.thumbnail}>
                    <img src={BlueThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailYellow}>
                  <img src={YellowAlpaca} alt="" />
                  <img src={YellowChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <div className={styles.title}>
                      <h3>What Is</h3>
                      <img src={AlphaLogo} alt="" />
                    </div>
                    <p>
                      Alpacasino is a play-money testing platform for the
                      developers behind Wallfair. We’re using play-money
                      (“PFAIR”) which is completely virtual and you do not need
                      to invest, risk or even lose any real money or
                      cryptocurrencies.
                    </p>
                  </div>
                  <div className={styles.thumbnail}>
                    <img src={YellowThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* <div className={styles.bottomContainer}>
          <div className={styles.bottomBox}>
            <p>CREATE YOUR OWN <span className={styles.pink}>ALPACA</span> NOW!</p>
          </div>
        </div> */}
      </div>
    );
  };
  const renderAlpacaVerse = () => {
    return (
      <div className={styles.alpacaverse}>
        <div className={styles.title}>
          <h2>
            Welcome to the <span className={styles.pink}>ALPACA</span>VERSE
          </h2>
        </div>
        <GameContentCards />
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar
      home
      loggedIn={isLoggedIn()}
      >
      {/* {renderHeadline()} */}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {!isLoggedIn() && renderWelcome()}
          {renderHouseGames()}
          {renderSlogGames()}
          {renderActivities()}
          {renderAlpacaDopter()}
          {renderAlpacaVerse()}
          {renderHowTokenWorks()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    tags: state.event.tags,
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    fetchTags: () => {
      dispatch(EventActions.fetchTags());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    startOnboardingFlow: () =>{
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
