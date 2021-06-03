import classNames        from 'classnames';
import Highlight         from '../../components/Highlight';
import HighlightType     from '../../components/Highlight/HighlightType';
import Icon              from '../../components/Icon';
import IconTheme         from '../../components/Icon/IconTheme';
import IconType          from '../../components/Icon/IconType';
import Link              from '../../components/Link';
import PaymentAction     from '../../constants/PaymentAction';
import PaymentProvider   from '../../constants/PaymentProvider';
import React             from 'react';
import Routes            from '../../constants/Routes';
import styles            from './styles.module.scss';
import WalletCard        from '../../components/WalletCard';
import WalletPaymentCard from '../../components/WalletPaymentCard';
import { connect }       from 'react-redux';
import { useState }      from 'react';
import _                 from 'lodash';

const Wallet = ({ balance, referralList, referralCount }) => {
    const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);
    const activityCount                     = 0;

    const onPaymentActionSwitch = (paymentAction) => {
        return () => setPaymentAction(paymentAction);
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

    };

    const renderShortcutList = () => {
        return (
            <>
                {
                    renderShortcutListItem(
                        <>
                            See all <strong>{activityCount} activities</strong>
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

    return (
        <div className={styles.wallet}>
            <div className={styles.header}>
                <Link
                    to={Routes.home}
                    className={styles.arrowBack}
                >
                    <span>
                    </span>
                </Link>
                <h1 className={styles.headline}>
                    <Icon
                        width={'auto'}
                        iconTheme={IconTheme.primary}
                        iconType={IconType.wallet2}
                    />
                    My Wallet
                </h1>
            </div>
            <div className={styles.walletContainer}>
                <div className={styles.accountBalance}>
                    <div>
                        {balance}
                        <sup>
                            EVNT
                        </sup>
                    </div>
                    <small>available</small>
                </div>
                {renderShortcutList()}
            </div>
            <div
                className={styles.switchViewsContainer}
            >
                <div
                    className={classNames(
                        styles.switchViews,
                        paymentAction === PaymentAction.deposit ? styles.checked : null,
                    )}
                    onClick={onPaymentActionSwitch(PaymentAction.deposit)}
                >
                    <div className={styles.text}>
                        <Icon
                            width={'auto'}
                            iconTheme={IconTheme.primary}
                            iconType={IconType.deposit}
                        />
                        <span>
                            Deposit
                        </span>
                    </div>
                    <span className={styles.line}>
                    </span>
                </div>
                <div
                    className={classNames(
                        styles.switchViews,
                        paymentAction === PaymentAction.withdrawal ? styles.checked : null,
                    )}
                    onClick={onPaymentActionSwitch(PaymentAction.withdrawal)}
                >
                    <div className={styles.text}>
                        <Icon
                            width={'auto'}
                            iconTheme={IconTheme.primary}
                            iconType={IconType.withdrawal}
                        />
                        Withdrawal
                    </div>
                    <span className={styles.line}>
                    </span>
                </div>
            </div>
            <div className={styles.cardContainer}>
                {renderConditionalWalletCards()}
                <WalletPaymentCard
                    provider={PaymentProvider.evntToken}
                    action={paymentAction}
                />
                <WalletPaymentCard
                    provider={PaymentProvider.crypto}
                    action={paymentAction}
                />
                <WalletPaymentCard
                    provider={PaymentProvider.paypal}
                    action={paymentAction}
                />
                <WalletPaymentCard
                    provider={PaymentProvider.debitCreditCard}
                    action={paymentAction}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const referralList  = state.authentication.referralList;
    const referralCount = _.size(referralList);

    return {
        balance: state.authentication.balance,
        referralList,
        referralCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wallet);