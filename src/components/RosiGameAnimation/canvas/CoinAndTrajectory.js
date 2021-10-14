import * as PIXI from 'pixi.js';
import { calcPercent, isMobileRosiGame } from './utils';
import TWEEN from '@tweenjs/tween.js';
import * as particles from '@pixi/particle-emitter';
export class CoinAnimation {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    this.trajectory = new PIXI.Graphics();
    this.container.addChild(this.trajectory);

    this.elonAndCoin = new PIXI.Container();
    this.container.addChild(this.elonAndCoin);

    this.coin = new PIXI.Sprite(this.app.loader.resources.coin.texture);
    this.elonAndCoin.addChild(this.coin);

    this.destX = calcPercent(this.app.renderer.width, 85);
    this.destY = calcPercent(this.app.renderer.height, 28);
    this.trajectoryDestX = this.destX;
    this.trajectoryDestY = this.destY + this.coin.height * 0.6;
    this.trajectoryAngle = Math.atan2(
      this.app.renderer.height - this.trajectoryDestY,
      this.trajectoryDestX,
      0
    );

    const spritesheet =
      this.app.loader.resources['elon-coin-animation'].spritesheet;
    this.elon = new PIXI.AnimatedSprite(Object.values(spritesheet.textures));
    this.elon.x = -92 / (isMobileRosiGame ? 2 : 1);
    this.elon.y = -111 / (isMobileRosiGame ? 2 : 1);
    this.elon.gotoAndStop(4);
    this.elonAndCoin.addChild(this.elon);

    this.elonAndCoindAnimationHandle = null;
    this.elonAfterExplosionAnimationHandle = null;

    this.setCoinDefaultPosition();

    this.container.visible = false;

    this.initialBoostAnimationComplete = false;
    this.trajectoryCurrentX = 0;

