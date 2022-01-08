import { useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as BitcoinIcon} from '../../../data/icons/deposit/bitcoin.svg';
import {ReactComponent as EuroIcon} from '../../../data/icons/deposit/euro.svg';
import {ReactComponent as WalletIcon} from '../../../data/icons/deposit/wallet.svg';
import {ReactComponent as Arrow} from '../../../data/icons/deposit/arrow.svg';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { TransactionActions } from 'store/actions/transaction';

const DepositSelection = ({showWalletDepositCrypto, showWalletDepositFiat, showWalletConnectWallet, fetchWalletTransactions}) => {

  useEffect(() => {
    fetchWalletTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.depositSelectionContainer}>
      <div className={styles.selectorButton} onClick={showWalletDepositCrypto}>
        <BitcoinIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Deposit with Crypto
          </p>
          <p>
            Deposit ETH or BTC and start playing immediately.
          </p>
        </div>
        <Arrow />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <EuroIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Buy with EUR / USD
          </p>
          <p>
            Deposit EUR or USD to start playing in a few hours.
          </p>
        </div>
        <Arrow />
      </div>

      <div className={styles.selectorButton} onClick={showWalletConnectWallet}>
        <WalletIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Connect your Wallet
          </p>
          <p>
            Connect your existing wallet with WFAIR you bought and start immediately.
          </p>
        </div>
        <Arrow />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { 
    showWalletDepositCrypto: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositCrypto }));
    },
    showWalletDepositFiat: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositFiat }));
    },
    showWalletConnectWallet: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletConnectWallet }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  }
}

export default connect(null, mapDispatchToProps)(DepositSelection);
