import { TOKEN_NAME } from 'constants/Token';
import styles from './styles.module.scss';
import WfairLogo from '../../data/images/wfair-logo-splash.png';

const WithdrawalSuccessPopup = ({ 
  amountReceived,
  currency,
  wfairAmount,
  btcEquivalent,
  fee
}) => {

  return (
    <div className={styles.withdrawalSuccess}>
      <img src={WfairLogo} className={styles.logo} />
      <div className={styles.title}>Congratulations!</div>
      <div className={styles.subtitle}>Withdrawal Successfully Processed</div>
      <div className={styles.content}>
        <div className={styles.message}>
          You will receive {amountReceived} {currency} on your Wallet
        </div>
        <div className={styles.info}>
          Be Aware Transaction Will Take 2-5 Minutes
        </div>
      </div>
      <div className={styles.summary}>
        <div className={styles.row}>
          <div className={styles.key}>Amount of {TOKEN_NAME}</div>
          <div className={styles.value}>{wfairAmount}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Equivalent in BTC</div>
          <div className={styles.value}>{btcEquivalent}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Transaction fee</div>
          <div className={styles.value}>{fee}</div>
        </div>
      </div>

      <a
        href='https://www.blockchain.com/'
        target='_blank'
        className={styles.blockchainLink}
      >
        <span className={styles.text}>
          View on <span className={styles.underline}>Blockchain.com</span>
        </span>
      </a>
    </div>
  )
};

export default WithdrawalSuccessPopup;