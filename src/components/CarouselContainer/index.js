import Carousel          from 'react-horizontal-scrolling-menu';
import React, { useRef } from 'react';
import styles            from './styles.module.scss';
import classNames        from 'classnames';
import { useState }      from 'react';

const CarouselContainer = ({ title, children }) => {
    const carouselRef                             = useRef();
    const [prevArrowVisible, setPrevArrowVisible] = useState(false);
    const [nextArrowVisible, setNextArrowVisible] = useState(true);

    const onUpdate = () => {
        const state              = carouselRef.current.state;
        const translate          = state.translate;
        const startDragTranslate = state.startDragTranslate;

        if (translate >= 0) {
            setPrevArrowVisible(false);
        } else {
            setPrevArrowVisible(true);
        }

        if (startDragTranslate >= 0) {
            setNextArrowVisible(false);
        } else {
            setNextArrowVisible(true);
        }
    };

    const getMappedChildren = () => {
        return React.Children.map(children, (child, index) => (
            <div key={index}>{child}</div>
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
                        onClick={() => {
                            carouselRef.current.handleArrowClick();
                        }}
                        className={classNames(
                            styles.arrowPrev,
                            prevArrowVisible ? styles.active : null,
                        )}
                    >
                        <span></span>
                    </button>
                    <button
                        onClick={() => {
                            carouselRef.current.handleArrowClickRight();
                        }}
                        className={classNames(
                            styles.arrowNext,
                            nextArrowVisible ? styles.active : null,
                        )}
                    >
                        <span></span>
                    </button>
                </div>
            </div>
            <div className={styles.carousel}>
                <Carousel
                    ref={carouselRef}
                    data={getMappedChildren()}
                    alignCenter={false}
                    hideArrows={true}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    );
};

export default CarouselContainer;
