import LiveBadge         from '../LiveBadge';
import React, { useRef } from 'react';
import styles            from './styles.module.scss';
import Link              from '../../components/Link';
import useSlider         from '../../components/hoc/useSlider';

const Header = ({ slides }) => {

    const slideImage                           = useRef(null);
    const slideText                            = useRef(null);
    const slideTags                            = useRef(null);
    const { goToPreviousSlide, goToNextSlide } = useSlider(slideImage, slideText, slideTags, slides);

    return (
        <div
            className={styles.header}
            ref={slideImage}
        >
            <div className={styles.headerOverlay}></div>
            <div className={styles.headerWrapper}>
                <div className={styles.headerContentContainer}>
                    <div className={styles.badgeContainer}>
                        <LiveBadge />
                    </div>
                    <span
                        ref={slideText}
                        className={styles.title}
                    ></span>
                    <div
                        ref={slideTags}
                        className={styles.tags}
                    ></div>
                    <div>
                        <Link
                            to={true}
                            className={styles.goToEvent}
                        >
                            <span>Go to event</span>
                            <div className={styles.arrowRight}></div>
                        </Link>
                    </div>
                </div>
                <div className={styles.switchButtons}>
                    <button
                        onClick={goToPreviousSlide}
                        className={styles.goToPreviousSlide}
                    >
                        <span></span>
                    </button>
                    <button
                        onClick={goToNextSlide}
                        className={styles.goToNextSlide}
                    >
                        <span></span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Header;