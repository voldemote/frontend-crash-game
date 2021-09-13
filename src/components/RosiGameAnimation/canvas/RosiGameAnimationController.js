import * as PIXI from 'pixi.js';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';
import CoinExplosion from './CoinExplosion';

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
      resolution: 1,
      antialias: true,
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

    this.coinExplosion = new CoinExplosion(this.app);
    this.app.stage.addChild(this.coinExplosion.container);

    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.app.stage.addChild(this.coinAndTrajectory.container);
  }

  start() {
    this.coinAndTrajectory.startCoinFlyingAnimation();
  }

  end() {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.coinAndTrajectory.endCoinFlyingAnimation();
    this.coinAndTrajectory.startElonAfterExplosionAnimation();
  }
}

export default new RosiAnimationController();
