import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import * as Api from 'api/crash-game';
import Slider from '@material-ui/core/Slider';
import { RosiGameActions } from 'store/actions/rosi-game';
import { AlertActions } from 'store/actions/alert';
import { selectUserBet } from 'store/selectors/rosi-game';
import State from 'helper/State';
import toNumber from 'lodash/toNumber';
import { formatToFixed } from 'helper/FormatNumbers';
import { selectUsers } from 'store/selectors/user';
import { selectUserId } from 'store/selectors/authentication';
import InputBox from 'components/InputBox';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userId = useSelector(selectUserId);
  const user = State.getUser(userId, users);
  const userBalance = 1000;
  const sliderMinAmount = user.balance > 50 ? 50 : 0;
  const sliderMaxAmount = Math.min(500, userBalance);
  const [amount, setAmount] = useState(sliderMinAmount);
  const [cashout, setCashout] = useState(0);
  const userPlacedABet = useSelector(selectUserBet);

  const placeABet = () => {
    if (userPlacedABet) return;

    const payload = { amount, crashFactor: cashout };

    console.log(payload);

    // setAmount(sliderMinAmount);
    // setCashout(0);

    // Api.createTrade(payload).then(response => {
    //   dispatch(RosiGameActions.setUserBet(payload));
    // }).catch(error => {
    //   dispatch(AlertActions.showError(error.message));
    // })
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
        className={classNames(styles.button, { [styles.buttonDisabled]: true })}
        onClick={placeABet}
      >
        Place Bet
      </span>
    </div>
  );
};

export default PlaceBet;
