import _                       from 'lodash';
import AccountBalance          from '../../components/AccountBalanceView';
import Highlight               from '../../components/Highlight';
import HighlightType           from '../../components/Highlight/HighlightType';
import Icon                    from '../../components/Icon';
import IconTheme               from '../../components/Icon/IconTheme';
import IconType                from '../../components/Icon/IconType';
import PaymentAction           from '../../constants/PaymentAction';
import PaymentProvider         from '../../constants/PaymentProvider';
import PopupTheme              from '../../components/Popup/PopupTheme';
import React                   from 'react';
import Routes                  from '../../constants/Routes';
import ScreenWithHeader        from '../../components/ScreenWithHeaderContainer';
import styles                  from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper    from '../../helper/SwitchableHelper';
import WalletCard          from '../../components/WalletCard';
import WalletPaymentCard       from '../../components/WalletPaymentCard';
import { connect }             from 'react-redux';
import { PopupActions }        from '../../store/actions/popup';
import { useHistory }          from 'react-router';
import { useState }            from 'react';

const Wallet = ({ balance, referralCount, showPopup }) => {
    const history                           = useHistory();
    const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);
    const activityCount                     = 0;

    const onPaymentActionSwitch = (newIndex) => {
        if (newIndex === 0) {
            setPaymentAction(PaymentAction.deposit);
        } else {
            setPaymentAction(PaymentAction.withdrawal);
        }
    };

    const renderConditionalWalletCards = () => {
        if (paymentAction === PaymentAction.deposit) {
            return (
                <>
                    <WalletCard
                        title={'Invite your friends'}
                        subtitle={'EVNT tokens for inviting people'}
                        text={'Invite your friends using your referral link and get 50 EVNT token for each user who joined over your link.'}
                        buttonText={'Share with your friends'}
                        onClick={onReferralListClick}
                    />
                </>
            );
        }
    };

    const renderShortcutListItem = (text, onClick, iconType = IconType.activities) => {
        return (
            <div
                className={styles.shortcutButton}
                onClick={onClick}
            >
                <Highlight
                    width={'auto'}
                    highlightType={HighlightType.highlightSettingsMyWallet}
                />
                <Icon
                    width={'auto'}
                    iconTheme={IconTheme.primary}
                    iconType={iconType}
                />
                <span className={styles.shortcutText}>
                    {text}
                </span>
                <i>
                </i>
            </div>
        );
    };

    const onActivityListClick = () => {
        //TODO
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

    const renderShortcutList = () => {
        return (
            <>
                {
                    renderShortcutListItem(
                        <>
                            Check history ({activityCount})
                        </>,
                        onActivityListClick,
                    )
                }
                {
                    renderShortcutListItem(
                        <>
                            See all <strong>{referralCount} referrals</strong>
                        </>,
                        onReferralListClick,
                        IconType.chat,
                    )
                }
            </>
        );
    };

    const renderSwitchableView = () => {
        const switchableViews = [
            SwitchableHelper.getSwitchableView(
                'Deposit',
                IconType.deposit,
            ),
            SwitchableHelper.getSwitchableView(
                'Withdrawal',
                IconType.withdrawal,
            ),
        ];
        const selectedIndex   = paymentAction === PaymentAction.deposit ? 0 : 1;

        return (
            <SwitchableContainer
                switchableViews={switchableViews}
                currentIndex={selectedIndex}
                setCurrentIndex={onPaymentActionSwitch}
            />
        );
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
        <ScreenWithHeader
            title={'My Wallet'}
            returnRoute={Routes.home}
        >
            <div className={styles.walletContainer}>
                <AccountBalance
                    balance={balance}
                />
                {renderShortcutList()}
            </div>
            {renderSwitchableView()}
            <div className={styles.cardContainer}>
                {renderConditionalWalletCards()}
                {renderWalletPaymentCard(PaymentProvider.evntToken)}
                {renderWalletPaymentCard(PaymentProvider.crypto)}
                {renderWalletPaymentCard(PaymentProvider.paypal)}
                {renderWalletPaymentCard(PaymentProvider.debitCreditCard)}
            </div>
        </ScreenWithHeader>
    );
};

const mapStateToProps = (state) => {
    const referralCount = _.size(state.authentication.referralList);

    return {
        balance: state.authentication.balance,
        referralCount,
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