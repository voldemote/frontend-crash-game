import { useCallback } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as BitcoinIcon} from '../../../data/icons/deposit/bitcoin.svg';
import {ReactComponent as EuroIcon} from '../../../data/icons/deposit/euro.svg';
import {ReactComponent as WalletIcon} from '../../../data/icons/deposit/wallet.svg';
import {ReactComponent as Arrow} from '../../../data/icons/deposit/arrow.svg';
import Button from 'components/Button';


const DepositCrypto = () => {

  return (
    <div className={styles.depositCrypto}>
      <p className={styles.title}>
        WFAIR conversion calculator
      </p>
      <p>
        Alpacasino uses WFAIR currency to play games and win. You can convert your won WFAIR token back into crypto currency  or in EUR / USD at any time around the world.
      </p>

      <p className={styles.title}>
        Deposit with Crypto
      </p>
      <p>
        Deposit EUR or USD to start playing in a few hours.
      </p>

      <Button>Deposit ___ BTC</Button>
    </div>
  );
};



export default DepositCrypto;
