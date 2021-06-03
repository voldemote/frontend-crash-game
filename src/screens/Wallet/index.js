import Link            from '../../components/Link';
import Routes          from '../../constants/Routes';
import styles          from './styles.module.scss';
import WalletCard      from '../../components/WalletCard';
import { connect }     from 'react-redux';
import { useState }    from 'react';
import Icon            from '../../components/Icon';
import IconType        from '../../components/Icon/IconType';
import IconTheme       from '../../components/Icon/IconTheme';
import Highlight       from '../../components/Highlight';
import React           from 'react';
import HighlightType   from '../../components/Highlight/HighlightType';
import PaymentProvider from '../../constants/PaymentProvider';
import PaymentAction   from '../../constants/PaymentAction';
import classNames      from 'classnames';

const Wallet = ({ balance }) => {
    const [paymentAction, setPaymentAction] = useState(PaymentAction.deposit);

    const onPaymentActionSwitch = (paymentAction) => {
        return () => setPaymentAction(paymentAction);
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
                <div className={styles.accountBallance}>
                    <div>
                        {balance}
                        <sup>
                            EVNT
                        </sup>
                    </div>
                    <small>available</small>
                </div>
                <button className={styles.activitiesButton}>
                    <Highlight
                        width={'auto'}
                        highlightType={HighlightType.highlightSettingsMyWallet}
                    />
                    <Icon
                        width={'auto'}
                        iconTheme={IconTheme.primary}
                        iconType={IconType.activities}
                    />
                    <span className={styles.activitiesText}>
                        See all <strong>53 activities</strong>
                    </span>
                    <i></i>
                </button>
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
                <WalletCard
                    provider={PaymentProvider.evntToken}
                    action={paymentAction}
                />
                <WalletCard
                    provider={PaymentProvider.crypto}
                    action={paymentAction}
                />
                <WalletCard
                    provider={PaymentProvider.paypal}
                    action={paymentAction}
                />
                <WalletCard
                    provider={PaymentProvider.debitCreditCard}
                    action={paymentAction}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        balance: state.authentication.balance,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wallet);