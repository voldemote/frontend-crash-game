import {options} from 'components/EmailNotifications/options';
import {init} from 'store/sagas/websockets';

import * as PIXI from 'pixi.js-legacy';
import '@pixi/math-extras';
import '@pixi/sound';
import * as Sound from '@pixi/sound';

//game deps
import Game from "./game/index.js";
import {Application} from "./sources/extensions/index.js";
import {LayoutManager, ResourceLoader} from "./sources/libs/index.js";
import {applicationConfig} from "./configs";

let sectionsArray = [[0.5, 1.22, 1.25, 0.3, 2, 1.22, 0.5, 1.25, 1.5, 0.42, 0.5, 1.22],
  [0, 1.22, 1.5, 0.3, 2, 1.22, 0, 1.5, 2, 0.42, 0.5, 1.22],
  [0, 1.22, 1.5, 0.3, 2, 1.22, 0, 1.5, 2, 0.42, 0.5, 1.22],
  [0, 1.22, 0.75, 0, 3, 0.22, 0, 3, 1.75, 0.22, 0.5, 1.22],
  [0, 1.22, 0, 0, 4, 0.22, 0, 3, 2, 0.22, 0, 1.22],
  [0, 0.22, 0, 0, 5, 0, 0, 3, 2, 0.44, 0, 1.22],
  [0, 0.22, 0, 0, 7, 0, 0, 2, 2, 0.44, 0, 0.22]]

let riskImages = [
  '/images/roulette-game/1.svg',
  '/images/roulette-game/2.svg',
  '/images/roulette-game/3.svg',
  '/images/roulette-game/4.svg',
  '/images/roulette-game/5.svg',
  '/images/roulette-game/6.svg',
  '/images/roulette-game/7.svg',
];
let updateValues = [];
let numberSelected = 0;
let colors = ['#734b95', '#db4a8c', '#6ca9da', '#f5e272'];
let idle2 = true
PIXI.utils.skipHello();


export class AudioController {
  constructor(bgmIndex = 0) {
    let volume = 0.0;
    try {
      const savedVolume = localStorage.getItem('gameVolume');
      this.volume = savedVolume ? parseFloat(savedVolume) : volume;
    } catch (e) {
      this.volume = 0;
      console.error(e);
    }
    this.errors = [];
    this.bgmIndex = bgmIndex;
    this.elapsed = 0;
    this.ready = true;

    Sound.sound.add(
      {
        bgm: {
          url: '/sounds/roulette/wheel_bg.mp3',
          loop: true,
        },
        flying: {
          url: '/sounds/elon/flying.mp3',
          loop: true,
        },
        gameover: {
          url: '/sounds/elon/sfx_gameover.mp3',
          loop: false,
        },
        lose: {
          url: '/sounds/elon/sfx_lose.mp3',
          loop: false,
        },
        cashout: {
          url: '/sounds/elon/sfx_cashout3.mp3',
          loop: false,
        },
        placebet: {
          url: '/sounds/elon/sfx_placebet.mp3',
          loop: false,
        },
        tick: {
          url: '/sounds/roulette/sfx_tick.mp3',
          loop: false,
        }
      },
      {
        loaded: (err, data) => {
          if (err) {
            this.errors = [...this.errors, err];
          }
        },
        preload: true,
      }
    );
  }

  setVolume(volume = 1) {
    try {
      if (volume === 1 || volume === '1') {
        this.volume = 1.0;
      } else if (!volume) {
        this.volume = 0.0;
      } else {
        this.volume = volume;
      }
      localStorage.setItem('gameVolume', `${volume}`);
      Sound.sound.volume('bgm', volume);
    } catch (e) {
      console.error('Audio output error');
    }
  }

  mute() {
    localStorage.setItem('gameVolume', 0);
    this.setVolume(0);
  }

  setElapsed(elapsed) {
    this.elapsed = elapsed;
  }

  setBgmIndex(idx = 0) {
    this.bgmIndex = idx;
  }

  playSound(name, loop = false, volume) {
    try {
      if (this.ready) {
        Sound.sound.volume(name, volume && this.volume != 0 ? volume : this.volume === 0 ? '0.0' : this.volume);
        // Sound.sound.play(name, {
        //   loop: loop
        // });
      }
    } catch (e) {
      console.error('Audio output error');
    }
  }

  stopSound(name) {
    Sound.sound.stop(name);
  }

  startBgm() {
    const diff = this.elapsed / 1000;
    if (this.bgmIndex === 0) {
      this.playSound('bgm', true);
    }
  }

  stopBgm() {
    this.stopSound('bgm');
    this.stopSound('flying');
  }

  playTick() {
    this.playSound('tick', false, 1);
  }

  playGameOverSound() {
    this.playSound('gameover');
  }

  playLoseSound() {
    this.playSound('lose', false, 1);
  }

  playWinSound() {
    this.playSound('cashout', false, 1);

  }

  playBetSound() {
    this.playSound('placebet');
  }
}

class AnimationController {
  init(canvas, options) {
    const {gameConfig, layoutManagerConfig, applicationConfig, resourcesConfig, gameViewConfig} = options;
    this.canvas = canvas;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.audio = new AudioController(0);
    this.audio.startBgm();

    this.idle = true
    this.risk = options.risk
    this.amount = options.amount
    // let sections = sectionsArray[this.risk-1];
    /* Create an instance of game, initialize it and set game config */
    const game = new Game();
    game.initialize();
    game.useConfig({gameConfig, gameViewConfig});

    /* Create an instance of PIXI.Application. Use the game application config for it */
    const app = new Application(applicationConfig);

    let texture = PIXI.Texture.from(require('./assets/bg.png').default);
    let sprite1 = new PIXI.Sprite(texture);
    sprite1.scale.x = 0.3;
    sprite1.scale.y = 0.24;
    app.stage.addChild(sprite1);
    app.stage.addChild(game.controller.view);

    app.ticker.add(game.update, game);

    const updateCanvasSizes = ({width, height}) => {
      app.view.style.width = `${width}px`;
      app.view.style.height = `${height}px`;
    };

    const updateRenderSizes = ({width, height}) => {
      app.renderer.resize(width, height);
    };

    /* Use the layout manager config to set base sizes for the game and PIXI.Renderer canvas
       Subscribe on resize event */
    const layoutManager = new LayoutManager(layoutManagerConfig);
    layoutManager.on("resize", ({globalSizes, recalculatedSizes}) => {
      // updateCanvasSizes(globalSizes);
      // updateRenderSizes(recalculatedSizes);
      // game.resize(recalculatedSizes);
    });

    /* just for development mode */
    if (gameConfig.debuggerMode) {
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
          width: this.canvas.width,
          height: this.canvas.height
        };

        updateRenderSizes(sizes);
        updateCanvasSizes(sizes);
        game.resize(sizes);
      },
      (resPack) => {
        game.setResources(resPack);
      }
    );


    return {
      audio: this.audio,
      handle: this,
    };
  }

  destroy() {
    this.idle = false;
  }

  changeValues() {
    // var canvas = document.getElementById("canvas");
    // var context = canvas.getContext('2d');
    // context.clearRect(0, 0, canvas.width, canvas.height);
  }

  reinit(canvas, options) {
    // this.changeValues()
    this.risk = options.risk

    return {
      audio: this.audio,
      handle: this,
    };
  }

  //when calling repaint pass to the method the new index image from riskImages
  repaint(angle, play, idle) {
    // let sections = sectionsArray[this.risk-1]
  }
}

export default new AnimationController();
