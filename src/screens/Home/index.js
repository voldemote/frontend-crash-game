import _                            from 'lodash';
import BetCard                      from '../../components/BetCard';
import CarouselContainer            from '../../components/CarouselContainer';
import EventBetPill                 from '../../components/EventBetPill';
import EventCard                    from '../../components/EventCard/index';
import FixedIconButton              from '../../components/FixedIconButton';
import Header                       from '../../components/Header/index';
import IconType                     from '../../components/Icon/IconType';
import Navbar                       from '../../components/Navbar/index';
import PopupTheme                   from '../../components/Popup/PopupTheme';
import Routes                       from '../../constants/Routes';
import styles                       from './styles.module.scss';
import { BetActions }               from '../../store/actions/bet';
import { connect }                  from 'react-redux';
import { PopupActions }             from '../../store/actions/popup';
import { useHistory }               from 'react-router';
import FixedEventCreationIconButton from '../../components/FixedEventCreationIconButton';

const Home = ({ events, showPopup, user, setSelectedBet }) => {
    const history = useHistory();

    const mapEventSlides = () => {
        return _.map(
            events,
            (event) => {
                const mappedTags = _.map(event.tags, (tag) => '#' + tag.name);

                return {
                    eventId: event._id,
                    src:     event.streamUrl,
                    text:    event.name,
                    tags:    mappedTags,
                };
            },
        );
    };

    const renderBetPills = () => {
        return _.map(
            events,
            (event, eventIndex) => {
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
                                eventId={event._id}
                            />
                        );
                    },
                );
            },
        );
    };

    const onEventClick = (eventId, betId = '') => {
        return () => {
            history.push(Routes.getRouteWithParameters(
                Routes.bet,
                {
                    eventId,
                    betId,
                },
            ));
        };
    };

    const renderLiveEvents = () => {
        return _.map(
            events,
            (event, index) => {
                const eventId    = _.get(event, '_id');
                const mappedTags = _.map(event.tags, (tag) => tag.name);

                return (
                    <EventCard
                        key={index}
                        title={event.name}
                        organizer={''}
                        viewers={12345}
                        live={true}
                        tags={mappedTags}
                        image={event.previewImageUrl}
                        onClick={onEventClick(eventId)}
                    />
                );
            },
        );
    };

    const renderMostPopularBets = () => {
        return _.map(
            events,
            (event, eventIndex) => {
                const bets = event.bets;

                return _.map(
                    bets,
                    (bet, betIndex) => {
                        const key      = eventIndex + '.' + betIndex;
                        const eventEnd = new Date(bet.date);

                        return (
                            <BetCard
                                key={key}
                                image={event.previewImageUrl}
                                userId={bet.creator}
                                marketQuestion={bet.marketQuestion}
                                hot={bet.hot}
                                eventEnd={eventEnd}
                                onClick={() => {
                                    setSelectedBet(event._id, bet._id);
                                    showPopup(PopupTheme.betView);
                                }}
                            />
                        );
                    },
                );
            },
        );
    };

    const renderEventCreationButton = () => {
        return (
            <FixedEventCreationIconButton />
        );
    };

    return (
        <div className={styles.homeContainer}>
            <Navbar user={user} />
            <Header events={events} />
            <CarouselContainer title={'🔥 Most popular Live Events'}>
                {renderLiveEvents()}
            </CarouselContainer>
            <CarouselContainer title={'🚀 Most popular Bets'}>
                {renderMostPopularBets()}
            </CarouselContainer>
            {renderEventCreationButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
        user:   state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedBet: (eventId, betId) => {
            dispatch(BetActions.selectBet({ eventId, betId }));
        },
        showPopup:      (popupType, options = null) => {
            dispatch(PopupActions.show({ popupType, options }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);