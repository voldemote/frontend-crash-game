import Carousel                from 'react-multi-carousel';
import CarouselNavigationGroup from '../CarouselNavigationGroup';
import React                   from 'react';
import styles                  from './styles.module.scss';

const CarouselContainer = ({ title, children }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items:      5,
        },
        desktop:           {
            breakpoint: { max: 3000, min: 1024 },
            items:      3,
        },
        tablet:            {
            breakpoint: { max: 1024, min: 464 },
            items:      2,
        },
        mobile:            {
            breakpoint: { max: 464, min: 0 },
            items:      1,
        },
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>
                    {title}
                </span>
            </div>
            <div className={styles.carousel}>
                <Carousel
                    responsive={responsive}
                    keyBoardControl={false}
                    arrows={false}
                    renderButtonGroupOutside
                    customButtonGroup={<CarouselNavigationGroup />}
                >
                    {children}
                </Carousel>
            </div>
        </div>
    );
};

export default CarouselContainer;
