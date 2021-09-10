import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

export class CoinAnimation {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    this.trajectory = new PIXI.Graphics();
    this.container.addChild(this.trajectory);

    this.elonAndCoin = new PIXI.Container();
    this.elonAndCoin.x = 200;
    this.elonAndCoin.y = 150;
    this.container.addChild(this.elonAndCoin);

    this.coin = new PIXI.Sprite(this.app.loader.resources.coin.texture);
    this.coin.scale.set(0.8);
    this.elonAndCoin.addChild(this.coin);

    this.elon = new PIXI.Sprite(this.app.loader.resources.elonmusk.texture);
    this.elon.scale.set(0.29);
    this.elon.x -= 20;
    this.elon.y -= 90;
    this.elonAndCoin.addChild(this.elon);

    this.setCoinDefaultPosition();
  }

  setCoinDefaultPosition() {
    this.elonAndCoin.scale.set(1);
    this.elonAndCoin.x = -this.elonAndCoin.width;
    this.elonAndCoin.y = this.app.renderer.height - this.coin.height / 2;
  }

  startAnimation() {
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

    const update = dt => {
      if (this.elonAndCoin.x < destX || this.elonAndCoin.y > destY) {
        this.elonAndCoin.x += vx * acceleration * speed * dt;
        this.elonAndCoin.y += vy * acceleration * speed * dt;
      }

      let prev_x = x;
      let prev_y = y;
      x += vx * acceleration * speed * dt;
      y += vy * acceleration * speed * dt;

      // console.log(`x: ${x}, y: ${y}, prev_x: ${prev_x}, prev_y: ${prev_y}`);

      this.trajectory.lineStyle(2, 0x7300d8, 1);
      // graphics.moveTo(0, 0);
      // graphics.lineTo(200, 200);
      this.trajectory.moveTo(prev_x, prev_y);
      this.trajectory.lineTo(x, y);

      if (this.elonAndCoin.x > destX - 150 && speed >= 0) {
        speed -= 0.05 * dt;
      }

      if (acceleration > 1) {
        acceleration -= 0.1 * dt;
      }
    };

    this.elonAndCoindAnimationHandle = update;
    this.app.ticker.add(update);
  }

  endAnimation() {
    this.app.ticker.remove(this.elonAndCoindAnimationHandle);

    this.trajectory.clear();

    const scale = { x: this.elonAndCoin.scale.x, y: this.elonAndCoin.scale.y };
    const tween = new TWEEN.Tween(scale)
      .to({ x: 0, y: 0 }, 400)
      .easing(TWEEN.Easing.Back.In)
      .onUpdate(() => {
        this.elonAndCoin.scale.x = scale.x;
        this.elonAndCoin.scale.y = scale.y;
      })
      .start();
  }
}
