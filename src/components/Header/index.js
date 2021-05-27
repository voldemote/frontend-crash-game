import _                 from 'lodash';
import LiveBadge         from '../LiveBadge';
import { useState }      from 'react';
import styles            from './styles.module.scss';
import Link              from '../../components/Link';
import ReactPlayer       from 'react-player';
import { Carousel }      from 'react-responsive-carousel';
import { connect }       from 'react-redux';
import EventBetPill      from '../../components/EventBetPill/index';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Header = ({ events, slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    };

    const renderBetPills = () => {
        return _.map(
            events,
            (event, eventIndex) => {
                if(slides[currentSlide].eventId === event._id) {
                    const bets = event.bets;

                    return _.map(
                        bets,
                        (bet, betIndex) => {
                            const key = eventIndex + '.' + betIndex;
    
                            return (
                                <EventBetPill
                                    key={key}
                                    userId={bet.creator}
                                    bet={bet}
                                />
                            );
                        },
                    );
                }
            },
        );
    };

    return (
        <div>
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
                    {slides.map((slide, slideIndex) =>(
                        <div key={slideIndex}>
                            <div className={styles.headerOverlay}></div>
                            <ReactPlayer key={slideIndex} width="100%" height="600px" url={slide.src} playing={currentSlide === slideIndex ? true : false} />
                            <div className={styles.headerWrapper}>
                                <div className={styles.headerContentContainer}>
                                    <div className={styles.badgeContainer}>
                                        <LiveBadge />
                                    </div>
                                    <span className={styles.title}>{slide.text}</span>
                                    <div className={styles.tags}>
                                        {slide.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex}>{tag}&nbsp;</span>
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

            <div className={styles.betPillContainer}>
                {renderBetPills()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        events: state.event.events
    };
};

export default connect(
    mapStateToProps
)(Header);