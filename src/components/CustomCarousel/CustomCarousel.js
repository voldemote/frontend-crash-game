import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';
import { dataLayerPush, trackWalletAddWfair } from 'config/gtm';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { GeneralActions } from 'store/actions/general';
import authState from 'constants/AuthState';
import Routes from 'constants/Routes';
import classNames from 'classnames';

import BackgroundFirst from '../../data/images/carousel/bg-first.png';
import BackgroundSecond from '../../data/images/carousel/bg-second.png';
import BackgroundThird from '../../data/images/carousel/bg-third.png';
import BannerImage1 from '../../data/images/carousel/banner-img1.png';
import JackpotImage from '../../data/images/carousel/jackpot.png';
import CardBg from '../../data/images/carousel/bg-card2.png';
import Coins from '../../data/images/carousel/coins.png';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import BetCard from 'components/BetCard';
import { useEventsFilter } from 'components/Events/hooks/useEventsFilter';
import BetState from 'constants/BetState';
import _ from 'lodash';
import { useCallback } from 'react';
import { useNotificationFilter } from 'components/Events/hooks/useNotificationFilter';
import { TOKEN_NAME } from 'constants/Token';
import { currencyDisplay } from 'helper/Currency';

const BottomBanner = ({title, price}) => {
  return (
    <div className={styles.bottomBanner}>
      {/* <img src={BannerImage1} alt='' /> */}
      <div className={styles.bottomBannerContent}>
        <p className={styles.title}>{title}<br />just earned</p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  )
}

const CustomCarousel = ({loggedIn, showWalletDepositPopup, handleKycInfoVisible, setOpenDrawer, userId, showPopup, phoneConfirmed}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { events } = useEventsFilter([BetState.active], 'all', 0, true);

  const {notifications} = useNotificationFilter('Notification/EVENT_USER_REWARD');
  console.log('notifications', notifications);

  const onClickItemFirstBanner = useCallback(() => {
    if (loggedIn) {
      history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));

      if (phoneConfirmed) {
        showPopup(PopupTheme.eventForms, {});
      } else {
        dispatch(OnboardingActions.addPhoneNumber());
      }

    } else {
      dispatch(OnboardingActions.start());
      dataLayerPush({
        event:'gtm.click',
        'gtm.elementId': 'banner--create-events',
      });
    }
  }, []);

  const onClickItemSecondBanner = useCallback(() => {
        history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--fun-events',
        });
  }, []);

  const onClickItemThirdBanner = useCallback(() => {
        history.push(Routes.leaderboard);
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--bonus',
        });
  }, []);

  const renderBetCard = () => {
    if (events.length > 0) {
      const event = events[0];    
      const bet = event.bet;
      const betId = _.get(event.bet, 'id');
      const eventSlug = _.get(event, 'slug');
      const tags = _.get(event, 'tags');
      const marketQuestion = _.get(bet, 'market_question');
      const outcomes = _.get(bet, 'outcomes');

      return (
        <Link
          key={betId}
          to={{
            pathname: `/trade/${eventSlug}`,
            state: { fromLocation: location },
          }}
          className={styles.eventLink}
        >
          <BetCard
            key={betId}
            betId={betId}
            title={marketQuestion}
            organizer={''}
            image={event.preview_image_url}
            eventEnd={bet.end_date}
            outcomes={outcomes}
            eventCardClass={styles.eventCardHome}
            category={event?.category ? event.category : 'all'}
            isBookmarked={!!bet?.bookmarks?.includes(userId)}
            tags={tags}
            onBookmark={() => {}}
            onBookmarkCancel={() => {}}
          />
        </Link>
      );
    }
  };

  const render3BetCards = () => {
    return (
      <div className={styles.cardContainer}>
        <span className={styles.title}>TOP 3 EVENTS</span>
        <div className={styles.cardsWrapper}>
          <BetCard
            key={'1'}
            betId={'bet2'}
            title={'eSports Alliance JIB PUBG'}
            organizer={''}
            image={CardBg}
            eventEnd={'2022-02-28'}
            outcomes={[]}
            eventCardClass={styles.card}
            category={'all'}
            isBookmarked={false}
            tags={[{name: 'esports'}, {name: 'racing'}]}
            onBookmark={() => {}}
            onBookmarkCancel={() => {}}
          />
          <BetCard
            key={'1'}
            betId={'bet2'}
            title={'eSports Alliance JIB PUBG'}
            organizer={''}
            image={CardBg}
            eventEnd={'2022-02-28'}
            outcomes={[]}
            eventCardClass={styles.card}
            category={'all'}
            isBookmarked={false}
            tags={[{name: 'esports'}, {name: 'racing'}]}
            onBookmark={() => {}}
            onBookmarkCancel={() => {}}
          />
          <BetCard
            key={'1'}
            betId={'bet2'}
            title={'eSports Alliance JIB PUBG'}
            organizer={''}
            image={CardBg}
            eventEnd={'2022-02-28'}
            outcomes={[]}
            eventCardClass={styles.card}
            category={'all'}
            isBookmarked={false}
            tags={[{name: 'esports'}, {name: 'racing'}]}
            onBookmark={() => {}}
            onBookmarkCancel={() => {}}
          />
        </div>

      </div>
    )
  }
  const renderSlides = () => {
    return (
      <Carousel
        className={styles.carousel}
        autoPlay
        interval={6500}
        transitionTime={800}
        infiniteLoop={true}
        stopOnHover={false}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        onClickItem={() => {}}
      >
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundFirst}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>CREATE YOUR<br/>OWN EVENT AND<br/><span className={styles.secondTitle}>MAKE MONEY!</span></h2>
              <p className={styles.description}>
                Create events within 2 minutes, share them with<br/> 
                your friends and earn real money.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Create an event</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {renderBetCard()}
            <img src={Coins} className={styles.coins} alt="coins" />
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundSecond}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>TRADE ON<br/><span className={styles.secondTitle}>FUN EVENTS!</span></h2>
              <p className={styles.description}>
                Share the events with your friends or community. <br/>
                The best and most interesting events will be rewarded.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} theme={ButtonTheme.secondaryButton} onClick={onClickItemFirstBanner}>Discover all Events</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {render3BetCards()}
          </div>
        </div>
        <div className={styles.bottomBannerContainner}>
          {notifications.slice(0, 5).map(activity => {
            return (
              <BottomBanner
                title={`${activity.data?.user?.username} earned`}
                price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundThird}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>WEEKLY CHANCE TO<br/><span className={styles.thirdTitle}>WIN 2,500 USD!</span></h2>
              <p className={styles.description}>
                Your community and your friends can actively participate in<br/> 
                your event and make sure that you might hit the weekly jackpot.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} theme={ButtonTheme.secondaryButton} onClick={onClickItemFirstBanner}>Go to Leaderboard</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            <img src={JackpotImage} alt='' />
            <img src={Coins} className={styles.coins} alt="coins" />
          </div>
        </div>
        <div className={styles.bottomBannerContainner}>
          {notifications.slice(0, 5).map(activity => {
            return (
              <BottomBanner
                title={`${activity.data?.user?.username} earned`}
                price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
              />
            )
          })}
        </div>
      </div>
    </Carousel>
    )
  }

  return <>
    <div className={classNames(styles.carouselContainer)}>
      {renderSlides()}
    </div>
  </>;
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
    phoneConfirmed: state.authentication.phoneConfirmed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    handleKycInfoVisible: bool => {
      dispatch(GeneralActions.setKycInfoVisible(bool));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomCarousel);
