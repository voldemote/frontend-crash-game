import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import { isMobileRosiGame, calcPercent, getRandomInRange } from './utils';

class RosiAnimationBackground {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    // dark circle shade on the background
    this.circle = new PIXI.Graphics();
    this.drawCircle();
    this.container.addChild(this.circle);

    this.stars = [];
    this.createStars();

    this.redPlanet = null;
    this.purplePlanet = null;
    this.createPlanets();
  }

  createStars() {
    const segmentWidth = isMobileRosiGame ? 50 : 150;
    const segmentsCount =
      Math.trunc(this.app.renderer.width / segmentWidth) + 1;

    for (let i = 0; i < segmentsCount; i++) {
      const starTexture =
        Math.random() > 0.92
          ? this.app.loader.resources.star1.texture
          : this.app.loader.resources.star2.texture;

      const starPosOffset = 10; // it looks weird if stars start from exactly 0 coordinate
      const star = new PIXI.Sprite(starTexture);
      star.x = starPosOffset + i * segmentWidth;
      star.y = getRandomInRange(
        -starPosOffset,
        this.app.renderer.height + starPosOffset
      );
      star.defaultX = star.x;
      this.stars.push(star);
      this.container.addChild(star);
    }
  }

  createPlanets() {
    const redPlanetTexture = this.app.loader.resources.redPlanet.texture;
    this.redPlanet = new PIXI.Sprite(redPlanetTexture);
    this.redPlanet.x =
      calcPercent(this.app.renderer.width, 65) - this.redPlanet.width;
    this.container.addChild(this.redPlanet);

    const purplePlanetTexture = this.app.loader.resources.purplePlanet.texture;
    this.purplePlanet = new PIXI.Sprite(purplePlanetTexture);
    this.purplePlanet.x = calcPercent(this.app.renderer.width, 85);
    this.purplePlanet.y =
      this.app.renderer.height / 2 - this.purplePlanet.height / 2;
    this.container.addChild(this.purplePlanet);
  }

  drawCircle() {
    let x, y, radius;

    if (isMobileRosiGame) {
      x = calcPercent(this.app.renderer.width, 85);
      y = 0;
      radius = calcPercent(this.app.renderer.width, 65);
    } else {
      x = this.app.renderer.width / 2;
      y = this.app.renderer.height / 2;
      radius = calcPercent(this.app.renderer.width, 30);
    }

    this.circle.clear();
    this.circle.beginFill(0x00193d);
    this.circle.drawCircle(x, y, radius);
    this.circle.endFill();
  }

  startAnimation() {
    for (const star of this.stars) {
      this.animateSingleStar(star);
    }
  }

  animateSingleStar(star) {
    const coords = { x: star.x };
    const speed = getRandomInRange(0.1, 0.4) / 20;

    new TWEEN.Tween(coords)
      .to({ x: -star.width }, star.x / speed)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        star.x = coords.x;
      })
      .onComplete(() => {
        star.x = this.app.renderer.width;
        this.animateSingleStar(star);
      })
      .start();
  }
}

export default RosiAnimationBackground;
