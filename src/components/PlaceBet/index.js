import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import * as Api from 'api/crash-game';
import Slider from '@material-ui/core/Slider';
import { RosiGameActions } from 'store/actions/rosi-game';
import { AlertActions } from 'store/actions/alert';
import { selectUserBet, selectHasStarted } from 'store/selectors/rosi-game';
import InputBox from 'components/InputBox';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import useCurrentUser from 'hooks/useCurrentUser';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const userBalance = parseInt(user.balance, 10);
  const sliderMinAmount = user.balance > 50 ? 50 : 0;
  const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const userPlacedABet = useSelector(selectUserBet);
  const userUnableToBet = isGameRunning || userPlacedABet;
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState(0);

  const placeABet = () => {
    if (userUnableToBet) return;

    const payload = {
      amount,
      crashFactor: Math.round(Math.abs(parseFloat(crashFactor)) * 100) / 100,
    };

    console.log(payload);

    Api.createTrade(payload)
      .then(response => {
        dispatch(RosiGameActions.setUserBet(payload));
        setAmount(sliderMinAmount);
        setCrashFactor(0);
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.inputContainer}>
        <div>
          <label className={styles.label}>Trade Amount in {TOKEN_NAME}</label>
        </div>
        <Slider
          min={sliderMinAmount}
          max={sliderMaxAmount}
          marks={[
            { value: sliderMinAmount, label: sliderMinAmount.toString() },
            { value: sliderMaxAmount, label: sliderMaxAmount.toString() },
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
          min="0"
          value={crashFactor}
          setValue={setCrashFactor}
          placeholder="25:00"
          showDeleteIcon={false}
          disabled={userUnableToBet}
          className={styles.input}
          containerClassName={styles.inputBoxContainer}
        />
        <span className={styles.actions}>
          <span className={styles.action} onClick={() => setCrashFactor(0)}>
            X
          </span>
        </span>
      </div>
      <span
        role="button"
        tabIndex="0"
        className={classNames(styles.button, {
          [styles.buttonDisabled]: userUnableToBet,
        })}
        onClick={placeABet}
      >
        Place Bet
      </span>
    </div>
  );
};

export default PlaceBet;
