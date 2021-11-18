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
import VolumeSlider from '../VolumeSlider';
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import { isMobile } from 'react-device-detect';
import { gameConfig, layoutManagerConfig, applicationConfig, resourcesConfig, gameViewConfig } from "./configs/index.js";
import { LayoutManager, ResourceLoader } from "./sources/libs/index.js";
import { Application } from "./sources/extensions/index.js";
import Game from "./game/index.js";

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
    console.log('init game');
    /* Create an instance of game, initialize it and set game config */
    const game = new Game();
    game.initialize();
    game.useConfig({gameConfig, gameViewConfig});

    console.log('backgroundRef.current.clientWidth', backgroundRef.current.clientWidth);

    const initialAppCfg = {
      width: backgroundRef.current.clientWidth,
      height: backgroundRef.current.clientHeight,
      "antialias": false,
      "backgroundColor": 0xffffff,
      view: canvasRef.current
    }

    /* Create an instance of PIXI.Application. Use the game application config for it */
    const app = new Application(initialAppCfg);

    let texture = PIXI.Texture.from('./assets/bg.png');
    let sprite1 = new PIXI.Sprite(texture);
    sprite1.scale.x = 0.7;
    sprite1.scale.y=0.47;
    app.stage.addChild(sprite1);
    app.stage.addChild(game.controller.view);

    app.ticker.add(game.update, game);

    // document.body.appendChild(app.view);

    const updateCanvasSizes = ({ width, height }) => {
      app.view.style.width = `${width}px`;
      app.view.style.height = `${height}px`;
    };

    const updateRenderSizes = ({ width, height }) => {
      app.renderer.resize(width, height);
    };

    /* Use the layout manager config to set base sizes for the game and PIXI.Renderer canvas
       Subscribe on resize event */
    const layoutManager = new LayoutManager(layoutManagerConfig);
    layoutManager.on("resize", ({ globalSizes, recalculatedSizes }) => {
      // updateCanvasSizes(globalSizes);
      updateRenderSizes(recalculatedSizes);
      game.resize(recalculatedSizes);
    });

    /* just for development mode */
    if(gameConfig.debuggerMode){
      window.game = {
        controller: game.controller,
        pixiStage: app.stage,
        layoutManager
      };
    }

    /* Use the resources config to add all assets data to a loader. */
    const loader = new ResourceLoader();
    loader.resPackages = resourcesConfig;

    /* Run loader and after it has loaded all assets, run the game */
    loader.runLoader(
      () => {
        game.run();
        const sizes = {
          width: initialAppCfg.width,
          height: initialAppCfg.height
        };
        updateRenderSizes(sizes)
      },
      (resPack) => {
        game.setResources(resPack);
      }
    );

  }, []);

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
