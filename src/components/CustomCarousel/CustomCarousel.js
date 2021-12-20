import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';

const CustomCarousel =  () => (
  <Carousel autoPlay infiniteLoop={true} stopOnHover={false}>
    <div>
      <img alt="" src="https://i.ibb.co/WnNjgS2/dream.jpg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
    <div>
      <img alt="" src="https://i.ibb.co/j54SDhL/jetex-1920x740.jpg" />
      {/* <p className={styles.legend}>Legend 2</p> */}
    </div>
    <div>
      <img alt="" src="https://i.ibb.co/WnNjgS2/dream.jpg" />
      {/* <p className={styles.legend}>Legend 1</p> */}
    </div>
  </Carousel>
);

export default CustomCarousel;