import * as PIXI from 'pixi.js';

export class CoinAnimation {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    this.trajectory = new PIXI.Graphics();
    this.container.addChild(this.trajectory);

    this.elonAndCoin = new PIXI.Container();
    this.container.addChild(this.elonAndCoin);

    this.coin = new PIXI.Sprite(this.app.loader.resources.coin.texture);
    this.coin.scale.set(0.8);
    this.elonAndCoin.addChild(this.coin);

    this.elon = new PIXI.Sprite(this.app.loader.resources.elonmusk.texture);
    this.elon.scale.set(0.29);
    this.elon.x -= 20;
    this.elon.y -= 90;
    this.elonAndCoin.addChild(this.elon);

    this.elonAndCoindAnimationHandle = null;
    this.elonAfterExplosionAnimationHandle = null;

    this.setCoinDefaultPosition();
  }

  setCoinDefaultPosition() {
    this.elonAndCoin.scale.set(1);
    this.elonAndCoin.x = -this.elonAndCoin.width;
    this.elonAndCoin.y = this.app.renderer.height - this.coin.height / 2;
  }

  getCoinExplosionPosition() {
    const coinGlobalPos = this.coin.toGlobal(this.coin.position);
    return {
      x: coinGlobalPos.x + this.coin.width / 2,
      y: coinGlobalPos.y + this.coin.height / 2,
    };
  }

  startCoinFlyingAnimation() {
    this.resetAllAnimations();
    this.setCoinDefaultPosition();

    /* Coin and Elon */
    const destX = this.app.renderer.width - 180;
    const destY = 100;
    const distanceX = destX - this.elonAndCoin.x;
    const distanceY = destY - this.elonAndCoin.y;
    const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const vx = distanceX / length;
    const vy = distanceY / length;
    let speed = 1.5;
    let acceleration = 6;

    let x = -40;
    let y = this.app.renderer.height - 20;

    // save for later elon flying animation after coin explosion
    this.elonAndCoin.vx = vx;
    this.elonAndCoin.vy = vy;
    this.elonAndCoin.speed = speed;

    const update = dt => {
      if (this.elonAndCoin.x < destX || this.elonAndCoin.y > destY) {
        this.elonAndCoin.x += vx * acceleration * speed * dt;
        this.elonAndCoin.y += vy * acceleration * speed * dt;
      }

      let prev_x = x;
      let prev_y = y;
      x += vx * acceleration * speed * dt;
      y += vy * acceleration * speed * dt;

      this.trajectory.lineStyle(2, 0x7300d8, 1);
      this.trajectory.moveTo(prev_x, prev_y);
      this.trajectory.lineTo(x, y);

      if (this.elonAndCoin.x > destX - 150 && speed > 0) {
        speed -= 0.05 * dt;
      }

      if (acceleration > 1) {
        acceleration -= 0.1 * dt;
      }
    };

    this.elonAndCoindAnimationHandle = update;
    this.app.ticker.add(update);
  }

  endCoinFlyingAnimation() {
    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    this.trajectory.clear();
    this.coin.alpha = 0;
  }

  startElonAfterExplosionAnimation() {
    const rotationSpeed = 0.005;
    // for the sake of simplicty animate elonAndCoin container instead of just elon
    // coin is hidden anyway and positions are already being reset before next animation
    const update = dt => {
      this.elonAndCoin.rotation += rotationSpeed * dt;
      this.elonAndCoin.x += this.elonAndCoin.vx * this.elonAndCoin.speed * dt;
      this.elonAndCoin.y += this.elonAndCoin.vy * this.elonAndCoin.speed * dt;
    };

    this.elonAfterExplosionAnimationHandle = update;
    this.app.ticker.add(update);
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
    this.elonAndCoin.rotation = 0;
    this.trajectory.clear();
  }
}
