import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { AlertActions } from 'store/actions/alert';
import {
  selectHasStarted,
  selectGameOffline,
} from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import {formatToFixed, roundToTwo} from '../../helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { PopupActions } from 'store/actions/popup';
import TokenNumberInput from 'components/TokenNumberInput';
import PopupTheme from '../Popup/PopupTheme';
import Input from '../Input';
import { round } from 'lodash/math';
import _ from 'lodash';
/*import {
  selectDisplayBetButton,
} from '../../store/selectors/rosi-game';*/
import ReactCanvasConfetti from 'react-canvas-confetti';
import InfoBox from 'components/InfoBox';
import IconType from '../Icon/IconType';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import Timer from '../RosiGameAnimation/Timer';
import { TOKEN_NAME } from 'constants/Token';
import {MinesInput} from "./MinesInput";

import {
  FormGroup,
  InputLabel,
  Select
} from '../Form';

const PlaceBetMines = ({
  connected,
  onBet,
  bet,
  setAmount,
  amount,
  setMines,
  mines,
  gameInProgress,
  setGameInProgress,
  setBet,
  currentStep,
  setCurrentStep,
  onCashout,
  multiplier,
  profit
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);

  const [animate, setAnimate] = useState(false);
  const gameOffline = false//useSelector(selectGameOffline);

  const userUnableToBet = amount < 1 || gameOffline;

  const numberOfDemoPlays = Number(localStorage.getItem('numberOfElonGameDemoPlays')) || 0;
  const onTokenNumberChange = number => {
    setAmount(number);
  };

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= 10000 ? amount : 10000);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(amount * multiplier, 0);
    if (changedValue > 10000) {
      setAmount(10000);
    } else if (changedValue < 1) {
      setAmount(1);
    } else {
      setAmount(changedValue);
    }
  };

  const placeABet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    const payload = {
      amount,
      minesCount: mines
    }

    // console.log('###payload', payload);
    await onBet(payload);

    setGameInProgress(true);
    setCurrentStep(0);
    setBet({
      ...bet,
      done: true
    })
  }

  const placeAutoBet = async () => {
    return;
  }


  const placeGuestBet = () => {
    showLoginPopup();
  };

  const handleCashout = e => {
    e.preventDefault();
    e.stopPropagation();

    setGameInProgress(false);
    setCurrentStep(0);
    onCashout();
  };

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: {
          small: true,
          authenticationType: AuthenticationType.register,
        },
      })
    );
  };

  const renderButton = () => {
    if (!gameInProgress) {
      return (
        <span
          role="button"
          tabIndex="0"
          className={classNames(styles.button, {
            [styles.buttonDisabled]:
              !connected ||
              userUnableToBet ||
              bet?.pending ||
              (amount > userBalance && user.isLoggedIn),
            [styles.notConnected]: !connected,
          })}
          disabled={false}
          onClick={bet?.pending ? null : user.isLoggedIn ? (selector === 'manual' ? placeABet : placeAutoBet) : placeGuestBet }
        >
          {user.isLoggedIn ? (selector === 'manual' ? 'Place Bet' : 'Start Auto Bet') : 'Play Demo'}
        </span>
      );
    } else {
      return (
        <>
          <div className={styles.currentMultiplier}>Multiplier: <span className={classNames('global-cashout-profit')}>{!multiplier ? "-" : 'x' + multiplier}</span></div>
          <div className={styles.currentMultiplier}>Profit: <span className={classNames('global-cashout-profit')}>{!profit ? "-" : '+' + roundToTwo(profit)}</span></div>

          <div
            role="button"
            tabIndex="0"
            className={classNames(
              styles.button,
              styles.cashoutButton, {
              [styles.buttonDisabled]: currentStep === 0})
            }
            onClick={currentStep === 0 ? ()=>{} : handleCashout }
          >
            Cashout
          </div>
        </>
      )
    }
  };
  const renderMessage = () => {
    if (gameOffline) {
      return (
        <div
          className={classNames([
            styles.betInfo,
            !user.isLoggedIn ? styles.guestInfo : [],
          ])}
        >
          Waiting for connection...
        </div>
      );
    }
    if (!user.isLoggedIn) {
      return (
        <div className={classNames([styles.betInfo, styles.guestInfo])}>
          This is a simulated version. Signin to start playing.
        </div>
      );
    }
  };
  const [selector, setSelector] = useState('manual')

  const switchButton = () => {
    return (
      <div className={styles.selector}>
        <span className={styles.top} style={{ marginLeft: selector === 'manual' ? 0 : '48.3%' }}></span>
        <div className={classNames(styles.tab)} onClick={() => setSelector('manual')} >
          <span className={selector === 'manual' ? styles.selected : styles.deselected}>Manual Bet</span>
        </div>
        <div className={classNames(styles.tab)} onClick={() => setSelector('auto')} >
          <span className={selector !== 'manual' ? styles.selected : styles.deselected}>Auto Bet</span>
        </div>
      </div>
    )
  }

  const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 999,
  };

  const minesArray = _.times(24, (index)=> (index+1));

  return (
    <div className={classNames(styles.container)}>
      <ReactCanvasConfetti
        style={canvasStyles}
        fire={animate}
        particleCount={300}
        spread={360}
        origin={{ x: 0.4, y: 0.45 }}
      />
      <div className={styles.inputContainer}>
        {switchButton(styles)}
        {selector === 'manual' ?
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={user?.currency}
                setValue={onTokenNumberChange}
                minValue={1}
                decimalPlaces={0}
                maxValue={formatToFixed(
                  user.balance > 10000 ? 10000 : user.balance
                )}
                dataTrackingIds={{
                  inputFieldHalf: 'alpacawheel-input-field-half',
                  inputFieldDouble: 'alpacawheel-input-field-double',
                  inputFieldAllIn: 'alpacawheel-input-field-allin',
                }}
              />
            ) : (
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  styles.demoInput
                )}
              >
                <Input
                  className={classNames(styles.input)}
                  type={'number'}
                  value={amount}
                  onChange={onGuestAmountChange}
                  step={0.01}
                  min="1"
                  max={'10000'}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{TOKEN_NAME}</span>
                </span>
                <div className={styles.buttonWrapper}>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-half"
                    onClick={() => onBetAmountChanged(0.5)}
                  >
                    ½
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-double"
                    onClick={() => onBetAmountChanged(2)}
                  >
                    2x
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-allin"
                    onClick={() => setAmount(10000)}
                  >
                    Max
                  </span>
                </div>
              </div>
            )}
            <div className={styles.inputContainer}>
              <label
                className={classNames(
                  styles.label,
                )}
              >
                Mines
              </label>
              <div className={styles.riskSelection}>
                <MinesInput mines={mines} setMines={setMines}/>
              </div>
            </div>
          </div>
          :
          <div className={classNames(styles.sliderContainer, styles.autoBetContainer)}>
            Coming Soon
          </div>
        }
      </div>
      <ReactTooltip
        id={'rt'}
        place="top"
        effect="solid"
        offset={{ bottom: 10 }}
        multiline
        className={styles.tooltip}
      />
      {renderButton()}
      {renderMessage()}
    </div>
  );
};

export default PlaceBetMines;
