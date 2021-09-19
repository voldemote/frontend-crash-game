import classNames from 'classnames';
import Icon from '../Icon';
import { connect, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import _ from 'lodash';
import MenuItem from '../MenuItem';
import SwitchableHelper from 'helper/SwitchableHelper';
import IconType from 'components/Icon/IconType';
import PaymentAction from 'constants/PaymentAction';
import SwitchableContainer from 'components/SwitchableContainer';
import { useEffect, useState } from 'react';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import IconTheme from 'components/Icon/IconTheme';
import TwoColumnTable from 'components/TwoColumnTable';
import moment from 'moment';
import InputBoxTheme from '../InputBox/InputBoxTheme';
import WalletBalance from '../WalletBalance';
import { TransactionActions } from 'store/actions/transaction';
import { AuthenticationActions } from 'store/actions/authentication';
import useTransactions from 'hooks/useTransactions';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { BetActions } from 'store/actions/bet';
import State from '../../helper/State';

import MyTradesList from '../MyTradesList';
import { selectOpenBets } from 'store/selectors/bet';
import { selectTransactions } from 'store/selectors/transaction';

const Wallet = ({
  show,
  referralCount,
  close,
  referrals,
  fetchOpenBets,
  fetchTransactions,
}) => {
  const menus = {
    wallet: 'wallet',
    transactionHistory: 'transactionHistory',
    referrals: 'referrals',
  };

  const closeDrawer = () => {
    setOpenMenu(menus.wallet);
    close();
  };

  const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);
  const [openMenu, setOpenMenu] = useState(menus.wallet);

  const { currency } = useSelector(selectUser);

  const { transactions, transactionCount } = useTransactions();

  const isOpen = page => openMenu === page;

  const [switchIndex, setSwitchIndex] = useState(0);
  const events = useSelector(state => state.event.events);
  const openBets = useSelector(selectOpenBets);
  const temp_transactions = useSelector(selectTransactions);

  const getTrade = betId => {
    const event = State.getEventByTrade(betId, events);
    const bet = State.getTradeByEvent(betId, event);

    return {
      betId,
      eventId: event?._id,
      imageUrl: event?.previewImageUrl,
      marketQuestion: bet?.marketQuestion,
      status: bet?.status,
      outcomes: bet?.outcomes,
      eventSlug: event?.slug,
      betSlug: bet?.slug,
    };
  };

  const getOpenBets = () => {
    return _.map(openBets, openBet => {
      const trade = getTrade(openBet.betId);
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
        date: openBet.lastDate,
      };
    });
  };

  const getTransactions = () => {
    return _.map(temp_transactions, transaction => {
      const trade = getTrade(transaction.bet);
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
        date: transaction.trx_timestamp,
      };
    });
  };

  useEffect(() => {
    fetchOpenBets();
    fetchTransactions();
    if (!show) {
      setOpenMenu(menus.wallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onPaymentActionSwitch = newIndex => {
    if (newIndex === 0) {
      setPaymentAction(PaymentAction.deposit);
    } else {
      setPaymentAction(PaymentAction.withdrawal);
    }
  };

  const backButton = () => (
    <Icon
      className={styles.backButton}
      iconType={'arrowTopRight'}
      onClick={() => setOpenMenu(menus.wallet)}
    />
  );

  const renderSwitchableView = () => {
    const switchableViews = [
      SwitchableHelper.getSwitchableView(
        'Deposit',
        IconType.deposit,
        IconTheme.white
      ),
      SwitchableHelper.getSwitchableView(
        'Withdrawal',
        IconType.withdrawal,
        IconTheme.white
      ),
    ];
    const selectedIndex = paymentAction === PaymentAction.deposit ? 0 : 1;

    return (
      <SwitchableContainer
        switchableViews={switchableViews}
        currentIndex={selectedIndex}
        whiteBackground={false}
        setCurrentIndex={onPaymentActionSwitch}
        className={styles.switchablePayment}
      />
    );
  };

  const renderTradeSwitchableView = () => {
    const switchableViews = [
      SwitchableHelper.getSwitchableView('Open trades'),
      SwitchableHelper.getSwitchableView('Trade history'),
    ];

    return (
      <SwitchableContainer
        className={styles.switchablePayment}
        whiteBackground={false}
        fullWidth={false}
        switchableViews={switchableViews}
        currentIndex={switchIndex}
        setCurrentIndex={setSwitchIndex}
      />
    );
  };

  const renderOpenBets = () => {
    return (
      <MyTradesList
        bets={getOpenBets()}
        withStatus={true}
        closeDrawer={closeDrawer}
        allowCashout={true}
      />
    );
  };

  const renderBetHistory = () => {
    return <MyTradesList bets={getTransactions()} closeDrawer={closeDrawer} />;
  };

  const walletContainerWrapper = (
    open,
    heading,
    contents,
    isFirstPanel = false
  ) => {
    return (
      <div
        className={classNames(
          styles.panel,
          !open && styles.panelHidden,
          isFirstPanel && styles.firstPanel
        )}
      >
        <h2 className={styles.walletHeading}>{heading}</h2>
        <div className={styles.walletContents}>{contents}</div>
      </div>
    );
  };

  const onTransactionsClick = () => {
    // fetchTransactions();
    setOpenMenu(menus.transactionHistory);
  };

  return (
    <div
      className={classNames(
        styles.wallet,
        styles.drawer,
        !show && styles.drawerHidden
      )}
    >
      <div className={styles.menuContainer}>
        {walletContainerWrapper(
          isOpen(menus.wallet),
          'My Wallet',
          <>
            <WalletBalance />

            <MenuItem
              classes={[styles.transactionHistory]}
              label={`Transaction History (${transactionCount})`}
              icon={
                <Icon className={styles.optionIcon} iconType={'activities'} />
              }
              onClick={() => onTransactionsClick()}
            />

            {renderTradeSwitchableView()}
            {switchIndex === 0 ? renderOpenBets() : renderBetHistory()}
          </>,
          true
        )}

        {walletContainerWrapper(
          isOpen(menus.transactionHistory),
          <>
            {backButton()}
            Transaction History
          </>,
          <TwoColumnTable
            headings={['Latest transactions', currency]}
            rows={transactions.map(
              ({
                event,
                bet,
                direction,
                trx_timestamp,
                outcomeTokensBought,
                investmentAmount,
              }) => {
                const tokenAmount =
                  direction === 'PAYOUT'
                    ? outcomeTokensBought
                    : investmentAmount;
                return [
                  <>
                    <span className={styles.primaryData}>{event?.name}</span>
                    <span className={styles.secondaryData}>
                      {bet?.marketQuestion}
                    </span>
                  </>,
                  <>
                    <span className={styles[direction.toLowerCase()]}>
                      {formatToFixed(tokenAmount)}
                    </span>
                    <span className={styles.secondaryData}>
                      {moment(trx_timestamp).format('DD.MM.YYYY')}
                    </span>
                  </>,
                ];
              }
            )}
            noResultMessage={'No transactions yet.'}
          />
        )}
      </div>
      <Icon
        iconType={'cross'}
        onClick={closeDrawer}
        className={styles.closeButton}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const referralCount = _.size(state.authentication.referralList);

  return {
    referralCount,
    referrals: state.authentication.referralList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOpenBets: () => {
      dispatch(BetActions.fetchOpenBets());
    },
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
