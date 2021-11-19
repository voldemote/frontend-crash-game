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
import { formatToFixed } from '../../helper/FormatNumbers';
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
  setRisk,
  risk,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);

  const [mines, setMines] = useState(1);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [crashFactor, setCrashFactor] = useState('25.00');
  const [crashFactorDirty, setCrashFactorDirty] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const [nuspin, setNuspin] = useState({nspin: 0});
  const gameOffline = false//useSelector(selectGameOffline);
  const [wincrease, setWincrease] = useState(0)
  const [lincrease, setLincrease] = useState(0)
  const [lossbutton, setLossbutton] = useState(false)
  const [winbutton, setWinbutton] = useState(false)
  const [spinlimit, setSpinlimit] = useState(false)
  const [accumulated, setAccumulated] = useState(0)

  const userUnableToBet = amount < 1 || !canBet || gameOffline;

  const numberOfDemoPlays = Number(localStorage.getItem('numberOfElonGameDemoPlays')) || 0;
  const onTokenNumberChange = number => {
    setAmount(number);
  };

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= 10000 ? amount : 10000);
  };
  const onSelectMines = event => {
    let value = parseInt(_.get(event, 'target.value', 1));
    setMines(value);
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
      mines: mines
    }

    console.log('###payload', payload);

    // setNuspin(payload)
    const bet = await onBet(payload)
  }

  const placeAutoBet = async () => {
    // if (userUnableToBet) return;
    // if (amount > userBalance) return;
    // const payload = {
    //   amount,
    //   autobet: true,
    //   profit: Number(profit),
    //   loss: Number(loss),
    //   wincrease: winbutton?0:Number(wincrease)/100,
    //   lincrease: lossbutton?0:Number(lincrease)/100
    // };
    // setAccumulated(0)
    // setNuspin(payload)
  };



  const placeGuestBet = () => {
    if (numberOfDemoPlays === 3) {
      showLoginPopup();
      return;
    }

    if (userUnableToBet) return;
    const payload = {
      amount,
      demo: true,
      winIndex:  Math.floor((Math.random() * 12) | 0)
    };
    onBet(payload)
    // setNuspin(payload)
    if (numberOfDemoPlays < 3) {
      localStorage.setItem('numberOfElonGameDemoPlays', numberOfDemoPlays + 1);
    }
  };
  useEffect(async () => {
    // if(bet?.pending && nuspin.nspin > 0) {
    //   setNuspin({...nuspin, nspin: nuspin.nspin -1})
    //   await onBet({...nuspin, nspin: nuspin.nspin -1});
    // }else if(bet?.pending && nuspin.autobet){
    //   const acc = bet.profit + accumulated
    //   setAccumulated(acc)
    //   if(nuspin.nspin === 0){
    //     const newamount = bet.profit > 0 ? Math.floor(winbutton ? amount : nuspin.amount*(1+nuspin.wincrease)) : Math.floor(lossbutton ? amount : nuspin.amount*(1+nuspin.lincrease))
    //     setNuspin({nspin: 0, amount: newamount})
    //     return;
    //   }
    //   if(nuspin.profit >= 0 && nuspin.profit > acc && nuspin.loss >= 0 && nuspin.loss > -acc){
    //     const newamount = bet.profit > 0 ? Math.floor(winbutton ? amount : nuspin.amount*(1+nuspin.wincrease)) : Math.floor(lossbutton ? amount : nuspin.amount*(1+nuspin.lincrease))
    //     setNuspin({...nuspin, amount: newamount, nspin: nuspin.nspin ? nuspin.nspin -1 : nuspin.nspin})
    //     await onBet({...nuspin, amount: newamount, nspin: nuspin.nspin ? nuspin.nspin -1 : nuspin.nspin});
    //   }
    //   else{
    //     setNuspin({nspin: 0});
    //   }
    // }
  }, [bet])

  const cancelBet = e => {
    e.preventDefault();
    e.stopPropagation();
    // setNuspin({nspin: 0})
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
    if (!nuspin.autobet && nuspin?.nspin <= 0) {
      return (
        <span
          role="button"
          tabIndex="0"
          className={classNames(styles.button, {
            [styles.buttonDisabled]:
              !connected ||
              userUnableToBet ||
              !bet?.pending ||
              (amount > userBalance && user.isLoggedIn),
            [styles.notConnected]: !connected,
          })}
          disabled={false}
          onClick={!bet?.pending? null : user.isLoggedIn ? (selector === 'manual' ? placeABet : placeAutoBet) : placeGuestBet }
          // data-tracking-id={
          //   user.isLoggedIn ? 'alpacawheel-place-bet' : 'alpacawheel-play-demo'
          // }
        >
          {user.isLoggedIn ? (selector === 'manual' ? 'Place Bet' : 'Start Auto Bet') : 'Play Demo'}
        </span>
      );
    } else {
      return (
        <>
          <span
            role="button"
            tabIndex="0"
            className={classNames(styles.button, styles.cancel)}
            onClick={cancelBet}
            data-tracking-id={
              user.isLoggedIn ? null : 'alpacawheel-showloginpopup'
            }
          >
            Cancel Bet
          </span>
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

                  {/*<select*/}
                  {/*  className={classNames(styles.selectMines)}*/}
                  {/*  placeholder={'Select'}*/}
                  {/*  onChange={onSelectMines}*/}
                  {/*>*/}
                  {/*  {_.times(24, (index)=> {*/}
                  {/*  const item = index+1;*/}
                  {/*  return <option value={item}>{item}</option>;*/}
                  {/*  })}*/}
                  {/*</select>*/}
              </div>
            </div>
          </div>
          :
          <div className={styles.sliderContainer}>
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
