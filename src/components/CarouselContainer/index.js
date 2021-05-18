import Carousel                from 'react-horizontal-scrolling-menu';
import React, { useRef } from 'react';
import styles                  from './styles.module.scss';

const CarouselContainer = ({ title, children }) => {

    const CarouselRef = useRef();

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>
                    {title}
                </span>

                <div className={styles.scrollButtons}>
                    <button onClick={() => { CarouselRef.current.handleArrowClick() }} className={styles.arrowPrev}><span></span></button>
                    <button onClick={() => { CarouselRef.current.handleArrowClickRight() }} className={styles.arrowNext}><span></span></button>
                </div>
            </div>
            <div className={styles.carousel}>
                <Carousel ref={CarouselRef} data={children} alignCenter={false} hideArrows={true} />
            </div>
        </div>
    );
};

export default CarouselContainer;
