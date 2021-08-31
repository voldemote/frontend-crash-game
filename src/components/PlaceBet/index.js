import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from 'api/crash-game';
import { RosiGameActions } from '../../store/actions/rosi-game';
import { AlertActions } from '../../store/actions/alert';
import { selectUserBet } from '../../store/selectors/rosi-game';
import classNames from 'classnames';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import styles from './PlaceBet.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [cashout, setCashout] = useState('');
  const userPlacedABet = useSelector(selectUserBet);

  const placeABet = () => {
    const payload = { amount, crashFactor: cashout };

    setAmount('');
    setCashout('');

    Api.createTrade(payload).then(response => {
      dispatch(RosiGameActions.setUserBet(payload));
    }).catch(error => {
      dispatch(AlertActions.showError(error.message));
    })
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
          disabled={userPlacedABet}
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
          disabled={userPlacedABet}
        />
        <span className={styles.actions}>
          <span className={styles.action} onClick={() => setCashout(0)}>
            X
          </span>
        </span>
      </div>
      <Button className={styles.signUpButton} onClick={placeABet} disabled={userPlacedABet}>
        Place Bet
      </Button>
    </div>
  );
};

export default PlaceBet;
