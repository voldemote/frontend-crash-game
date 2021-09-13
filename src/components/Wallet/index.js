import classNames from 'classnames';
import Icon from '../Icon';
import { connect } from 'react-redux';
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
import State from 'helper/State';
import TwoColumnTable from 'components/TwoColumnTable';
import moment from 'moment';
import InputBoxTheme from '../InputBox/InputBoxTheme';
import { TOKEN_NAME } from '../../constants/Token';
import WalletBalance from '../WalletBalance';
import PaymentForm from '../PaymentForm';
import { PAYMENT_TYPE } from 'constants/Payment';
import { TransactionActions } from 'store/actions/transaction';
import { AuthenticationActions } from 'store/actions/authentication';

const Wallet = ({
  show,
  referralCount,
  transactionCount,
  close,
  transactions,
  referrals,
  fetchTransactions,
  fetchReferrals,
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

  const isOpen = page => openMenu === page;
  const paymentType = {
    [PaymentAction.deposit]: PAYMENT_TYPE.deposit,
    [PaymentAction.withdrawal]: PAYMENT_TYPE.withdrawal,
  };

  useEffect(() => {
    if (!show) {
      setOpenMenu(menus.wallet);
    }
    fetchReferrals();
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
    fetchTransactions();
    setOpenMenu(menus.transactionHistory);
  };

  const onReferralsClick = () => {
    fetchReferrals();
    setOpenMenu(menus.referrals);
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
            <MenuItem
              classes={[styles.referrals]}
              label={`Referrals (${referralCount})`}
              icon={<Icon className={styles.optionIcon} iconType={'chat'} />}
              onClick={() => onReferralsClick()}
            />

            {renderSwitchableView()}
            <PaymentForm paymentType={paymentType[paymentAction]} />
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
            headings={['Latest transactions', TOKEN_NAME]}
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
                      {tokenAmount}
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

        {walletContainerWrapper(
          isOpen(menus.referrals),
          <>
            {backButton()}
            Referrals
          </>,
          <>
            <ReferralLinkCopyInputBox
              className={styles.referralLink}
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
            />
            <TwoColumnTable
              headings={['Referrals', 'Joined date']}
              rows={referrals.map(({ username, name, date }) => {
                return [
                  <>
                    <span className={styles.primaryData}>{name}</span>
                    <span className={styles.secondaryData}>{username}</span>
                  </>,
                  <>
                    <span className={styles.secondaryData}>
                      {moment(date).format('DD.MM.YYYY')}
                    </span>
                  </>,
                ];
              })}
              noResultMessage={'No referrals yet.'}
            />
          </>
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
  const transactionCount = _.size(state.transaction.transactions);
  const transactions = _.map(state.transaction.transactions, transaction => {
    const betId = _.get(transaction, 'bet');
    const event = State.getEventByTrade(betId, state.event.events);
    const bet = State.getTradeByEvent(betId, event);

    return {
      ...transaction,
      bet,
      event,
    };
  });

  return {
    referralCount,
    transactionCount,
    transactions: _.orderBy(transactions, ['trx_timestamp'], ['desc']),
    referrals: state.authentication.referralList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
    fetchReferrals: () => {
      dispatch(AuthenticationActions.fetchReferrals());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
