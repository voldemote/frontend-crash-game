import _                from 'lodash';
import LiveBadge        from '../LiveBadge';
import { useState }     from 'react';
import styles           from './styles.module.scss';
import Link             from '../../components/Link';
import { Carousel }     from 'react-responsive-carousel';
import { connect }      from 'react-redux';
import TwitchEmbedVideo from '../TwitchEmbedVideo';
import Routes           from '../../constants/Routes';
import EventBetPillList from '../EventBetPillList';
import BetState         from '../BetView/BetState';
import moment           from 'moment';

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

    const mapBetsToShow = () => {
        return _.filter(
            _.get(getCurrentEvent(), 'bets', []),
            (trade) => _.get(trade, 'status') === BetState.active,
        );
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
                            (event, eventIndex) => {
                                const startDate   = moment(_.get(event, 'date'));
                                const endDate     = moment(_.get(event, 'endDate'));
                                const currentDate = moment();
                                const isLive      = true;//currentDate.isBetween(startDate, endDate);
                                const trades      = _.clone(_.get(event, 'bets', []));

                                trades.sort((a, b) => {
                                    const aState        = _.get(a, 'status');
                                    const bState        = _.get(b, 'status');
                                    const getStateValue = (state) => {
                                        switch (state) {
                                            case BetState.active:
                                                return 5;
                                            case BetState.closed:
                                                return 4;
                                            case BetState.resolved:
                                                return 3;
                                            case BetState.canceled:
                                                return 2;
                                        }

                                        return 1;
                                    };

                                    if (aState === bState) {
                                        const aEndDate = moment(_.get(a, 'endDate'));
                                        const bEndDate = moment(_.get(b, 'endDate'));

                                        if (aEndDate.isBefore(bEndDate)) {
                                            return 1;
                                        }

                                        if (bEndDate.isBefore(aEndDate)) {
                                            return -1;
                                        }

                                        return 0;
                                    }

                                    return getStateValue(bState) - getStateValue(aState);
                                });
                                const currentTrade   = _.head(trades);
                                const currentTradeId = _.get(currentTrade, '_id');

                                return (
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
                                                    {
                                                        isLive && <LiveBadge />
                                                    }
                                                </div>
                                                <span className={styles.title}>
                                                    {event.name}
                                                </span>
                                                <div>
                                                    <Link
                                                        to={Routes.getRouteWithParameters(
                                                            Routes.bet,
                                                            {
                                                                eventId: event._id,
                                                                betId:   currentTradeId,
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
                                );
                            })}
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
                <EventBetPillList
                    event={getCurrentEvent()}
                    bets={mapBetsToShow()}
                />
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