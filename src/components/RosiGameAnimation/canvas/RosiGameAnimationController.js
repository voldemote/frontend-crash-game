import * as PIXI from 'pixi.js';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';

// hide PIXI welcome messege in console
PIXI.utils.skipHello();

function loadAssets(loader) {
  loader
    .add('coin', '/images/rosi-game/coin.png')
    .add('elonmusk', '/images/rosi-game/elonmusk.png')
    .add('redPlanet', '/images/rosi-game/redPlanet.png')
    .add('purplePlanet', '/images/rosi-game/purplePlanet.png')
    .add('star1', '/images/rosi-game/star1.png')
    .add('star2', '/images/rosi-game/star2.png');

  loader.load();

  return new Promise(resolve => {
    loader.onComplete.add(resolve);
  });
}

class RosiAnimationController {
  init(canvas) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: window.devicePixelRatio >= 2 ? 2 : 1,
    });

    this.app.ticker.add(() => {
      TWEEN.update(this.app.ticker.lastTime);
    });
  }

  load(done) {
    loadAssets(this.app.loader).then(() => {
      if (done) {
        this.drawElements();
        done();
      }
    });
  }

  drawElements() {
    this.background = new RosiAnimationBackground(this.app);
    this.background.startAnimation();
    this.app.stage.addChild(this.background.container);

    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.app.stage.addChild(this.coinAndTrajectory.container);
  }

  start() {
    this.coinAndTrajectory.startAnimation();
    // this.background.startAnimation();
  }

  end() {
    this.coinAndTrajectory.endAnimation();
  }
}

export default new RosiAnimationController();
