import * as PIXI from 'pixi.js-legacy';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
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
import {AlertActions} from "../../store/actions/alert";
import { selectUser } from '../../store/selectors/authentication';

const gameConfigBase = {
  "name": "Minesweeper",
  "debuggerMode": true,
  "setGridManually": true,
  // basically it is a with of a square
  "gridSize": 380,
  "defaultGrid": {
    "minesAmount": 5,
    "columns": 5,
    "rows": 5
  },
  "grid": [
    [ 1, 1, 1, 1,1 ],
    [ 1, 1, 1, 1,1 ],
    [ 1, 1, 1, 1,1 ],
    [ 1, 1, 1, 1,1 ],
    [ 1, 1, 1, 1,1 ]
  ],
  // applicable only for mobile devices, time in `ms`
  "timing": {
    "flagRequestTimeout": 10,
    "popupTimeout": 1000
  },
  initialReveal: []
};

let GAME = null;

const MinesGameAnimation = ({
  connected,
  muteButtonClick,
  setMines,
  mines,
  onInit,
  onEnd,
  setBet,
  bet,
  setAmount,
  amount,
  gameInProgress,
  setGameInProgress,
  gameApi,
  setCurrentStep,
  setCashouts,
  cashouts,
  currentStep,
  gameOver,
  setGameOver
}) => {


  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const user = useSelector(selectUser);

  const [gameConfig, setGameConfig] = useState({});
  const [audio, setAudio] = useState(null);

  const getTranslatedReveal = (clientBoard) => {
      let col = 0;
      let row = 0;

      const toReveal = clientBoard?.map((entry, index)=> {
        if(index % 5 === 0) {
          row++;
          col = 0;
        }

        const item = {
          row: row-1,
          col: col,
          isMine: false,
          isRevealed: entry === 0 ? true : false,
          isEmpty: true,
          isFlagged: false,
          text: ""
        };
        col++;

        return item;
      }).filter((entry)=> {
        return entry.isRevealed;
      });

    return toReveal;
  }

  const cellClickHandler = (data) => {
    setCurrentStep((current)=> {
      return current+1;
    })
  }

  //get position in proper notation 5*5
  const getCellPosition = (row,col) => {
    return ((row * 5) + col);
  }

  const checkSelectedCell = async (props) => {
    const {row, col} = props;

    const queryPayload = {
      position: getCellPosition(row, col) //0-24
    }

    if(user.isLoggedIn) {
      const checkMine = await gameApi.checkCellMines(queryPayload).catch((err)=> {
        dispatch(AlertActions.showError(err.message));
      });

      const isMine = checkMine.data.result === 0 ? false : true;

      if(isMine) {
        handleLost()
      }

      return {
        col,
        row,
        isEmpty: true,
        isFlagged: false,
        isMine,
        isRevealed: true,
        text: ""
      }
    } else {
      //handle demo
      return null;
    }
  }

  const handleLost = () => {
    setCashouts([{
      type: 'loss',
      value: '-' + amount
    }, ...cashouts]);
    setGameInProgress(false);
    setBet({
      pending: false,
      done: false
    });
    setCurrentStep(0);
  }

  useEffect(() => {
    const configBase = _.cloneDeep(gameConfigBase);
    configBase.isLoggedIn = user.isLoggedIn;

    if(user.isLoggedIn) {
      gameApi.getCurrentMines()
        .then(response => {
          const {data} = response;
          const {game_payload} = data;

          if(data?._inProgress) {
            setGameInProgress(true);
            setBet({
              pending: false,
              done: true
            });
            _.set(configBase, 'initialReveal', getTranslatedReveal(game_payload.clientBoard));
          } else {
            setGameInProgress(false);
          }

          setGameConfig({
            ...configBase
          })
        }).catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
    } else {
      //init demo rounds

      configBase.setGridManually = false;

      setGameConfig({
        ...configBase
      })

      setBet({
        pending: false,
        done: true
      });
    }


  }, [])

  useEffect(()=> {
    let audioInstance = null;

    if(!_.isEmpty(gameConfig)) {
      const applicationConfig = {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        "antialias": false,
        "backgroundColor": 0xffffff,
        view: canvasRef.current
      }
      const { audio, that } = AnimationController.init(canvasRef.current, {
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
      GAME = that.game;
      setAudio(audio);
      audioInstance = audio;
      onInit(audio);

      return () => {
        audioInstance.stopBgm();
        that.destroy();
      }
    }

  },[gameConfig])


  useEffect(()=> {
    if(gameOver) {
      GAME.controller.view.gameOver("win");
      setGameOver(false);
    }
  },[gameOver])

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile,
        !bet.done && styles.notClickable
      )}
    >
      <div className={styles.audioControls}>
        {audio && <GameAudioControlsLocal audio={audio} muteButtonClick={muteButtonClick}/>}
      </div>

      <canvas className={styles.canvas} ref={canvasRef}></canvas>

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
)(React.memo(MinesGameAnimation));
