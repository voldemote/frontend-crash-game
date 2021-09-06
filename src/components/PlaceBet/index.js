import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from 'api/crash-game';
import Slider from '@material-ui/core/Slider';
import { RosiGameActions } from '../../store/actions/rosi-game';
import { AlertActions } from '../../store/actions/alert';
import { selectUserBet } from '../../store/selectors/rosi-game';
import classNames from 'classnames';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [cashout, setCashout] = useState(0);
  const userPlacedABet = useSelector(selectUserBet);

  const placeABet = () => {
    const payload = { amount, crashFactor: cashout };

    setAmount(0);
    setCashout(0);

    // Api.createTrade(payload).then(response => {
    //   dispatch(RosiGameActions.setUserBet(payload));
    // }).catch(error => {
    //   dispatch(AlertActions.showError(error.message));
    // })

    console.log(payload);
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.inputContainer}>
        <div>
          <label className={styles.label}>Trade Amount in {TOKEN_NAME}</label>
        </div>
        <Slider
          min={0}
          max={1000}
          marks={[
            { value: 0, label: '0' },
            { value: 1000, label: '1000' },
          ]}
          valueLabelDisplay="auto"
          value={amount}
          onChange={(_, value) => setAmount(value)}
        />
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
          className={styles.input}
          containerClassName={styles.inputBoxContainer}
        />
        <span className={styles.actions}>
          <span className={styles.action} onClick={() => setCashout(0)}>
            X
          </span>
        </span>
      </div>
      <span
        role="button"
        tabIndex="0"
        className={styles.button}
        onClick={placeABet}
        // disabled={userPlacedABet}
      >
        Place Bet
      </span>
    </div>
  );
};

export default PlaceBet;
