import { useState }          from 'react';
import styles                from './styles.module.scss';
import WalletCard            from '../../components/WalletCard';
import Link                  from '../../components/Link';
import Routes                from '../../constants/Routes';

const Wallet = () => {
    const [action, setAction] = useState("deposit");

    return (
        <div className={styles.wallet}>
            <div className={styles.header}>
                <Link to={Routes.home} className={styles.arrowBack}><span></span></Link>
                <h1 className={styles.headline}>My Wallet</h1>
            </div>
            <div className={styles.walletContainer}>
                <div className={styles.accountBallance}>
                    <div>50.200<sup>EVNT</sup></div>
                    <small>available</small>
                </div>
                <button className={styles.activitiesButton}><span>See all <strong>53 activities</strong></span><i></i></button>
            </div>
            <div className={styles.switchViewsContainer}>
                <label className={styles.switchViews}>
                    <input type="radio" value="deposit" onChange={() => { setAction("deposit") }} defaultChecked={action === "deposit" ? true : false} name="action" />
                    <span className={styles.text}>Deposit</span>
                    <span className={styles.line}></span>
                </label>
                <label className={styles.switchViews}>
                    <input type="radio" value="withdrawal" onChange={() => { setAction("withdrawal") }} defaultChecked={action === "withdrawal" ? true : false} name="action" />
                    <span className={styles.text}>Withdrawal</span>
                    <span className={styles.line}></span>
                </label>
            </div>
            <div className={styles.cardContainer}>
                <WalletCard provider={"token"} action={action} />
                <WalletCard provider={"crypto"} action={action} />
                <WalletCard provider={"paypal"} action={action} />
                <WalletCard provider={"card"} action={action} />
            </div>
        </div>
    );
};

export default Wallet;