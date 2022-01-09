import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';

const CustomCarousel = ({loggedIn}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bannerUrlLinks = [
    loggedIn || isMobile ? '/external-game/Cappadocia/Games' : 'hellohuman',
    '/external-game/MoonStone/Slots',
    '/external-game/Samurai/Slots',
    '/external-game/BlazingHot40/Slots',
    '/external-game/Fruit5/Slots',
    '/external-game/JetX3/XGames',
    '/external-game/JetX/JetX',
    '/external-game/Balloon/Games',
  ];

  const onClickItem = itemIndex => {
    console.log(bannerUrlLinks[itemIndex]);
    if (bannerUrlLinks[itemIndex] === 'hellohuman') {
      dispatch(OnboardingActions.start());
      return;
    }
    history.push(bannerUrlLinks[itemIndex]);
  };

  return (
    <div className={styles.carouselContainer}>
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
    </div>
  );
};

export default CustomCarousel;
