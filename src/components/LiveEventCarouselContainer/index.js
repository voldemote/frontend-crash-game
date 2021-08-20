import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import CarouselContainer from '../CarouselContainer';
import EventCard from '../EventCard';
import Routes from '../../constants/Routes';
import BetState from '../BetView/BetState';

const LiveEventCarouselContainer = ({ events, withoutPadding = false }) => {
    const location = useLocation();

    const renderLiveEvents = () => {
        return _.map(events, (event, index) => {
            const eventId = _.get(event, '_id');
            const mappedTags = _.map(event.tags, tag => tag.name);
            const startDate = moment(_.get(event, 'date'));
            const endDate = moment(_.get(event, 'endDate'));
            const currentDate = moment();
            const isLive = true; //currentDate.isBetween(startDate, endDate);
            const trades = _.clone(_.get(event, 'bets', []));

            trades.sort((a, b) => {
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
            const currentTrade = _.head(trades);
            const currentTradeId = _.get(currentTrade, '_id', '');

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
