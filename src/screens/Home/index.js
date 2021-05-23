import _                 from 'lodash';
import BetCard           from '../../components/BetCard';
import CarouselContainer from '../../components/CarouselContainer';
import EventBetPill      from '../../components/EventBetPill/index';
import EventCard         from '../../components/EventCard/index';
import ExampleData       from '../../helper/ExampleData';
import Header            from '../../components/Header/index';
import Navbar            from '../../components/Navbar/index';
import styles            from './styles.module.scss';
import FixedIconButton   from '../../components/FixedIconButton';
import IconType          from '../../components/Icon/IconType';
import { connect }       from 'react-redux';
import { PopupActions }  from '../../store/actions/popup';
import PopupTheme        from '../../components/Popup/PopupTheme';
import Popup             from '../../components/Popup';
import { BetActions }    from '../../store/actions/bet';

const Home = ({ events, showPopup, setSelectedBet }) => {
    const mapEventSlides = () => {
        return _.map(
            events,
            (event) => {
                const mappedTags = _.map(event.tags, (tag) => '#' + tag.name);

                return {
                    src:  event.previewImageUrl,
                    text: event.name,
                    tags: mappedTags,
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
                        const key      = eventIndex + '.' + betIndex;
                        const eventEnd = new Date(bet.date);

                        return (
                            <EventBetPill
                                key={key}
                                user={ExampleData.user}
                                marketQuestion={bet.marketQuestion}
                                hotBet={bet.hot}
                                eventEnd={eventEnd}
                            />
                        );
                    },
                );
            },
        );
    };

    const renderLiveEvents = () => {
        return _.map(
            events,
            (event, index) => {
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
                                user={ExampleData.user}
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

    const eventCreationButtonClicked = () => {
        showPopup(PopupTheme.betCreation);
    };

    const renderEventCreationButton = () => {
        return (
            <FixedIconButton
                onClick={eventCreationButtonClicked}
                iconType={IconType.bet}
            />
        );
    };

    return (
        <div className={styles.homeContainer}>
            <Navbar user={ExampleData.user} />
            <Header slides={mapEventSlides()} />
            <div className={styles.betPillContainer}>
                {renderBetPills()}
            </div>
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