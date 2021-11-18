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
import { RiskInput, NgamesInput, StandardInput, ToggleInput } from './components';
import ReactCanvasConfetti from 'react-canvas-confetti';
import InfoBox from 'components/InfoBox';
import IconType from '../Icon/IconType';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import Timer from '../RosiGameAnimation/Timer';
import { TOKEN_NAME } from 'constants/Token';

const PlaceBetCasino = ({
  gameName,
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

  const [ngame, setNgame] = useState(1);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const [game, setGame] = useState({ngame: 0});
  const gameOffline = false//useSelector(selectGameOffline);
  const [wincrease, setWincrease] = useState(0)
  const [lincrease, setLincrease] = useState(0)
  const [lossbutton, setLossbutton] = useState(false)
  const [winbutton, setWinbutton] = useState(false)
  const [spinlimit, setSpinlimit] = useState(false)
  const [accumulated, setAccumulated] = useState(0)
  const [plinko, setPlinko] = useState(0)
  const userUnableToBet = amount < 1 || !canBet || gameOffline;

  const numberOfDemoPlays = Number(localStorage.getItem('numberOfElonGameDemoPlays')) || 0;

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
      ngame: ngame - 1,
      riskFactor: risk
    }
    const bet = await onBet(payload)
  }

  const placeAutoBet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    const payload = {
      amount,
      autobet: true,
      profit: Number(profit),
      loss: Number(loss),
      wincrease: winbutton?0:Number(wincrease)/100,
      lincrease: lossbutton?0:Number(lincrease)/100,
      riskFactor: risk
    };
    setAccumulated(0)
    setGame(payload)
    const bet = await onBet(payload)
  };
  console.log("bet", bet)


  const placeGuestBet = () => {
    if (numberOfDemoPlays === 3) {
      showLoginPopup();
      return;
    }

    if (userUnableToBet) return;
    const payload = {
      amount,
      demo: true,
      ngame: ngame-1,
      riskFactor: risk,
      winIndex:  Math.floor((Math.random() * 12) | 0)
    };
    onBet(payload)
    setGame(payload)
    if (numberOfDemoPlays < 3) {
      localStorage.setItem('numberOfElonGameDemoPlays', numberOfDemoPlays + 1);
    }
  };
  useEffect(async () => {
    if(bet?.pending && game.ngame > 0) {
      setGame({...game, ngame: game.ngame -1})
      await onBet({...game, ngame: game.ngame -1});
    }else if(bet?.pending && game.autobet){
      const acc = bet.profit + accumulated
      setAccumulated(acc)
      if(game.ngame === 0){
        const newamount = bet.profit > 0 ? Math.floor(winbutton ? amount : game.amount*(1+game.wincrease)) : Math.floor(lossbutton ? amount : game.amount*(1+game.lincrease))
        setGame({ngame: 0, amount: newamount})
        return;
      }
      if(game.profit >= 0 && game.profit > acc && game.loss >= 0 && game.loss > -acc){
        const newamount = bet.profit > 0 ? Math.floor(winbutton ? amount : game.amount*(1+game.wincrease)) : Math.floor(lossbutton ? amount : game.amount*(1+game.lincrease))
        setGame({...game, amount: newamount, ngame: game.ngame ? game.ngame -1 : game.ngame})
        await onBet({...game, amount: newamount, ngame: game.ngame ? game.ngame -1 : game.ngame});
      }
      else{
        setGame({ngame: 0});
      }
    }
  }, [bet])

  const cancelBet = e => {
    e.preventDefault();
    e.stopPropagation();
    setGame({ngame: 0})
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
    if (!game.autobet && game?.ngame <= 0) {
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
          onClick={!bet?.pending? null : user.isLoggedIn ? (selector === 'manual' ? placeABet : placeAutoBet) : placeGuestBet }
          data-tracking-id={
            user.isLoggedIn ? 'alpacawheel-place-bet' : 'alpacawheel-play-demo'
          }
        >
          {user.isLoggedIn ? (selector === 'manual' ? 'Place Bet' : 'Start autobet') : 'Play Demo'}
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
        <span className={styles.top} style={{ marginLeft: selector === 'manual' ? 0 : 152 }}></span>
        <div className={classNames(styles.tab, selector === 'manual' ? styles.selected:styles.deselected)} onClick={() => setSelector('manual')} >
          <span>Manual Bet</span>
        </div>
        <div className={classNames(styles.tab, selector === 'auto' ? styles.selected:styles.deselected)} onClick={() => setSelector('auto')} >
          <span>Auto Bet</span>
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
                setValue={(v)=>setAmount(v)}
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
            <RiskInput number={gameName==='plinko'?3:7} risk={risk} setRisk={setRisk} />
            {gameName!=='plinko' &&<NgamesInput text={'Number of Spins'} ngame={ngame} setNgame={setNgame} game={game} />}
          </div>
          :
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={user?.currency}
                setValue={(v)=>setAmount(v)}
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
            <RiskInput number={gameName==='plinko'?3:7} risk={risk} setRisk={setRisk} />
            <StandardInput title={'Stop on Profit'} setValue={setProfit} value={profit} />
            <StandardInput title={'Stop on Profit'} setValue={setLoss} value={loss} />
            <ToggleInput title={'On Win'} setValue={setWincrease} value={wincrease} setToggle={setWinbutton} toggle={winbutton} />
            <ToggleInput title={'On Loss'} setValue={setLincrease} value={lincrease} setToggle={setLossbutton} toggle={lossbutton} />
            {game.autobet &&
              <div className={styles.spinsleft}>
                <span className={accumulated > 0 ? styles.reward : styles.lost}>
                {Math.floor(accumulated)} PFAIR
                </span>
                accumulated
              </div>
            }
            {game.autobet && game.amount &&
              <div className={styles.spinsleft}>
                Current bet:
                <span className={styles.neutral}>
                {Math.floor(game.amount)} PFAIR
                </span>
              </div>
            }
            {game.ngame > 0 &&
              <div className={styles.spinsleft}>
                {game.ngame} spins left
              </div>
            }
          </div>
        }
      </div>
      {/*showCashoutWarning ? (
        <div className={styles.error}>
          <span>Betting less than 1 is not recommended. </span>
          <span
            data-for="rt"
            className={styles.why}
            data-tip="The multiplying factor defines your final reward.<br/>
             A multiplier of 2x means twice the reward, when the game ends.<br/>
              If the game ends before your multiplier,<br/> your amount invested is lost.<br/>"
          >
            Understand why.
          </span>
        </div>
      ) : null*/}
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

export default PlaceBetCasino;
