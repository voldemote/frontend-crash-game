import * as PIXI from 'pixi.js-legacy';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';
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
import { layoutManagerConfig, resourcesConfig, gameViewConfig } from "./configs/index.js";
import AnimationController from "../MinesGameAnimation/AnimationController";
import {getCurrentMines} from "../../api/casino-games";
import {AlertActions} from "../../store/actions/alert";

const gameConfigBase = {
  "name": "Minesweeper",
  "debuggerMode": true,
  "setGridManually": true,
  // basically it is a with of a square
  "gridSize": 380,
  "defaultGrid": {
    "minesAmount": 10,
    "columns": 5,
    "rows": 5
  },
  "grid": [
    [ 1, 1, 1, 1,1 ],
    [ 1, 1, -1, 1,1 ],
    [ -1, 1, 1, 1,-1 ],
    [ -1, -1, 1, 1,1 ],
    [ -1, 1, 1, 1,1 ]
  ],
  // applicable only for mobile devices, time in `ms`
  "timing": {
    "flagRequestTimeout": 10,
    "popupTimeout": 1000
  }
};

const RouletteGameAnimation = ({
  connected,
  muteButtonClick,
  setMines,
  mines,
  onInit,
  setBet,
  bet,
  setAmount,
  amount,
  gameInProgress,
  setGameInProgress
}) => {

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const cashedOut = useSelector(selectCashedOut);

  const [gameConfig, setGameConfig] = useState({});
  const [audio, setAudio] = useState(null);

  const cellClickHandler = (data) => {
    console.log('##ON CLICK CELL HANDLER', data);
  }

  const checkSelectedCell = (data) => {
    console.log('check selected cell', data);
  }

  useEffect(() => {
    console.log('[MINES] GET LAST CASHOUTS');
    getCurrentMines()
      .then(response => {
        const {data} = response;
        const configBase = _.cloneDeep(gameConfigBase);


        console.log('##data', data);
        if(data?.gameState === 1) {
          setGameInProgress(true);
          setMines(data?.minesCount);
          setAmount(data?.stakedAmount);
          setBet({pending: true});
        } else {
          setGameInProgress(false);
          // setBet({pending: false});
        }

        setGameConfig({
          ...gameConfigBase
        })
      }).catch(error => {
      dispatch(AlertActions.showError(error.message));
    });

  }, [])

  useEffect(()=> {
    let audioInstance = null;
    let instance = null;

    if(!_.isEmpty(gameConfig)) {
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
    }

  },[gameConfig])

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

      <canvas id="mines-game" className={styles.canvas} styles={bet.pending && {pointerEvents: 'none'}} ref={canvasRef}></canvas>

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
