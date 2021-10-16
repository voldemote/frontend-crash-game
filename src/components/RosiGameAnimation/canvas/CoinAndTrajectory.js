import { ROSI_GAME_MAX_DURATION_SEC } from 'constants/RosiGame';
import * as PIXI from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import { calcPercent, isMobileRosiGame } from './utils';
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

    const spritesheet =
      this.app.loader.resources['elon-coin-animation'].spritesheet;
    this.elon = new PIXI.AnimatedSprite(Object.values(spritesheet.textures));
    this.elon.x = -92 / (isMobileRosiGame ? 2 : 1);
    this.elon.y = -111 / (isMobileRosiGame ? 2 : 1);
    this.elonAndCoin.addChild(this.elon);

    this.elonAndCoindAnimationHandle = null;
    this.elonAfterExplosionAnimationHandle = null;

    this.setCoinDefaultPosition();

    this.container.visible = false;

    this.boundary = {
      x0: 0,
      x1: calcPercent(this.app.renderer.width, 90),
      y0: calcPercent(this.app.renderer.height, 82),
      y1: calcPercent(this.app.renderer.height, 20),
    };

    this.trajectoryAngle = Math.atan2(
      this.boundary.y0 - this.boundary.y1,
      this.boundary.x1 - this.boundary.x0,
      0
    );

    /* Particle (flame) */
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

    /* TODO: move to  utils */
    this.getGlobalPositionByTime = time => {
      // global {x, y}
      const a = this.app.renderer.width * 8;
      const x = Math.sqrt(time * a);
      const y = time * time * 0.005 + time * 0.2;
      return { x, y };
    };

    this.getTime = (rX, scaleX) => {
      const a = this.app.renderer.width * 8;
      const x = (rX - this.boundary.x0) / scaleX;
      const time = (x * x) / a;
      return time;
    };

    this.getRealPosition = gPos => {
      const { x, y } = gPos; // global {x, y}
      const dX = this.boundary.x1 - this.boundary.x0;
      const dY = this.boundary.y0 - this.boundary.y1;

      const scaleX = x > dX ? dX / x : 1;
      const scaleY = y > dY ? dY / y : 1;

      return this.getRealPositionByScale(gPos, { scaleX, scaleY });
    };

    this.getRealPositionByScale = (gPos, scale) => {
      const { x, y } = gPos; // global {x, y}
      const { scaleX, scaleY } = scale;

      const rX = x * scaleX + this.boundary.x0;
      const rY = -y * scaleY + this.boundary.y0;

      return {
        x: rX,
        y: rY,
        scaleX,
        scaleY,
      };
    };
  }

  getCurrentElonFrame() {
    return this.elon.currentFrame;
  }

  getElonFramesCount() {
    return this.elon.totalFrames;
  }

  setElonFrame(frame) {
    if (frame <= this.elon.totalFrames) {
      this.elon.gotoAndStop(frame);
    }
  }

  setCoinDefaultPosition() {
    this.elonAndCoin.scale.set(1);
    this.elonAndCoin.x = 0;
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

  canUpdateElonFrame() {
    return true; // TODO: consider further
  }

  startCoinFlyingAnimation() {
    this.container.visible = true;
    this.resetAllAnimations();
    this.setCoinDefaultPosition();

    /* Star Particle (flame) */
    this.flameEmitter.emit = true;

    /* Coin and Elon */
    let time = 0;
    /* Trajectory */
    let randYArray = Array(this.app.renderer.width + 1)
      .fill()
      .map(() => null); // trajectory path: traPath[rX] = rY

    const firstPos = this.getRealPosition({ x: 0, y: 0 });
    let prevPos = firstPos;

    const update = dt => {
      time += dt;

      const gPos = this.getGlobalPositionByTime(time);
      const rPos = this.getRealPosition(gPos);

      this.elonAndCoin.x = rPos.x;
      this.elonAndCoin.y = rPos.y;
      this.flameEmitter.updateOwnerPos(
        this.elonAndCoin.x,
        this.elonAndCoin.y + 50
      ); // set flame

      this.flameEmitter.rotate(Math.PI * 1.5 * Math.max(rPos.scaleX, 0.965)); // TODO: particle direction

      // Draw trajectory path
      const offsetY = 60;
      this.trajectory.clear();
      this.trajectory.lineStyle(2, 0x7300d8, 1);
      this.trajectory.moveTo(firstPos.x, firstPos.y + offsetY);
      const randEtries = Object.entries(randYArray);
      randEtries.forEach(e => {
        const t = this.getTime(e[0], prevPos.scaleX);
        const gP = this.getGlobalPositionByTime(t);

        if (e[1] !== null) {
          const rP = this.getRealPositionByScale(
            { x: gP.x, y: gP.y + e[1] * 1 },
            rPos
          );
          this.trajectory.lineTo(rP.x, rP.y + offsetY);
          randYArray[Math.floor(rP.x)] = e[1];
        } else {
          const rP = this.getRealPositionByScale({ x: gP.x, y: gP.y }, rPos);
          randYArray[Math.round(rP.x)] = null;
        }
      });
      randYArray[Math.floor(rPos.x)] =
        (Math.random() - 0.5) * 2 +
        Math.sin(time * 50) * (2.5 / Math.min(rPos.scaleX, rPos.scaleY));

      prevPos = rPos;
    };

    this.elonAndCoindAnimationHandle = update;
    this.app.ticker.add(update);
  }

  endCoinFlyingAnimation() {
    this.flameEmitter.emit = false;

    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

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

    this.coin.alpha = 1;
    this.elon.alpha = 1;
    this.elonAndCoin.rotation = 0;
    this.elon.gotoAndStop(0);

    this.flameEmitter.emit = false;

    this.trajectory.clear();
  }

  isBoostAnimComplete() {
    return this.initialBoostAnimationComplete === true;
  }
}