    // particle
    this.flameEmitter = new particles.Emitter(this.container, {
      lifetime: {
        min: 0.3,
        max: 0.75,
      },
      frequency: 0.0004,
      spawnChance: 0.05,
      emitterLifetime: 0,
      maxParticles: 1000,
      addAtBack: false,
      pos: {
        x: 0,
        y: 0,
      },
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                {
                  time: 0,
                  value: 1,
                },
                {
                  time: 1,
                  value: 0,
                },
              ],
            },
          },
        },
        {
          type: 'moveSpeedStatic',
          config: {
            min: 300,
            max: 500,
          },
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 0.25,
                },
                {
                  time: 1,
                  value: 0.55,
                },
              ],
            },
            minMult: 1,
          },
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: 'ffff91',
                },
                {
                  time: 1,
                  value: 'ffffff',
                },
              ],
            },
          },
        },
        {
          type: 'rotation',
          config: {
            accel: 0,
            minSpeed: 50,
            maxSpeed: 50,
            minStart: 265,
            maxStart: 275,
          },
        },
        {
          type: 'textureRandom',
          config: {
            textures: [
              this.app.loader.resources.star1.texture,
              this.app.loader.resources.star2.texture,
              this.app.loader.resources.particle.texture,
            ],
          },
        },
        {
          type: 'spawnShape',
          config: {
            type: 'torus',
            data: {
              x: 0,
              y: 0,
              radius: 30, // TODO: depends on the coin size
              innerRadius: 0,
              affectRotation: false,
            },
          },
        },
      ],
    });

    this.flameElapsed = Date.now();
    this.flameEmitter.rotate(Math.PI * 1.5);

    const flameUpdate = () => {
      requestAnimationFrame(flameUpdate);
      var now = Date.now();
      this.flameEmitter.update((now - this.flameElapsed) * 0.001);
      this.flameElapsed = now;
    };
    this.flameEmitter.emit = true;
    flameUpdate();
  }

  getCurrentElonFrame() {
    return this.elon.currentFrame;
  }

  getElonFramesCount() {
    return this.elon.totalFrames;
  }

  setElonFrame(frame) {
    if (frame <= this.elon.totalFrames && this.elon.currentFrame !== frame) {
      this.elon.gotoAndStop(frame);
    }
  }

  canUpdateElonFrame() {
    return this.initialBoostAnimationComplete;
  }

  setCoinDefaultPosition() {
    this.elonAndCoin.scale.set(1);
    this.elonAndCoin.x = -this.elonAndCoin.width / 2;
    this.elonAndCoin.y = this.app.renderer.height - this.coin.height / 2;
  }

  getCoinExplosionPosition() {
    const coinGlobalPos = this.coin.toGlobal(this.coin.position);
    return {
      x: coinGlobalPos.x + this.coin.width / 2,
      y: coinGlobalPos.y + this.coin.height / 2,
    };
  }

  getCoinCrashPosition() {
    const coinGlobalPos = this.coin.toGlobal(this.coin.position);
    return {
      x: coinGlobalPos.x,
      y: coinGlobalPos.y + this.coin.height / 2,
    };
  }

  startCoinFlyingAnimation() {
    this.setElonFrame(4);
    this.initialBoostAnimationComplete = false;
    this.container.visible = true;
    this.resetAllAnimations();
    this.setCoinDefaultPosition();
    // flame starts
    this.flameEmitter.emit = true;

    const easing = TWEEN.Easing.Quintic.Out;
    const interpolation = TWEEN.Interpolation.Linear;
    const time = 1500;

    // move elonAndCoin
    const coinTweenData = { x: 0, y: this.app.renderer.height };
    new TWEEN.Tween(coinTweenData)
      .to({ x: this.destX, y: this.destY }, time)
      .easing(easing)
      .onUpdate(() => {
        this.elonAndCoin.x = coinTweenData.x;
        this.elonAndCoin.y = coinTweenData.y;

        // flame follows
        this.flameEmitter.updateOwnerPos(
          this.elonAndCoin.x,
          this.elonAndCoin.y + 50
        );

        const percentComplete = (coinTweenData.x * 100) / this.destX;
        if (percentComplete >= 98) {
          this.initialBoostAnimationComplete = true;
        }
      })
      .onComplete(() => {
        this.initialBoostAnimationComplete = true;
      })
      .interpolation(interpolation)
      .start();

    const lineTweenData = { x: coinTweenData.x, y: coinTweenData.y };
    let prevX = lineTweenData.x;
    let prevY = lineTweenData.y;

    // draw line
    this.drawLineTween = new TWEEN.Tween(lineTweenData)
      .to({ x: this.trajectoryDestX, y: this.trajectoryDestY }, time)
      .easing(easing)
      .interpolation(interpolation)
      .onStart(() => {
        const lineWidth = 2;
        this.trajectory.lineStyle(lineWidth, 0x7300d8, 1);
        this.trajectoryCurrentX = lineTweenData.x;
      })
      .onUpdate(() => {
        this.trajectory.moveTo(prevX, prevY);
        this.trajectory.lineTo(lineTweenData.x, lineTweenData.y);

        prevX = lineTweenData.x;
        prevY = lineTweenData.y;

        this.trajectoryCurrentX = lineTweenData.x;
      })
      .start();
  }

  endCoinFlyingAnimation() {
    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    if (this.drawLineTween) {
      this.drawLineTween.stop();
      this.drawLineTween = null;
    }

    // flame ends
    this.flameEmitter.emit = false;

    this.coin.alpha = 0;
    this.elon.alpha = 0;
  }

  resetAllAnimations() {
    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    if (this.elonAfterExplosionAnimationHandle) {
      this.app.ticker.remove(this.elonAfterExplosionAnimationHandle);
      this.elonAfterExplosionAnimationHandle = null;
    }

    this.initialBoostAnimationComplete = false;
    this.coin.alpha = 1;
    this.elon.alpha = 1;
    this.elonAndCoin.rotation = 0;
    this.trajectory.clear();
  }

  isBoostAnimComplete() {
    return this.initialBoostAnimationComplete === true;
  }
}
