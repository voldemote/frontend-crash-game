import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

const CustomCarousel = props => {
  const history = useHistory();
  const bannerUrlLinks = [
    '/games/alpaca-wheel',
    '/external-game/JetX/JetX',
    '/external-game/VirtualRoulette/Roulette',
    '/external-game/ClassicKeno/Keno',
    '/external-game/JetX3/XGames',
  ];

  const onClickItem = itemIndex => {
    history.push(bannerUrlLinks[itemIndex]);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        className={styles.carousel}
        autoPlay
        interval={4000}
        transitionTime={800}
        infiniteLoop={true}
        stopOnHover={false}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        onClickItem={onClickItem}
      >
        <div>
          <img
            alt=""
            src="https://files.wallfair.io/alpacasino/games-carousel/games-1.jpeg"
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
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
