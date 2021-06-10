import _                   from 'lodash';
import React               from 'react';
import styles              from './styles.module.scss';
import { connect }         from 'react-redux';
import BetSummaryContainer from '../BetSummaryContainer';
import moment              from 'moment';
import BetSummaryHelper    from '../../helper/BetSummary';

const BetApproveView = ({ closed, betId, bet, openBet }) => {
    const getDateWithTime = (time) => {
        const dateTime = moment(time);

        dateTime.hours(time.hours());
        dateTime.minutes(time.minutes());
        dateTime.seconds(time.seconds());

        return dateTime;
    };

    const getEndDateTime = () => {
        const time = _.get(bet, 'date');

        return getDateWithTime(time);
    };

    const getSummaryRows = () => {
        return [
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Your Invest', '0 EVNT'),
            BetSummaryHelper.getKeyValue('Your Bet', 'John'),
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Possible Win', '6 000 EVNT'),
        ];
    };

    const renderBetSummary = () => {
        const marketQuestion = _.get(bet, 'marketQuestion');

        return (
            <BetSummaryContainer
                marketQuestion={marketQuestion}
                endDate={getEndDateTime()}
                summaryRows={getSummaryRows()}
            />
        );
    };

    return (
        <div className={styles.approveBetContainer}>
            {renderBetSummary()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { betId }      = ownProps;
    const openBet        = _.get(state.bet, 'openBets[' + betId + ']', null);
    const findBetInEvent = (event, betId) => {
        return _.find(
            event.bets,
            {
                betId: betId,
            },
        );
    };
    const event          = _.head(
        _.filter(
            state.events.events,
            (event) => !_.isEmpty(findBetInEvent(event, betId)),
        ),
    );
    const bet            = findBetInEvent(event, betId);

    return {
        event,
        openBet,
        bet,
    };
};

export default connect(
    mapStateToProps,
    null,
)(BetApproveView);
