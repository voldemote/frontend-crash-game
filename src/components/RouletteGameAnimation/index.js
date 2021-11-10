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
import GameAudioControls from '../GameAudioControls';
import AnimationController from './AnimationController';
import { isMobile } from 'react-device-detect';

/*
const PreparingRound = ({ nextGameAt }) => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Preparing Round</h2>
      <div className={styles.description}>
        <span>
          Starting in <Counter className={styles.counter} from={nextGameAt} />
        </span>
      </div>
    </div>
  </div>
);

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
  spins,
  setSpins,
  amount,
  isSynced,
  isLosing,
  volumeLevel,
  musicIndex,
  animationIndex,
  onInit,
  risk,
  setBet,
  bet,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  //const lastCrashValue = useSelector(selectLastCrash);
  const cashedOut = useSelector(selectCashedOut);
  //const nextGameAtTimeStamp = useSelector(selectNextGameAt);

  const [running, setRunning] = useState(false);
  //const [isAnimationReady, setAnimationReady] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let audioInstance = null;
    const { audio } = AnimationController.init(canvasRef.current, {
      width: backgroundRef.current.clientWidth,
      height: backgroundRef.current.clientHeight,
      risk,
      amount
    });
    setAudio(audio);
    audioInstance = audio;
    onInit(audio);
    AnimationController.repaint(0, risk);
    return () => audioInstance.stopBgm();
  }, []);

  useEffect(() => {
    if(bet && !bet.pending && bet.nspin >= 0 && !running) spin(bet);
  }, [bet]);

  useEffect(() => {
    if (risk && amount) {
      AnimationController.changeValues();
      AnimationController.reinit(canvasRef.current, {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        risk,
        amount: amount!==undefined? amount: 50
      }, risk);
      AnimationController.repaint(0, risk);
    }
  }, [risk, amount]);

  const spin = async () => {
    if (running) return;
    else setRunning(true);
    const newspin = await AnimationController.spinTo(bet.winIndex);
    setSpins(newspin);
    setRunning(false);
    setBet({pending: true});
  }
/*
  const multipleSpin = async bet => {
    let i = bet.nspin,
      newpsins = [];
    do {
      setRunning(true);
      const newspin = await AnimationController.spinTo();
      //newpsins.push(newspin)
      setSpins(newspin);
      i--;
    } while (i !== 0);
    setBet(null);
    setRunning(false);
  }*/

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      <div className={styles.audioControls}>
        {audio && (
          <GameAudioControls audio={audio} muteButtonClick={muteButtonClick} />
        )}
      </div>
      <canvas id = "canvas" className={styles.canvas} ref={canvasRef}></canvas>
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
      dispatch(RosiGameActions.muteButtonClick());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouletteGameAnimation);
