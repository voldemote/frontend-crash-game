import LiveBadge         from '../LiveBadge';
import { useState }      from 'react';
import styles            from './styles.module.scss';
import Link              from '../../components/Link';
import ReactPlayer       from 'react-player';
import { Carousel }      from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Header = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    };

    return (
        <div className={styles.header}>

            <Carousel 
                emulateTouch={true} 
                infiniteLoop={false} 
                showArrows={false} 
                autoPlay={false}
                showStatus={false} 
                showIndicators={false}
                showThumbs={false} 
                dynamicHeight={true}
                selectedItem={currentSlide}
                onChange={(index) => { updateCurrentSlide(index) }}
            >
                {slides.map((slide, index) =>(
                    <div key={index}>
                        <div className={styles.headerOverlay}></div>
                        <ReactPlayer key={index} width="100%" height="600px" url={slide.src} playing={currentSlide === index ? true : false} />
                        <div className={styles.headerWrapper}>
                            <div className={styles.headerContentContainer}>
                                <div className={styles.badgeContainer}>
                                    <LiveBadge />
                                </div>
                                <span className={styles.title}>{slide.text}</span>
                                <div className={styles.tags}>
                                    {slide.tags.map((tag, index) => (
                                        <span>{tag}&nbsp;</span>
                                    ))}
                                </div>
                                <div>
                                    <Link to={true} className={styles.goToEvent}>
                                        <span>Go to event</span>
                                        <div className={styles.arrowRight}></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className={styles.switchButtons}>
                <button onClick={() => { updateCurrentSlide(currentSlide-1) }} className={styles.goToPreviousSlide}>
                    <span></span>
                </button>
                <button onClick={() => { updateCurrentSlide(currentSlide+1) }} className={styles.goToNextSlide}>
                    <span></span>
                </button>
            </div>

        </div>
    );
};

export default Header;