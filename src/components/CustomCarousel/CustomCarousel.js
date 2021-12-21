import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';

const CustomCarousel =  () => (
  <Carousel className={styles.carousel} autoPlay interval={4000} transitionTime={800} infiniteLoop={true} stopOnHover={false} showArrows={false} showStatus={false} showIndicators={false} >
    <div>
      <img alt="" src="https://files.wallfair.io/alpacasino/games-carousel/games-1.jpeg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
    <div>
      <img alt="" src="https://files.wallfair.io/alpacasino/games-carousel/games-2.jpeg" />
      {/* <p className={styles.legend}>Legend 2</p> */}
    </div>
    <div>
      <img alt="" src="https://files.wallfair.io/alpacasino/games-carousel/games-3.jpeg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
    <div>
      <img alt="" src="https://files.wallfair.io/alpacasino/games-carousel/games-4.jpeg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
    <div>
      <img alt="" src="https://files.wallfair.io/alpacasino/games-carousel/games-5.jpeg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
  </Carousel>
);

export default CustomCarousel;