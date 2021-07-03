import 'swiper/swiper.min.css';
import React, { useRef }       from 'react';
import classNames              from 'classnames';
import styles                  from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState }            from 'react';

const CarouselContainer = ({ title, children }) => {
    const carouselRef                             = useRef();
    const [prevArrowVisible, setPrevArrowVisible] = useState(false);
    const [nextArrowVisible, setNextArrowVisible] = useState(true);

    const getMappedChildren = () => {
        return React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
        ));
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>
                    {title}
                </span>

                <div className={styles.scrollButtons}>
                    <button
                        className={classNames(
                            styles.arrowPrev,
                            prevArrowVisible ? styles.active : null,
                        )}
                    >
                        <span>
                        </span>
                    </button>
                    <button
                        className={classNames(
                            styles.arrowNext,
                            nextArrowVisible ? styles.active : null,
                        )}
                    >
                        <span>
                        </span>
                    </button>
                </div>
            </div>
            <div className={styles.carousel}>
                <Swiper
                    ref={carouselRef}
                    slidesPerView={'auto'}
                    pagination={{
                        'clickable': false,
                    }}
                >
                    {getMappedChildren()}
                </Swiper>
            </div>
        </div>
    );
};

export default CarouselContainer;
