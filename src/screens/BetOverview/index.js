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
import PopupTheme          from '../../components/Popup/PopupTheme';
import { PopupActions }    from '../../store/actions/popup';

const BetOverview = ({ openBets, transactions, setSelectedBet, showPopup }) => {
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

    const getOpenBetSummaryRows = (bet, openBet, outcomes) => {
        const amount        = _.get(openBet, 'investmentAmount');
        const outcomeIndex  = _.get(openBet, 'outcome');
        const outcomeValue  = _.get(bet, ['outcomes', outcomeIndex, 'name']);
        const outcomeReturn = _.get(outcomes, [outcomeIndex, 'outcome'], 0);

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
            const betId = _.get(openBet, 'betId');

            setSelectedBet(null, betId);
            showPopup(
                PopupTheme.betView,
                {
                    initialSellTab: true,
                },
            );
        };
    };

    const renderOpenBetSummary = (openBet, index) => {
        const bet            = _.get(openBet, 'bet');
        const outcomes       = _.get(openBet, 'outcomes');
        const marketQuestion = _.get(bet, 'marketQuestion');
        const endDateTime    = moment(
            _.get(bet, 'date', new Date()),
        );

        const summaryRows = getOpenBetSummaryRows(bet, openBet, outcomes);

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

    const getBetHistorySummaryRows = (bet, betHistory) => {
        const amount        = _.get(betHistory, 'investmentamount');
        const feeAmount     = _.get(betHistory, 'feeamount');
        const outcomeIndex  = _.get(betHistory, 'outcome');
        const outcomeValue  = _.get(bet, ['outcomes', outcomeIndex, 'name']);
        const outcomeReturn = _.get(betHistory, 'outcometokensbought');
        const sold          = _.get(betHistory, 'direction') === 'SELL';

        return [
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Your Invest', amount + ' EVNT'),
            BetSummaryHelper.getKeyValue('Fee', feeAmount + ' EVNT'),
            BetSummaryHelper.getKeyValue('Your Bet', outcomeValue),
            BetSummaryHelper.getDivider(),
            BetSummaryHelper.getKeyValue('Outcome', outcomeReturn + ' EVNT', false, true),
            BetSummaryHelper.getKeyValue('Type', sold ? 'Sell' : 'Buy', false, true, sold ? 'red' : 'green'),
        ];
    };

    const renderBetHistorySummary = (betHistory, index) => {
        const bet            = _.get(betHistory, 'bet');
        const marketQuestion = _.get(bet, 'marketQuestion');

        const summaryRows = getBetHistorySummaryRows(bet, betHistory);

        return (
            <div className={styles.betSummaryContainerWrapper}>
                <BetSummaryContainer
                    marketQuestion={marketQuestion}
                    endDate={null}
                    summaryRows={summaryRows}
                />
            </div>
        );
    };

    const renderAllBetSummaries = () => {
        return _.map(
            openBets,
            renderOpenBetSummary,
        );
    };

    const renderOpenBets = () => {
        return (
            <div className={styles.openBetsContainer}>
                {renderAllBetSummaries()}
            </div>
        );
    };

    const renderAllBetHistories = () => {
        return _.map(
            transactions,
            renderBetHistorySummary,
        );
    };

    const renderBetHistory = () => {
        return (
            <div className={styles.betHistoryContainer}>
                {renderAllBetHistories()}
            </div>
        );
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
    const rawOutcomes  = state.bet.outcomes;
    const findBet      = (betId) => {
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
    const openBets     = _.map(
        state.bet.openBets,
        (openBet, index) => {
            let outcomes = _.get(
                rawOutcomes,
                openBet.betId,
                {},
            );

            if (outcomes) {
                const outcomeValues = _.get(outcomes, 'values', {});
                const amount        = _.get(openBet, 'investmentAmount');
                outcomes            = _.get(
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
    const transactions = _.map(
        state.transaction.transactions,
        (transaction) => {
            const betId = _.get(transaction, 'bet');
            const bet   = findBet(betId);

            return {
                ...transaction,
                bet,
            };
        },
    );

    return {
        openBets,
        transactions,
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
)(BetOverview);