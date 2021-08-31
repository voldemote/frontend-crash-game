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
import WalletCard from 'components/WalletCard';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import WalletPaymentCard from 'components/WalletPaymentCard';
import PaymentProvider from 'constants/PaymentProvider';
import IconTheme from 'components/Icon/IconTheme';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router-dom';
import State from 'helper/State';
import TwoColumnTable from 'components/TwoColumnTable';
import moment from 'moment';
import InputBoxTheme from '../InputBox/InputBoxTheme';
import { TOKEN_NAME } from '../../constants/Token';
import WalletBalance from '../WalletBalance';

const Wallet = ({
  show,
  referralCount,
  transactionCount,
  close,
  showPopup,
  transactions,
  referrals,
}) => {
  const history = useHistory();

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

  useEffect(() => {
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

  const onReferralListClick = () => {
    showPopup(PopupTheme.referralList);
  };

  const onPaymentCardClickCallback = paymentProvider => {
    return () => {
      let route = Routes.walletDeposit;

      if (paymentAction === PaymentAction.withdrawal) {
        route = Routes.walletWithdrawal;
      }

      history.push(
        Routes.getRouteWithParameters(route, {
          paymentProvider,
        })
      );
    };
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
      />
    );
  };

  const renderConditionalWalletCards = () => {
    if (paymentAction === PaymentAction.deposit) {
      const referralText = (
        <>
          Invite your friends using your referral link and{' '}
          <strong>get 50 {TOKEN_NAME} token</strong> for each user who joined
          over your link.
        </>
      );

      return (
        <WalletCard
          title={`+50 ${TOKEN_NAME} Tokens: Invite your friends`}
          subtitle={`50 ${TOKEN_NAME} tokens for inviting people`}
          text={referralText}
          buttonText={'Share with your friends'}
          onClick={onReferralListClick}
        >
          <ReferralLinkCopyInputBox className={styles.referralLinkList} />
        </WalletCard>
      );
    }
  };

  const renderWalletPaymentCard = paymentProvider => {
    return (
      <WalletPaymentCard
        provider={paymentProvider}
        action={paymentAction}
        onClick={onPaymentCardClickCallback(paymentProvider)}
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
              onClick={() => setOpenMenu(menus.transactionHistory)}
            />
            <MenuItem
              classes={[styles.referrals]}
              label={`Referrals (${referralCount})`}
              icon={<Icon className={styles.optionIcon} iconType={'chat'} />}
              onClick={() => setOpenMenu(menus.referrals)}
            />

            {renderSwitchableView()}
            {renderConditionalWalletCards()}
            {/* Deactivated for now @see: https://wallfair-product.atlassian.net/browse/ML-124 {renderWalletPaymentCard(PaymentProvider.wfairToken)} */}
            {renderWalletPaymentCard(PaymentProvider.crypto)}
            {renderWalletPaymentCard(PaymentProvider.paypal)}
            {renderWalletPaymentCard(PaymentProvider.debitCreditCard)}
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
                    <span className={styles.primaryData}>{event.name}</span>
                    <span className={styles.secondaryData}>
                      {bet.marketQuestion}
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
    showPopup: popupType => {
      dispatch(PopupActions.show({ popupType }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
