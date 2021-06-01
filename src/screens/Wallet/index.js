import Link          from '../../components/Link';
import Routes        from '../../constants/Routes';
import styles        from './styles.module.scss';
import WalletCard    from '../../components/WalletCard';
import { connect }   from 'react-redux';
import { useState }  from 'react';
import Icon          from '../../components/Icon';
import IconType      from '../../components/Icon/IconType';
import IconTheme     from '../../components/Icon/IconTheme';
import Highlight     from '../../components/Highlight';
import React         from 'react';
import HighlightType from '../../components/Highlight/HighlightType';

const Wallet = ({ balance }) => {
    const [action, setAction] = useState('deposit');

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
            <div className={styles.switchViewsContainer}>
                <label className={styles.switchViews}>
                    <input
                        type="radio"
                        value="deposit"
                        onChange={() => {
                            setAction('deposit');
                        }}
                        defaultChecked={action === 'deposit'}
                        name="action"
                    />
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
                </label>
                <label className={styles.switchViews}>
                    <input
                        type="radio"
                        value="withdrawal"
                        onChange={() => {
                            setAction('withdrawal');
                        }}
                        defaultChecked={action === 'withdrawal'}
                        name="action"
                    />
                    <span className={styles.text}>
                        <Icon
                            width={'auto'}
                            iconTheme={IconTheme.primary}
                            iconType={IconType.withdrawal}
                        />
                        Withdrawal
                    </span>
                    <span className={styles.line}>
                    </span>
                </label>
            </div>
            <div className={styles.cardContainer}>
                <WalletCard
                    provider={'token'}
                    action={action}
                />
                <WalletCard
                    provider={'crypto'}
                    action={action}
                />
                <WalletCard
                    provider={'paypal'}
                    action={action}
                />
                <WalletCard
                    provider={'card'}
                    action={action}
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