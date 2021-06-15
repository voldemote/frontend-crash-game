import _                from 'lodash';
import LiveBadge        from '../LiveBadge';
import { useState }     from 'react';
import styles           from './styles.module.scss';
import Link             from '../../components/Link';
import { Carousel }     from 'react-responsive-carousel';
import { connect }      from 'react-redux';
import EventBetPill     from '../../components/EventBetPill/index';
import TwitchEmbedVideo from '../TwitchEmbedVideo';
import Tags             from '../Tags';
import Routes           from '../../constants/Routes';

const Header = ({ events }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const updateCurrentSlide = (index) => {
        const eventsSize = _.size(events);

        if (currentSlide !== index) {
            if (index >= eventsSize) {
                index = 0;
            }

            if (index < 0) {
                index = eventsSize - 1;
            }

            setCurrentSlide(index);
        }
    };

    const getCurrentEvent = () => {
        return events[currentSlide];
    };

    const renderBetPills = () => {
        const event = getCurrentEvent();

        if (event) {
            const bets = event.bets;

            return _.map(
                bets,
                (bet, betIndex) => {
                    const key = event._id + '.' + betIndex;

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

        return null;
    };

    return (
        <div>
            <div className={styles.header}>

                <Carousel
                    className={styles.headerCarousel}
                    emulateTouch={true}
                    infiniteLoop={false}
                    showArrows={false}
                    autoPlay={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    dynamicHeight={false}
                    selectedItem={currentSlide}
                    onChange={(index) => {
                        updateCurrentSlide(index);
                    }}
                >
                    {
                        events.map(
                            (event, eventIndex) => (
                                <div
                                    key={eventIndex}
                                    className={styles.eventContainer}
                                >
                                    <div className={styles.headerOverlay}>
                                    </div>
                                    <TwitchEmbedVideo
                                        targetId={event._id}
                                        className={styles.twitchStream}
                                        video={event.streamUrl}
                                        muted={true}
                                    />
                                    <div className={styles.headerWrapper}>
                                        <div className={styles.headerContentContainer}>
                                            <div className={styles.badgeContainer}>
                                                <LiveBadge />
                                            </div>
                                            <span className={styles.title}>
                                                {event.name}
                                            </span>
                                            <Tags
                                                tags={event.tags}
                                            />
                                            <div>
                                                <Link
                                                    to={Routes.getRouteWithParameters(
                                                        Routes.bet,
                                                        {
                                                            eventId: event._id,
                                                            betId:   '',
                                                        },
                                                    )}
                                                    className={styles.goToEvent}
                                                >
                                                    <span>Go to event</span>
                                                    <div className={styles.arrowRight}>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </Carousel>

                <div className={styles.switchButtons}>
                    <button
                        onClick={() => {
                            updateCurrentSlide(currentSlide - 1);
                        }}
                        className={styles.goToPreviousSlide}
                    >
                        <span>
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            updateCurrentSlide(currentSlide + 1);
                        }}
                        className={styles.goToNextSlide}
                    >
                        <span>
                        </span>
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
        events: state.event.events,
    };
};

export default connect(
    mapStateToProps,
)(Header);