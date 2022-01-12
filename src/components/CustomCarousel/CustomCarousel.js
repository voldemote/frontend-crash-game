import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import { isMobile, isTablet } from 'react-device-detect';
import { connect, useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';
import { dataLayerPush, trackWalletAddWfair } from 'config/gtm';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { GeneralActions } from 'store/actions/general';
import * as ApiUrls from 'constants/Api';

const CustomCarousel = ({loggedIn, carouselType = 'games', showWalletDepositPopup, handleKycInfoVisible, setOpenDrawer, userId}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const carouselLinks = {
    landingpage: !loggedIn ? [
      'hello-human',
      'deposit-bonus-nonlogged',
    ] : [
      'deposit-bonus', 
      'verify-kyc',
    ],

    games: [
      loggedIn || isMobile ? '/external-game/Cappadocia/Games' : 'hello-human',
      '/external-game/MoonStone/Slots',
      '/external-game/Samurai/Slots',
      '/external-game/BlazingHot40/Slots',
      '/external-game/Fruit5/Slots',
      '/external-game/JetX3/XGames',
      '/external-game/JetX/JetX',
      '/external-game/Balloon/Games',
    ]
  };

  const openFractal = () => {
    const kycUrl = ApiUrls.BACKEND_URL + ApiUrls.KYC_START_FOR_USER.replace(':userId', userId);
    window.open(kycUrl, "fractal", "width=480,height=700,top=150,left=150");
  }

  const onClickItem = itemIndex => {
    switch(carouselLinks[carouselType][itemIndex]) {
      case 'hello-human':
        dispatch(OnboardingActions.start());
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--hello-human',
        });
        break;
      case 'deposit-bonus-nonlogged':
        dispatch(OnboardingActions.start());
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--deposit-bonus-nonlogged',
        });
        break;
      case 'deposit-bonus':
        showWalletDepositPopup();
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--deposit-bonus',
        });
        break;
      case 'verify-kyc':      
        openFractal();
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--verify-kyc',
        });
        break;
      default:
        history.push(carouselLinks[carouselType][itemIndex]);
        break;
    }
  };

  const renderGames = () => {
    return (
      <Carousel
        className={styles.carousel}
        autoPlay
        interval={5000}
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
          src={(loggedIn || isMobile) ? "https://files.wallfair.io/alpacasino/games-carousel/games-1.jpeg" : "https://files.wallfair.io/alpacasino/games-carousel/sliderhuman.jpg"}
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-2.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-3.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-4.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-5.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-6.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-7.jpeg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://files.wallfair.io/alpacasino/games-carousel/games-8.jpeg"
        />
      </div>
    </Carousel>
    )
  }

  const renderLandingPageSlidesLoggedIn = () => {
    return (
      <Carousel
        className={styles.carousel}
        autoPlay
        interval={7000}
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
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/deposit-bonus-${!isMobile || isTablet ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/verify-kyc-${!isMobile || isTablet ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      
    </Carousel>
    )
  }

  const renderLandingPageSlides = () => {
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
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/hello-human-${!isMobile || isTablet ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/deposit-bonus-${!isMobile || isTablet ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      
    </Carousel>
    )
  }

  return (
    <div className={styles.carouselContainer}>
      {carouselType === 'games' && renderGames()}
      {carouselType === 'landingpage' && (loggedIn ? renderLandingPageSlidesLoggedIn() : renderLandingPageSlides())}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
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
  null,
  mapDispatchToProps
)(CustomCarousel);
