import _                   from 'lodash';
import BetSummaryContainer from '../../components/BetSummaryContainer';
import BetSummaryHelper    from '../../helper/BetSummary';
import moment              from 'moment';
import React               from 'react';
import Routes              from '../../constants/Routes';
import ScreenWithHeader    from '../../components/ScreenWithHeaderContainer';
import styles              from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper    from '../../helper/SwitchableHelper';
import { connect }         from 'react-redux';
import { useState }        from 'react';
import { BetActions }      from '../../store/actions/bet';

const BetOverview = ({ openBets, pullOutBet }) => {
    const [betView, setBetView] = useState(0);

    const renderSwitchableView = () => {
        const switchableViews = [
            SwitchableHelper.getSwitchableView(
                'Open trades',
            ),
            SwitchableHelper.getSwitchableView(
                'Trade history',
            ),
        ];

        return (
            <SwitchableContainer
                switchableViews={switchableViews}
                currentIndex={betView}
                setCurrentIndex={setBetView}
            />
        );
    };

    const renderContent = () => {
        if (betView === 0) {
            return renderOpenBets();
        }

        return renderBetHistory();
    };

    const getSummaryRows = (bet, openBet, outcomes) => {
        const amount        = _.get(openBet, 'amount');
        const outcomeIndex  = _.get(openBet, 'outcome');
        const outcomeValue  = _.get(bet, outcomeIndex === 0 ? 'betOne' : 'betTwo');
        const outcomeReturn = _.get(outcomes, outcomeIndex === 0 ? 'outcomeOne' : 'outcomeTwo', 0);

        return [
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Your Invest', amount + ' EVNT'),
            BetSummaryHelper.getKeyValue('Your Bet', outcomeValue),
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Possible Win', outcomeReturn + ' EVNT', false, true),
        ];
    };

    const onBetSummaryClick = (openBet) => {
        return () => {
            const betId   = _.get(openBet, 'betId');
            const amount  = _.get(openBet, 'amount');
            const outcome = _.get(openBet, 'outcome');

            //pullOutBet(betId, amount, outcome);
        };
    };

    const renderBetSummary = (openBet, index) => {
        const bet            = _.get(openBet, 'bet');
        const outcomes       = _.get(openBet, 'outcomes');
        const marketQuestion = _.get(bet, 'marketQuestion');
        const endDateTime    = moment(
            _.get(bet, 'date', new Date()),
        );

        const summaryRows = getSummaryRows(bet, openBet, outcomes);

        return (
            <div className={styles.betSummaryContainerWrapper}>
                <BetSummaryContainer
                    marketQuestion={marketQuestion}
                    endDate={endDateTime}
                    summaryRows={summaryRows}
                    onClick={onBetSummaryClick(openBet)}
                />
            </div>
        );
    };

    const renderAllBetSummaries = () => {
        return _.map(
            openBets,
            renderBetSummary,
        );
    };

    const renderOpenBets = () => {
        return (
            <div className={styles.openBetsContainer}>
                {renderAllBetSummaries()}
            </div>
        );
    };

    const renderBetHistory = () => {

    };

    return (
        <ScreenWithHeader
            title={'My Trades'}
            returnRoute={Routes.home}
        >
            {renderSwitchableView()}
            <div className={styles.contentContainer}>
                {renderContent()}
            </div>
        </ScreenWithHeader>
    );
};

const mapStateToProps = (state) => {
    const rawOutcomes = state.bet.outcomes;
    const findBet     = (betId) => {
        const event = _.find(
            state.event.events,
            (event) => {
                return _.find(
                    event.bets,
                    {
                        _id: betId,
                    },
                );
            },
        );

        return _.find(
            event.bets,
            {
                _id: betId,
            },
        );
    };
    const openBets    = _.map(
        state.bet.openBets,
        (openBet, index) => {
            let outcomes = _.get(
                rawOutcomes,
                openBet.betId,
                {},
            );

            if (outcomes) {
                const outcomeValues    = _.get(outcomes, 'values', {});
                const amount = _.get(openBet, 'amount');
                outcomes               = _.get(
                    outcomeValues,
                    amount,
                    {},
                );
            }

            return {
                ...openBet,
                outcomes,
                bet: findBet(openBet.betId),
            };
        },
    );

    return {
        openBets,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullOutBet: (betId, amount, outcome) => {
            dispatch(BetActions.pullOutBet({
                betId,
                amount,
                outcome,
            }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetOverview);