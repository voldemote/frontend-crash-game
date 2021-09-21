import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import * as Api from 'api/crash-game';
import { RosiGameActions } from 'store/actions/rosi-game';
import { AlertActions } from 'store/actions/alert';
import { selectUserBet, selectHasStarted } from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import { formatToFixed } from '../../helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { PopupActions } from 'store/actions/popup';
import TokenNumberInput from 'components/TokenNumberInput';
import PopupTheme from '../Popup/PopupTheme';
import Routes from 'constants/Routes';
import Input from '../Input';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const sliderMinAmount = userBalance > 50 ? 50 : 0;
  // const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const userPlacedABet = useSelector(selectUserBet);
  const userUnableToBet = isGameRunning || userPlacedABet;
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState(1);

  const onTokenNumberChange = number => {
    console.log(number);
    setAmount(number);
    // debouncedSetCommitment(number, currency);
  };
  const onCrashFactorChange = number => {
    console.log(number);
    setCrashFactor(number.target.value);
    // debouncedSetCommitment(number, currency);
  };

  const placeABet = () => {
    if (userUnableToBet) return;

    const payload = {
      amount,
      crashFactor: Math.round(Math.abs(parseFloat(crashFactor)) * 100) / 100,
    };

    Api.createTrade(payload)
      .then(response => {
        dispatch(RosiGameActions.setUserBet(payload));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  };

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: { small: true },
      })
    );
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.inputContainer}>
        <div>
          <h2 className={styles.placebidTitle}>Place Bet</h2>
        </div>
        <div className={styles.sliderContainer}>
          <label className={styles.label}>Bet Amount</label>
          <TokenNumberInput
            value={amount}
            currency={user?.currency}
            setValue={onTokenNumberChange}
            maxValue={formatToFixed(user.balance)}
            disabled={!user.isLoggedIn}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Auto Cashout at</label>
        <div className={classNames(styles.cashedOutInputContainer)}>
          <Input
            className={styles.input}
            type={'number'}
            value={crashFactor}
            onChange={onCrashFactorChange}
            step={0.1}
            min="1"
            disabled={!user.isLoggedIn}
          />
          <span className={styles.eventTokenLabel}>
            <span onClick={() => setCrashFactor(0)}>X</span>
          </span>
        </div>
      </div>
      <span
        role="button"
        tabIndex="0"
        className={classNames(styles.button, {
          [styles.buttonDisabled]: userUnableToBet,
        })}
        onClick={user.isLoggedIn ? placeABet : showLoginPopup}
      >
        {user.isLoggedIn ? 'Place Bet' : 'Join To Start Betting'}
      </span>
    </div>
  );
};

export default PlaceBet;
