import { useState } from 'react';
import classNames from 'classnames';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import styles from './PlaceBet.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const PlaceBet = () => {
  const [amount, setAmount] = useState('');
  const [cashout, setCashout] = useState('');

  const placeABet = () => {
    console.log('Trade payload: ', {
      amount,
      crashFactor: cashout
    });
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Trade Amount in {TOKEN_NAME}</label>
        <InputBox
          type="number"
          value={amount}
          setValue={setAmount}
          placeholder="0"
          showDeleteIcon={false}
        />
        <span className={styles.actions}>
          <span className={styles.action} onClick={() => setAmount(amount / 2)}>
            1/2
          </span>
          <span className={styles.action} onClick={() => setAmount(amount * 2)}>
            2x
          </span>
          <span className={styles.action}>Max</span>
        </span>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Cashout</label>
        <InputBox
          type="number"
          value={cashout}
          setValue={setCashout}
          placeholder="25:00"
          showDeleteIcon={false}
        />
        <span className={styles.actions}>
          <span className={styles.action} onClick={() => setCashout(0)}>
            X
          </span>
        </span>
      </div>
      <Button className={styles.signUpButton} onClick={placeABet}>
        Place Bet
      </Button>
    </div>
  );
};

export default PlaceBet;
