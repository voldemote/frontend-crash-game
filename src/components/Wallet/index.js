import classNames from 'classnames';
import Icon from '../Icon';
import { formatToFixed } from 'helper/FormatNumbers';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import _ from 'lodash';
import MenuItem from '../MenuItem';
import SwitchableHelper from 'helper/SwitchableHelper';
import IconType from 'components/Icon/IconType';
import PaymentAction from 'constants/PaymentAction';
import SwitchableContainer from 'components/SwitchableContainer';
import { useState } from 'react';
import WalletCard from 'components/WalletCard';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import WalletPaymentCard from 'components/WalletPaymentCard';
import PaymentProvider from 'constants/PaymentProvider';
import IconTheme from 'components/Icon/IconTheme';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router-dom';


const Wallet = ({ show, balance, referralCount, transactionCount, close, showPopup }) => {
    const history = useHistory()
    const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);

    const onPaymentActionSwitch = (newIndex) => {
        if (newIndex === 0) {
            setPaymentAction(PaymentAction.deposit);
        } else {
            setPaymentAction(PaymentAction.withdrawal);
        }
    };


    const onReferralListClick = () => {
        showPopup(PopupTheme.referralList);
    };


    const onPaymentCardClickCallback = (paymentProvider) => {
        return () => {
            let route = Routes.walletDeposit;

            if (paymentAction === PaymentAction.withdrawal) {
                route = Routes.walletWithdrawal;
            }

            history.push(Routes.getRouteWithParameters(
                route,
                {
                    paymentProvider,
                },
            ));
        };
    };

    const renderSwitchableView = () => {
        const switchableViews = [
            SwitchableHelper.getSwitchableView(
                'Deposit',
                IconType.deposit,
                IconTheme.white,
            ),
            SwitchableHelper.getSwitchableView(
                'Withdrawal',
                IconType.withdrawal,
                IconTheme.white,
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
            const referralText = <>
                Invite your friends using your referral link and <strong>get 50 EVNT token</strong> for each user who joined over your link.
            </>;

            return (
                <WalletCard
                    title={'+50 EVNT Tokens: Invite your friends'}
                    subtitle={'50 EVNT tokens for inviting people'}
                    text={referralText}
                    buttonText={'Share with your friends'}
                    onClick={onReferralListClick}
                >
                    <ReferralLinkCopyInputBox className={styles.referralLinkList} />
                </WalletCard>
            );
        }
    };

    const renderWalletPaymentCard = (paymentProvider) => {
        return (
            <WalletPaymentCard
                provider={paymentProvider}
                action={paymentAction}
                onClick={onPaymentCardClickCallback(paymentProvider)}
            />
        );
    };

    return (
        <div className={classNames(styles.wallet, styles.drawer, !show && styles.drawerHidden)}>
            <h2 className={styles.walletHeading}>
                My Wallet
            </h2>

            <div className={styles.walletContents}>
                <div className={styles.walletBalance} role="button">
                    <span className={styles.balance}>
                        {formatToFixed(balance)}
                        <sup className={styles.currency}>EVNT</sup>
                    </span>
                    <span className={styles.balanceText}>Total balance available in EVNT</span>
                    <Icon iconType={'refresh'} className={styles.refreshIcon}/>
                </div>

                <MenuItem
                    classes={[styles.transactionHistory]}
                    label={`Transaction History (${transactionCount})`}
                    icon={(
                        <Icon className={styles.optionIcon} iconType={'activities'}/>
                    )}
                    onClick={() => console.log('transationsHistory')}
                />
                <MenuItem
                    classes={[styles.referrals]}
                    label={`Referrals (${referralCount})`}
                    icon={(
                        <Icon className={styles.optionIcon} iconType={'chat'}/>
                    )}
                    onClick={() => console.log('referrals')}
                />

                {renderSwitchableView()}
                {renderConditionalWalletCards()}
                {/* Deactivated for now @see: https://wallfair-product.atlassian.net/browse/ML-124 {renderWalletPaymentCard(PaymentProvider.evntToken)} */}
                {renderWalletPaymentCard(PaymentProvider.crypto)}
                {renderWalletPaymentCard(PaymentProvider.paypal)}
                {renderWalletPaymentCard(PaymentProvider.debitCreditCard)}

            </div>


            <Icon
                iconType={'cross'}
                onClick={close}
                className={styles.closeButton}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    const referralCount    = _.size(state.authentication.referralList);
    const transactionCount = _.size(state.transaction.transactions);

    return {
        balance:   state.authentication.balance,
        referralCount,
        transactionCount,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        showPopup: (popupType) => {
            dispatch(PopupActions.show({ popupType }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wallet);