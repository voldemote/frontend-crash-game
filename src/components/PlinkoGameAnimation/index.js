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

const BackgroundPlinko = ({ reference, children }) => (
  <div className={styles.animation} ref={reference}>
  	<div className={styles.sector} style={{transform: 'rotate(75deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(105deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(135deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(165deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(195deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(225deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(255deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(285deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(315deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(345deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(375deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(405deg) skew(60deg)'}}></div>
    <div className={styles.sector} style={{transform: 'rotate(435deg) skew(60deg)'}}></div>
    {children}
  </div>
);

/*
const GameOffline = () => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Connecting to the game engine</h2>
      <div className={styles.description}>
        If this takes too long, try reloading the page
      </div>
    </div>
  </div>
);
*/

const RouletteGameAnimation = ({
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

  useEffect(()=>{
    if(backgroundRef) {
      setWidth(backgroundRef.current.clientWidth)
      setHeight(backgroundRef.current.clientHeight)
    }

  },[])

  const spin = async () => {
    const newspin = await AnimationController.spinTo();
    setSpins(newspin);
  };
  return (
    <BackgroundPlinko reference={backgroundRef}>
      {width && height && <Stage width={width} height={height}></Stage>}
    </BackgroundPlinko>
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
      dispatch(RouletteGameAnimation.muteButtonClick());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouletteGameAnimation);
