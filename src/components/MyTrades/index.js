import styles from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import MyTradesList from '../MyTradesList';
import { BetActions } from 'store/actions/bet';
import { useHasMounted } from 'components/hoc/useHasMounted';

const MyTrades = ({
  openBets,
  transactions,
  fetchOpenBets,
  close: closeDrawer,
}) => {
  const [switchIndex, setSwitchIndex] = useState(0);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      fetchOpenBets();
    }
  }, []);

  const renderSwitchableView = () => {
    const switchableViews = [
      SwitchableHelper.getSwitchableView('Open trades'),
      SwitchableHelper.getSwitchableView('Trade history'),
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
    return (
      <MyTradesList
        bets={openBets}
        withStatus={true}
        closeDrawer={closeDrawer}
        allowCashout={true}
      />
    );
  };

  const renderBetHistory = () => {
    return <MyTradesList bets={transactions} closeDrawer={closeDrawer} />;
  };

  return (
    <>
      {renderSwitchableView()}
      <div className={styles.myTrades}>{renderContent()}</div>
    </>
  );
};

const getTrade = (betId, events) => {
  const event = State.getEventByTrade(betId, events);
  const bet = State.getTradeByEvent(betId, event);

  return {
    betId,
    eventId: event?._id,
    imageUrl: event?.previewImageUrl,
    marketQuestion: bet?.marketQuestion,
    endDate: moment(_.get(bet, 'endDate', new Date())).format('DD.MM.YYYY'),
    status: bet?.status,
    outcomes: bet?.outcomes,
    eventSlug: event?.slug,
    betSlug: bet?.slug,
  };
};

const mapStateToProps = state => {
  const events = state.event.events;

  const openBets = _.map(state.bet.openBets, openBet => {
    const trade = getTrade(openBet.betId, events);
    const outcomeValue = _.get(trade, ['outcomes', openBet.outcome, 'name']);
    const outcomeAmount = formatToFixed(_.get(openBet, 'outcomeAmount', 0));
    const investmentAmount = formatToFixed(
      _.get(openBet, 'investmentAmount', 0)
    );

    return {
      ...trade,
      outcomeValue,
      outcomeAmount,
      investmentAmount,
    };
  });
  const transactions = _.map(state.transaction.transactions, transaction => {
    const trade = getTrade(transaction.bet, events);
    const outcomeValue = _.get(trade, [
      'outcomes',
      transaction.outcome,
      'name',
    ]);
    const outcomeAmount = formatToFixed(
      _.get(transaction, 'outcomeTokensBought', 0)
    );
    const investmentAmount = formatToFixed(
      _.get(transaction, 'investmentAmount', 0)
    );

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
    fetchOpenBets: () => {
      dispatch(BetActions.fetchOpenBets());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrades);
