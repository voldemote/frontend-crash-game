import _ from 'lodash';

class State {
    static getUser (userId, users) {
        const user = _.get(
            users,
            userId,
        );

        return user;
    }

    static getEvent (eventId, events) {
        const event = _.find(
            events,
            {
                _id: eventId,
            },
        );

        return event;
    }

    static getEventByTrade = (tradeId, events) => {
        const event = _.find(
            events,
            (event) => (
                _.find(
                    _.get(event, 'bets', []),
                    {
                        _id: tradeId,
                    },
                )
            ),
        );

        return event;
    };

    static getTrade = (tradeId, events) => {
        const event  = State.getEventByTrade(tradeId, events);
        const trades = _.get(event, 'bets', []);

        return _.find(
            trades,
            {
                _id: tradeId,
            },
        );
    };
}

export default State;