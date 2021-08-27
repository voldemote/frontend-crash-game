import styles from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { useState } from 'react';
import _ from 'lodash';
import BetSummaryContainer from '../../components/BetSummaryContainer';
import BetSummaryHelper from '../../helper/BetSummary';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { BetActions } from '../../store/actions/bet';
import PopupTheme from '../../components/Popup/PopupTheme';
import { PopupActions } from '../../store/actions/popup';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import HighlightType from '../../components/Highlight/HighlightType';
import EventsCarouselContainer from '../../components/EventsCarouselContainer';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import classNames from 'classnames';
import StateBadge from '../StateBadge';
import MyTradesList from '../MyTradesList';

const MyTrades = ({openBets, transactions, setSelectedBet, showPopup}) => {
    const [switchIndex, setSwitchIndex] = useState(0);

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
                className={styles.switchableViewContainer}
                whiteBackground={false}
                fullWidth={false}
                switchableViews={switchableViews}
                currentIndex={switchIndex}
                setCurrentIndex={setSwitchIndex}
            />
        );
    };

    const renderContent = () => {
        return switchIndex === 0 ? renderOpenBets() : renderBetHistory();
    };
    
    const renderOpenBets = () => {
        return <MyTradesList bets={openBets} withStatus={true} />
    };
    
    const renderBetHistory = () => {
        return <MyTradesList bets={transactions} />
    };

    return (
        <div className={styles.myTrades}>
            {renderSwitchableView()}
            {renderContent()}
        </div>
    );
};

const getTrade = (betId, events) => {
    const event = State.getEventByTrade(betId, events);
    const bet = State.getTradeByEvent(betId, event);

    return {
        imageUrl: event.previewImageUrl,
        marketQuestion: bet.marketQuestion,
        endDate: moment(_.get(bet, 'endDate', new Date())).format('DD.MM.YYYY'),
        status: bet.status,
        outcomes: bet.outcomes,
    }
}

const mapStateToProps = state => {
    const events = state.event.events;

    const openBets = _.map(state.bet.openBets, (openBet) => {
        const trade = getTrade(openBet.betId, events);
        const outcomeValue = _.get(trade, ['outcomes', openBet.outcome, 'name']);
        const outcomeAmount = formatToFixed(_.get(openBet, 'outcomeAmount', 0));
        const investmentAmount = formatToFixed(_.get(openBet, 'investmentAmount', 0));

        return {
            ...trade,
            outcomeValue,
            outcomeAmount,
            investmentAmount,
        };
    });
    const transactions = _.map(state.transaction.transactions, transaction => {
        const trade = getTrade(transaction.bet, events);
        const outcomeValue = _.get(trade, ['outcomes', transaction.outcome, 'name']);
        const outcomeAmount = formatToFixed(_.get(transaction, 'outcomeTokensBought', 0));
        const investmentAmount = formatToFixed(_.get(transaction, 'investmentAmount', 0));

        return {
            ...trade,
            outcomeValue,
            outcomeAmount,
            investmentAmount,
        };
    });

    return {
        openBets,
        transactions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      setSelectedBet: (eventId, betId) => {
        dispatch(BetActions.selectBet({ eventId, betId }));
      },
      showPopup: (popupType, options = null) => {
        dispatch(PopupActions.show({ popupType, options }));
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(MyTrades);