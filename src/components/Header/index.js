import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import LiveBadge from '../LiveBadge';
import styles from './styles.module.scss';
import TwitchEmbedVideo from '../TwitchEmbedVideo';
import Routes from '../../constants/Routes';
import EventBetPillList from '../EventBetPillList';
import BetState from '../BetView/BetState';
import CoverFlowCarousel from '../CoverFlowCarousel';
import TimeLeftCounter from '../TimeLeftCounter';

const Header = ({ events }) => {
    let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const location = useLocation();

    const sortTrades = trades => {
        return trades.sort((a, b) => {
            const aState = _.get(a, 'status');
            const bState = _.get(b, 'status');
            const getStateValue = state => {
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
    };

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
                                <TwitchEmbedVideo
                                    targetId={event._id}
                                    className={styles.twitchStream}
                                    video={event.streamUrl}
                                    muted={true}
                                />
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
                                                    pathname:
                                                        Routes.getRouteWithParameters(
                                                            Routes.bet,
                                                            {
                                                                eventId:
                                                                    event._id,
                                                            }
                                                        ),
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
