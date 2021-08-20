import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import CarouselContainer from '../CarouselContainer';
import EventCard from '../EventCard';

const LiveEventCarouselContainer = ({ events, withoutPadding = false }) => {
    const location = useLocation();

    const renderLiveEvents = () => {
        return _.map(events, (event, index) => {
            const eventId = _.get(event, '_id');
            const mappedTags = _.map(event.tags, tag => tag.name);
            const isLive = true; //currentDate.isBetween(startDate, endDate);

            return (
                <Link
                    to={{
                        pathname: `/trade/${eventId}`,
                        state: { fromLocation: location },
                    }}
                >
                    <EventCard
                        key={index}
                        title={event.name}
                        organizer={''}
                        viewers={12345}
                        live={isLive}
                        tags={mappedTags}
                        image={event.previewImageUrl}
                    />
                </Link>
            );
        });
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

const mapStateToProps = state => {
    return {
        events: state.event.events,
    };
};

export default connect(mapStateToProps, null)(LiveEventCarouselContainer);
