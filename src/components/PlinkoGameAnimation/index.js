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
//import Timer from './Timer';
//import Counter from './Counter';
import styles from './styles.module.scss';
import { RosiGameActions } from '../../store/actions/rosi-game';
import VolumeSlider from '../VolumeSlider';
//import GameAudioControls from '../GameAudioControls';
import AnimationController from './AnimationController';
import Stage from './plinko'
import { Plinko } from './plinkoBasic'

const BackgroundPlinko = ({size, state}) => {
  const colors = ["#d7393f", "#dd8549", "#e6e76a"]
  return(
    <svg className={styles.background} height={size} width={size}>
      <circle r={size/2} cx={size/2} cy={size/2} fill={colors[state % 3]} />
      <circle
        r={size/4}
        cx={size/2}
        cy={size/2}
        fill="transparent"
        stroke={colors[(state+1) % 3]}
        strokeWidth={size/2}
        strokeDasharray="50 100"
      />
      <circle
        r={size/4}
        cx={size/2}
        cy={size/2}
        fill="transparent"
        stroke={colors[(state+2) % 3]}
        strokeWidth={size/2}
        strokeDashoffset={50}
        strokeDasharray="50 100"
      />
    </svg>
  )
};


const PlinkoGameAnimation = ({
  connected,
  muteButtonClick,
  isMute,
  setSpins,
  isSynced,
  isLosing,
  volumeLevel,
  musicIndex,
  animationIndex,
  onInit,
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

  const backgRef = useRef(backg);
  backgRef.current = backg
  useEffect(()=>{
    if(backgroundRef) {
      setWidth(backgroundRef.current.clientWidth)
      setHeight(backgroundRef.current.clientHeight)
    }

  },[])

  const changeBackground = (count) => {
    setTimeout(() => {
      setBackg(backgRef.current === 2 ? 0 : backgRef.current + 1)
      count < 30 && changeBackground(count + 1)
    }, 100)
  }

  const handleWin = () => {
    setBackg(backgRef.current === 2 ? 0 : backgRef.current + 1)
    changeBackground(0)
  }

  const spin = async () => {
    const newspin = await AnimationController.spinTo();
    setSpins(newspin);
  };
  return (
    <div ref={backgroundRef} className={styles.animation}>
      <button onClick={() => setStart(true)} className={styles.button}>Start</button>
      <BackgroundPlinko state={backg} size={Math.min(width, height)*4} />
      {width && height && <Plinko start={start} setStart={setStart} onWin={handleWin} width={width} height={height} />}
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
