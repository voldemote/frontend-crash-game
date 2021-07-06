import _                            from 'lodash';
import BetCard                      from '../../components/BetCard';
import CarouselContainer            from '../../components/CarouselContainer';
import EventCard                    from '../../components/EventCard/index';
import FixedEventCreationIconButton from '../../components/FixedEventCreationIconButton';
import Header                       from '../../components/Header/index';
import Navbar                       from '../../components/Navbar/index';
import Routes                       from '../../constants/Routes';
import styles                       from './styles.module.scss';
import { connect }                  from 'react-redux';
import { useHistory }               from 'react-router';
import BaseContainerWithNavbar      from '../../components/BaseContainerWithNavbar';

const Home = ({ events, user }) => {
    const history = useHistory();

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
                                onClick={onEventClick(event._id, bet._id)}
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
        <BaseContainerWithNavbar>
            <Header events={events} />
            <CarouselContainer title={'🔥 Most popular Live Events'}>
                {renderLiveEvents()}
            </CarouselContainer>
            <CarouselContainer title={'🚀 Most popular Trades'}>
                {renderMostPopularBets()}
            </CarouselContainer>
            {renderEventCreationButton()}
        </BaseContainerWithNavbar>
    );
};

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
        user:   state.authentication,
    };
};

export default connect(
    mapStateToProps,
    null,
)(Home);