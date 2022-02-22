import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
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
import BackgroundCard from '../../data/images/carousel/bg-card.png';
import BannerImage1 from '../../data/images/carousel/banner-img1.png';
import {ReactComponent as LockIcon} from '../../data/images/carousel/lock.svg';
import Button from 'components/Button';

const BottomBanner = (title, price) => {
  return (
    <div className={styles.bottomBanner}>
      <img src={BannerImage1} alt='' />
      <div className={styles.bottomBannerContent}>
        <p className={styles.title}>T.P just earned</p>
        <p className={styles.price}>239 WFAIR</p>
      </div>
    </div>
  )
}
const CustomCarousel = ({loggedIn, showWalletDepositPopup, handleKycInfoVisible, setOpenDrawer, userId, showPopup, phoneConfirmed}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const carouselLinks = [
      'create-events',
      'fun-events',
      'bonus',
  ];

  const onClickItem = itemIndex => {
    switch(carouselLinks[itemIndex]) {
      case 'create-events':
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
        break;
      case 'fun-events':
        history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--fun-events',
        });
        break;
      case 'bonus':
        history.push(Routes.leaderboard);
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--bonus',
        });
        break;
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
                <Button className={styles.button}>Create an event</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            <div className={styles.card}>
              <img className={styles.cardImage} src={BackgroundCard} alt='' />
              <div className={styles.liveReact}>
                <span className={styles.oval} />
                <p>LIVE</p>
              </div>
              <div className={styles.cardContent}>
                <h2>My Birthday Burger Championship IV</h2>
                <div className={styles.lockWrapper}>
                  <LockIcon />
                  <p>INVITE ONLY</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className={styles.bottomBannerContainner}>
          <BottomBanner/>
          <BottomBanner/>
          <BottomBanner/>
          <BottomBanner/>
          <BottomBanner/>
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

  const renderMobileSlides = () => {
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
        onClickItem={onClickItem}
      >
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/landingpage-carousel/banner-1-mobile.jpg?v=3`}
        />
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
