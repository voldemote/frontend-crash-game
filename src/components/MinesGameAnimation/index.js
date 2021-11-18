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
import { RosiGameActions } from '../../store/actions/rosi-game';
import VolumeSlider from '../VolumeSlider';
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import AnimationController from './AnimationController';
import { isMobile } from 'react-device-detect';

const RouletteGameAnimation = ({
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
  const cashedOut = useSelector(selectCashedOut);

  const [running, setRunning] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let audioInstance = null;
    let instance = null;
    const { audio, handle } = AnimationController.init(canvasRef.current, {
      width: backgroundRef.current.clientWidth,
      height: backgroundRef.current.clientHeight,
      risk,
      amount
    });
    setAudio(audio);
    audioInstance = audio;
    instance = handle;
    onInit(audio);
    return () => {
      audioInstance.stopBgm();
      instance.destroy();
    }
  }, []);

  useEffect(() => {
    if(bet && !bet.pending && bet.ngame >= 0 && !running) spin(bet);
  }, [bet]);

  useEffect(() => {
    if (risk && amount) {
      AnimationController.reinit(canvasRef.current, {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        risk,
        amount: amount
      })
    }
  }, [risk, amount]);

  useEffect(() => {
    if (bet.amount) {
      AnimationController.reinit(canvasRef.current, {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        risk,
        amount: bet.amount
      })
    }else{
      AnimationController.reinit(canvasRef.current, {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        risk,
        amount: amount
      })
    }
  }, [bet.amount]);

  const spin = async () => {
    if (running) return;
    else setRunning(true);
    console.log("newspin1", bet.winIndex)
    const newspin = await AnimationController.spinTo(bet.winIndex);
    console.log("newspin", newspin)
    let prepareObj = {};
    if(bet.profit > 0) {
      prepareObj = {
        type: 'win',
        value: '+' + bet.profit
      };
    } else {
      prepareObj = {
        type: 'loss',
        value: bet.profit
      };
    }
    setSpins(prepareObj);
    setRunning(false);
    setBet({pending: true, amount: bet.amount, profit: bet.profit});
  }

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      {/*<div className={styles.audioControls}>*/}
      {/*  {audio && <GameAudioControlsLocal audio={audio} muteButtonClick={muteButtonClick}/>}*/}
      {/*</div>*/}

      <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>


    </div>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected
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
