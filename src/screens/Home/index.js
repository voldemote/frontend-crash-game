import { useEffect, useState, memo } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { LOGGED_IN } from 'constants/AuthState';
import {
  EXTERNAL_GAMES,
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  TOP_GAMES,
} from '../../constants/Games';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import GameSmartsoft from 'components/GameSmartsoft';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { GeneralActions } from '../../store/actions/general';
import howTokenWorkPToken from '../../data/images/token/PToken.png';
import howTokenWorkWToken from '../../data/images/token/WToken.png';
import EloneWithPhone from '../../data/images/elon-with-phone.png';

import { ReactComponent as DiscordMarker } from '../../data/images/home/discord-mark.svg';
import { ReactComponent as LimitedOffer } from '../../data/images/limited-offer.svg';

import TopFront from '../../data/images/top-front-corner-image.png';
import TopBack from '../../data/images/top-back-corner-image.png';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';

import EventActivitiesTab from 'components/EventActivitiesTabs';
import classNames from 'classnames';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { OnboardingActions } from 'store/actions/onboarding';
import GameContentCards from 'components/GameContentCards/GameContentCards';
import { TOKEN_NAME } from 'constants/Token';
import GameCards from 'components/GameCards';
import LimitedOfferBanner from 'components/LimitedOfferBanner';
import Routes from 'constants/Routes';

const Home = ({
  authState,
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  startOnboardingFlow,
}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  let alpacaGames = showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES;
  const [showDiscordBanner, setShowDiscordBanner] = useState(false);

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

  const handleVoluumPersistent = () => {
    const sid = urlParams.get('sid');
    const cid = urlParams.get('cid');

    if (sid) {
      localStorage.setItem('urlParam_sid', sid);
    }

    if (cid) {
      localStorage.setItem('urlParam_cid', cid);
    }
  };

  useEffect(() => {
    if (isMount) {
      // fetchTags();
      renderBetApprovePopup();
      handleRefPersistent();
      handleVoluumPersistent();
      setShowDiscordBanner(!checkdDiscordBanner());
    }
  }, []);

  const checkdDiscordBanner = () => {
    return localStorage.getItem('discordBanner') || false;
  };

  const hideDiscordBanner = () => {
    localStorage.setItem('discordBanner', true);
    setShowDiscordBanner(false);
  }

  const renderDiscordBanner =() => {
    return (
      <div className={classNames(styles.discordBanner, isLoggedIn() && styles.withPadding)}>
        <div className={styles.backgroundWrapper}>
          <div className={styles.whiteWrapper}>
            <div className={styles.whiteContainer}>
              <a
                href="https://discord.gg/vxAtN9y4Vt"
                target="_blank"
                rel="noreferrer"
              >
              <DiscordMarker/>
              </a>
            </div>
          </div>
          <div className={styles.bodyContainer}>
            <Icon
              className={styles.closeButton}
              width={30}
              height={30}
              iconType={IconType.close}
              onClick={hideDiscordBanner}
            />
            <p>
              <a
                href="https://discord.gg/vxAtN9y4Vt"
                target="_blank"
                rel="noreferrer"
              >
                Join Discord for early access of Games, News and Airdrops
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

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
                in the WALLFAIR playground for risk and care free betting fun
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
                WFAIR is the protocol token used on smart contracts. Wallfair
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
    alpacaGames = alpacaGames.filter((game, i) => i < 6);
    return <GameCards gameTitle games={alpacaGames} category="House Games" />;
  };

  const renderSlogGames = () => {
    const externalGames = TOP_GAMES;
    return (
      <div className={classNames(styles.allGamesContiner)}>
        <GameSmartsoft gameTitle games={externalGames} category="Slot Games" />

        <p className={styles.allGames}>
          <Link to="/games">
          More games
          </Link>
          </p>
      </div>
    );
  };

  const renderAboutDescription = () => {
    return (
      <div className={styles.aboutDescritpion}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Fair</h1>
                  <p>
                    We have a mission to prove that crypto casino can just the
                    pure entertainment. We operate on open source code, provide
                    honest bonuses, and publicly communicate the house edges
                    along with a full history of all the bets. Simply no hidden
                    tricks just awesome fun!
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Unique</h1>
                  <p>
                    In Wallfair you play with WFAIR, our own crypto currency.
                    It gives you the advantage to earn money even when you are
                    not playing. Stake your winnings and watch your wallet grow!
                    The more people sign up, deposit and play, the higher the
                    value of you wallet!{' '}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Social</h1>
                  <p>
                    Wallfair is our flagship project
                    that presents the future of the speculative entertainment.
                    The future where world of betting, gambling and gaming is
                    blended into one huge theme park metaverse. The place where
                    you meet people and enjoy the excitement of potential
                    rewards!
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const showPopupForUnauthenticated = () => {
    if (!isLoggedIn()) {
      startOnboardingFlow();
    }
  };

  const renderWelcome = () => {
    return (
      <div className={styles.welcomeContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.cardBox}>
            <p>
              Welcome to
              <br /> <span>Wallfair</span>
            </p>

            <LimitedOfferBanner />
            <span className={styles.limitedOfferDescription}>
              <span className={classNames(styles.highlighted, styles.red)}>100%</span>
              <p>top-up on 1<sup>st</sup> deposit</p>
              <span>up to 100&nbsp;000 WFAIR<sup>*</sup></span>
              <ul className={styles.conditionsWrapper}>
                <li className={styles.conditions}>start playing in 1 min</li>
                <li className={styles.conditions}>limited to 1000 users</li>
                <li className={styles.conditions}>100% fair</li>
              </ul>
            </span>

            <button
              className={styles.startButton}
              onClick={showPopupForUnauthenticated}
            >
              Register for free
            </button>
            <span className={styles.terms}><sup>*</sup><Link target="_blank" to={Routes.terms}>Terms &amp; Conditions</Link></span>
            <img className={styles.topFront} src={TopFront} alt="" />
            <img className={styles.topBack} src={TopBack} alt="" />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <BaseContainerWithNavbar home loggedIn={isLoggedIn()}>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {!isLoggedIn() && renderWelcome()}
          {showDiscordBanner && renderDiscordBanner()}
          {renderHouseGames()}
          {renderSlogGames()}
          {renderAboutDescription()}
          {renderActivities()}
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
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
