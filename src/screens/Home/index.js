import { useEffect, memo} from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import Routes from 'constants/Routes';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import SocialIcons from 'components/SocialIcons';
import { GeneralActions } from '../../store/actions/general';
import SlotGameIconBg from '../../data/images/house-games/title.svg';
import howTokenWorkTitle from '../../data/images/token/title.svg';
import howTokenWorkPToken from '../../data/images/token/PToken.png';
import howTokenWorkWToken from '../../data/images/token/WToken.png';
import EloneWithPhone from '../../data/images/elon-with-phone.png';
import alpacaActivities from '../../data/images/alpaca-activities.svg';
import gameCard1 from '../../data/images/house-games/card-1.png';
import gameCard5 from '../../data/images/house-games/card-5.png';
import gameCard3 from '../../data/images/house-games/card-3.png';
import gameCard4 from '../../data/images/house-games/card-4.png';
import IceCreamImg from '../../data/images/alpaca-verse/ice-cream.png';
import SocialImg from '../../data/images/alpaca-verse/social-img.png';
import GemsImg from '../../data/images/alpaca-verse/gems.png';
import FairImg from '../../data/images/alpaca-verse/fair-img.png';
import StarImg from '../../data/images/alpaca-verse/star.png';
import DecentralImg from '../../data/images/alpaca-verse/decentral-img.png';

import EventActivitiesTab from 'components/EventActivitiesTabs'

const Home = ({ tags, setOpenDrawer, fetchTags, showPopup, events}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);

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
      fetchTags();
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

  const onSeeLeaderboard = () => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  };

  const renderTags = () => {
    return (
      <div className={styles.tags}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <div key={index} className={styles.tag}>
                #{tag}
              </div>
            );
          })}
      </div>
    );
  };

  const renderRosiBanner = () => {
    return (
      <Link data-tracking-id="home-play-elon" to={Routes.elonGame}>
        <div className={styles.banner}>
          <div className={styles.title}>Play the Elon Game</div>
          <button className={styles.button}>SIGN UP!</button>
        </div>
      </Link>
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
                  PFAIR are WALLFAIRS FREE to play tokens. 
                  The  tokens can be used in our WALLFAIR ALPHA playgound for 
                  risk and care free betting fun
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
                  WFAIR is the protocol token used on 
                  smart contracts. Alpacasino is a play-money simulation (“PFAIR”)  of WFAIR use cases. 
                  You can buy and trade WFAIR here→ WALLFAIR/BUY
                </p>
              </div>
            </div>
            <div className={styles.token}>
              <div className={styles.thumbnails}>
                <img src={howTokenWorkPToken} alt="" />
                <img className={styles.second} src={howTokenWorkWToken} alt="" />
              </div>
              <div className={styles.detail}>
                <h3>Exchange PFAIR = WFAIR</h3>
                <p>
                  If you rise to the top 10 of our leaderboard every week. 
                  You can exchange your PFAIR winnings for WFAIR and 
                  have the chance to win £20,000!
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
            <img src={alpacaActivities} alt="" />
            <h2>
              Activities
            </h2>
        </div>
        <Grid item xs={12} >
          <EventActivitiesTab
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            layout='wide'></EventActivitiesTab>
        </Grid>
      </div>
      );
  };

  const renderGamesCards = () => {
    return (
      <div className={styles.gameCards}>
        <div className={styles.title}>
          <img src={SlotGameIconBg} alt={'Visit slot games'} />
          <h2>House Games</h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container>
            <Grid item lg={3} md={6} xs={12}>
              <Link to={'/games/alpaca-wheel'}>
                <img src={gameCard1} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard5} alt="" />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard3} alt="" />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard4} alt="" />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const renderAlpacaVerse = () => {
    return (
      <div className={styles.alpacaverse}>
        <div className={styles.title}>
          <h2>
            Welcome to the <span class={styles.pink}>ALPACA</span>VERSE            
          </h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={IceCreamImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>
                    SOCIAL
                  </h3>
                  <p>
                    It’s simple: Alpacas are social animals 
                    = Alpacasino is a social Betwork. 
                    Alpacas from all over the world meet to chat ...
                  </p>
                  <button>
                    READ MORE
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={SocialImg} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div
                  className={styles.thumbnail}
                  style={{ marginBottom: '-25px' }}>
                  <img src={GemsImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>
                    FAIR
                  </h3>
                  <p>
                    Alpacas are sometimes funny
                    and misbehaving but always fair.
                    We believe in a maximum of transparency ...
                  </p>
                  <button>
                    READ MORE
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={FairImg} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={StarImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>DECENTRAL</h3>
                  <p>
                    Alpacas are self governing animals. 
                    Wallfair is a combination of smart contracts running 
                    on decentralized Polygon blockchain ...
                  </p>
                  <button>
                    READ MORE
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={DecentralImg} alt="" />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar>
      {/* {renderHeadline()} */}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {renderGamesCards()}
          {renderRosiBanner()}
          {renderActivities()}
          {renderAlpacaVerse()}
          {renderHowTokenWorks()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
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
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
