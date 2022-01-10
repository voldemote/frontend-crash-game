import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';

const CustomCarousel = ({loggedIn, carouselType = 'games'}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const carouselLinks = {
    landingpage: loggedIn ? [
      'hello-human',
      'deposit-bonus',
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

  const onClickItem = itemIndex => {
    switch(carouselLinks[carouselType][itemIndex]) {
      case 'hello-human':
        dispatch(OnboardingActions.start());
        break;
      case 'deposit-bonus':
        dispatch(OnboardingActions.start());
        break;
      case 'verify-kyc':
        dispatch(OnboardingActions.start());
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
        interval={6500}
        transitionTime={800}
        infiniteLoop={true}
        stopOnHover={false}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        onClickItem={onClickItem}
      >
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/deposit-bonus-${!isMobile ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/verify-kyc-${!isMobile ? 'desktop' : 'mobile'}.jpg`}
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
        onClickItem={onClickItem}
      >
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/hello-human-${!isMobile ? 'desktop' : 'mobile'}.jpg`}
        />
      </div>
      <div>
        <img
          alt=""
          src={`https://files.wallfair.io/alpacasino/landingpage-carousel/deposit-bonus-${!isMobile ? 'desktop' : 'mobile'}.jpg`}
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

export default CustomCarousel;
