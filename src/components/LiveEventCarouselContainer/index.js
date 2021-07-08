import React             from 'react';
import CarouselContainer from '../CarouselContainer';
import _                 from 'lodash';
import EventCard         from '../EventCard';
import Routes            from '../../constants/Routes';
import { connect }       from 'react-redux';
import { useHistory }    from 'react-router';

const LiveEventCarouselContainer = ({ events, withoutPadding = false }) => {
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

    return (
        <CarouselContainer
            title={'🔥 Most popular Live Events'}
            withoutPadding={withoutPadding}
        >
            {renderLiveEvents()}
        </CarouselContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        events: state.event.events,
    };
};

export default connect(
    mapStateToProps,
    null,
)(LiveEventCarouselContainer);
