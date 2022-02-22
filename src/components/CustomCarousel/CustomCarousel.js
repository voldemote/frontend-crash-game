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
import BannerImage1 from '../../data/images/carousel/banner-img1.png';
import Coins from '../../data/images/carousel/coins.png';
import Button from 'components/Button';
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
        <p className={styles.title}>{title}</p>
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
    console.log('events!!!', events);
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
              <h2>CREATE YOUR OWN EVENT AND <span className={styles.secondTitle}>MAKE MONEY!</span></h2>
              <p className={styles.description}>
                Create events within 2 minutes, share them with 
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
      {/* <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/slide_2_bg.jpg?v=3`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/slide_3_bg.jpg?v=3`}
        />
      </div> */}
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
