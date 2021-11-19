import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { ROSI_GAME_AFTER_CRASH_DELAY } from 'constants/RosiGame';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
  selectNextGameAt,
} from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../RouletteGameAnimation/AnimationController';
import { AnimationController, BackgroundPlinko } from './AnimationController'
import GameAudioControlsLocal from '../GameAudioControlsLocal';

const PlinkoGameAnimation = ({
  connected,
  muteButtonClick,
  setSpins,
  amount,
  onInit,
  risk,
  setBet,
  bet
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const lastCrashValue = useSelector(selectLastCrash);
  const cashedOut = useSelector(selectCashedOut);
  const nextGameAtTimeStamp = useSelector(selectNextGameAt);

  const [running, setRunning] = useState(false);
  const [isAnimationReady, setAnimationReady] = useState(false);
  const [audio, setAudio] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [backg, setBackg] = useState(0);
  const [start, setStart] = useState(false);
  const [ball, setBall] = useState(null);

  const backgRef = useRef(backg);
  backgRef.current = backg

  useEffect(() => {
    if(backgroundRef) {
      setWidth(backgroundRef.current.clientWidth)
      setHeight(backgroundRef.current.clientHeight)
    }
    const aud = new AudioController(0)
    setAudio(aud)
    aud.startBgm();
    onInit(aud)
    return () => {
      aud.stopBgm();
    }
  },[])

  useEffect(() => {
    if(bet && !bet.pending && bet.path && !running) spin(bet);
  }, [bet]);

  const spin = async () => {
    if (running) return;
    else setRunning(true);
    setStart(true)
    setBall({path: bet.path, winMultiplier: bet.winMultiplier })
    setRunning(false);
    !bet.autobet && setBet({pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward});
  }

  const changeBackground = (count) => {
    setTimeout(() => {
      setBackg(backgRef.current === 2 ? 0 : backgRef.current + 1)
      count < 30 && changeBackground(count + 1)
    }, 100)
  }

  const handleLose = () => {
    bet.autobet && setBet({pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward});
  }
  const handleWin = () => {
    setBackg(backgRef.current === 2 ? 0 : backgRef.current + 1)
    bet.autobet && setBet({pending: true, amount: bet.amount, profit: bet.profit, reward: bet.reward});
    changeBackground(0)
  }

  return (
    <div ref={backgroundRef} className={styles.animation}>
      {audio && <GameAudioControlsLocal game='plinko' audio={audio} muteButtonClick={muteButtonClick}/>}
      <BackgroundPlinko state={backg} size={Math.min(width, height)*4} />
      {width && height && <AnimationController risk={risk} amount={amount} ballValue={ball} audio={audio} start={start} setStart={setStart} onLose={handleLose} onWin={handleWin} width={width} height={height} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    isMute: state.rosiGame.volumeLevel == 0,
    volumeLevel: state.rosiGame.volumeLevel,
    musicIndex: state.rosiGame.musicIndex,
    isSynced: state.rosiGame.timeStarted || state.rosiGame.nextGameAt,
    animationIndex: state.rosiGame.animationIndex,
    isLosing: state.rosiGame.userBet && !state.rosiGame.isCashedOut,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    muteButtonClick: () => {
    //  dispatch(RouletteGameAnimation.muteButtonClick());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlinkoGameAnimation);
