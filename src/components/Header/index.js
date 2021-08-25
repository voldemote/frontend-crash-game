import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import LiveBadge from '../LiveBadge';
import styles from './styles.module.scss';
import TwitchEmbedVideo from '../TwitchEmbedVideo';
import CoverFlowCarousel from '../CoverFlowCarousel';
import TimeLeftCounter from '../TimeLeftCounter';

const Header = ({ events }) => {
    let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const location = useLocation();

    return (
        <div>
            <div className={styles.header}>
                <CoverFlowCarousel onSlideChange={setCurrentSlideIndex}>
                    {events.map((event, eventIndex) => {
                        const startDate = moment(_.get(event, 'date'));
                        const endDate = moment(_.get(event, 'endDate'));
                        const currentDate = moment();
                        const isLive = true; //currentDate.isBetween(startDate, endDate);

                        return (
                            <div
                                key={eventIndex}
                                className={styles.eventContainer}
                            >
                                <div className={styles.headerOverlay}></div>
                                {
                                    eventIndex === currentSlideIndex &&
                                        <TwitchEmbedVideo
                                            targetId={event._id}
                                            className={styles.twitchStream}
                                            video={event.streamUrl}
                                            muted={true}
                                        />
                                }

                                {
                                    eventIndex != currentSlideIndex && <img src={event.previewImageUrl} className={styles.previewImage} />
                                }
                                
                                <div className={styles.headerWrapper}>
                                    <div
                                        className={
                                            styles.headerContentContainer
                                        }
                                    >
                                        <div className={styles.badgeContainer}>
                                            {isLive && <LiveBadge />}
                                        </div>
                                        <span className={styles.title}>
                                            {event.name}
                                        </span>
                                        <div className={styles.tagList}>
                                            {event.tags.map(
                                                ({ name }, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className={styles.tag}
                                                    >
                                                        #{name.toLowerCase()}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <div>
                                            <Link
                                                to={{
                                                    pathname: `trade/${event._id}`,
                                                    state: {
                                                        fromLocation: location,
                                                    },
                                                }}
                                                className={styles.goToEvent}
                                            >
                                                <span>Go to event</span>
                                                <div
                                                    className={
                                                        styles.arrowRight
                                                    }
                                                ></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.timeLeftCounterContainer,
                                        currentSlideIndex === eventIndex &&
                                            styles.showTimeLeftCounter
                                    )}
                                >
                                    <span className={styles.timeLeftCaption}>
                                        Event ends in:
                                    </span>
                                    <TimeLeftCounter endDate={endDate} />
                                </div>
                            </div>
                        );
                    })}
                </CoverFlowCarousel>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        events: state.event.events,
    };
};

export default connect(mapStateToProps)(Header);
