import * as PIXI from 'pixi.js-legacy';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
  selectNextGameAt,
} from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import { RosiGameActions } from '../../store/actions/rosi-game';
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import { isMobile } from 'react-device-detect';
import { gameConfig, layoutManagerConfig, resourcesConfig, gameViewConfig } from "./configs/index.js";
import AnimationController from "../MinesGameAnimation/AnimationController";

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

  const cellClickHandler = (data) => {
    console.log('##ON CLICK CELL HANDLER', data);
  }

  const checkSelectedCell = (data) => {
    console.log('check selected cell', data);
  }

  useEffect(()=> {
    let audioInstance = null;
    let instance = null;
    const applicationConfig = {
      width: backgroundRef.current.clientWidth,
      height: backgroundRef.current.clientHeight,
      "antialias": false,
      "backgroundColor": 0xffffff,
      view: canvasRef.current
    }
    const { audio, handle } = AnimationController.init(canvasRef.current, {
      width: applicationConfig.width,
      height: applicationConfig.height,
      gameConfig,
      layoutManagerConfig,
      applicationConfig,
      resourcesConfig,
      gameViewConfig,
      amount,
      cellClickHandler,
      checkSelectedCell
    });
    setAudio(audio);
    audioInstance = audio;
    instance = handle;
    onInit(audio);
    return () => {
      audioInstance.stopBgm();
      instance.destroy();
    }
  },[])

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      <div className={styles.audioControls}>
        {audio && <GameAudioControlsLocal audio={audio} muteButtonClick={muteButtonClick}/>}
      </div>

      <canvas id="mines-game" className={styles.canvas} ref={canvasRef}></canvas>

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
