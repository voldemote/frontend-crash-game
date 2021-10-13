import * as PIXI from 'pixi.js';
import { isMobileRosiGame, calcPercent, getRandomInRange } from './utils';

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return { x, y };
}

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
    this.planets = [];
    this.createPlanets();
  }

  createStars() {
    const segmentWidth = isMobileRosiGame ? 50 : 160;
    const segmentsCount =
      Math.trunc(this.app.renderer.width / segmentWidth) + 1;

    // const star = new PIXI.Sprite(this.app.loader.resources.star2.texture);
    // star.x = 590;
    // star.y = 300;
    // this.stars.push(star);
    // this.container.addChild(star);
    // return;

    const h = this.app.renderer.height;
    const yPos = [
      -calcPercent(h, 35),
      calcPercent(h, 0),
      calcPercent(h, 35),
      calcPercent(h, 70),
    ];

    const starWidth = new PIXI.Sprite(this.app.loader.resources.star2.texture)
      .width;
    for (let i = 0; i < segmentsCount; i++) {
      const randomYOffset = getRandomInRange(
        calcPercent(h, 10),
        calcPercent(h, 30)
      );
      const randomXOffset = getRandomInRange(
        calcPercent(starWidth, 50),
        calcPercent(starWidth, 100)
      );
      for (let j = 0; j < yPos.length; j++) {
        const star = new PIXI.Sprite(this.app.loader.resources.star2.texture);
        let plusOrMinus = j % 2 === 0 ? -1 : 1;
        plusOrMinus *= i % 2 === 0 ? 1 : -1;

        star.x =
          i * segmentWidth +
          segmentWidth / 2 -
          star.width +
          randomXOffset * plusOrMinus;
        star.y = yPos[j] + randomYOffset;
        star.speed = getRandomInRange(0.1, 0.3);
        this.stars.push(star);
        this.container.addChild(star);
      }
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

    this.planets = [this.redPlanet, this.purplePlanet];
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

  update(dt, speed, angle) {
    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);

    for (const star of this.stars) {
      star.x -= vx * star.speed * dt;
      star.y += vy * star.speed * dt;

      const w = this.app.renderer.width;
      const h = this.app.renderer.height;

      /*
        |
        * star is above half the screen
        |
        |
        |________
      */
      if (star.x < -star.width && star.y < h / 2) {
        const x1 = 0;
        const y1 = 0;
        const x2 = w;
        const y2 = 0;
        const x3 = star.x;
        const y3 = star.y;
        const length = w;
        const x4 = x3 + length * Math.cos(angle);
        const y4 = y3 - length * Math.sin(angle);

        // if (this.stars[1] === star) {
        //   console.log(`
        //     x1: ${x1}
        //     y1: ${y1}
        //     x2: ${x2}
        //     y2: ${y2}
        //     x3: ${x3}
        //     y3: ${y3}
        //     x4: ${x4}
        //     y4: ${y4}
        //     width: ${this.app.renderer.width}
        //     height: ${this.app.renderer.height}
        //   `)
        // }

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = intersection.x;
        star.y = -star.height;
      }

      /*
        |
        |
        |
        * star is below half the height
        |________
      */
      if (star.x < -star.width && star.y >= h / 2) {
        const x1 = w;
        const y1 = 0;
        const x2 = w;
        const y2 = h;
        const x3 = star.x;
        const y3 = star.y;
        const length = w - star.height;
        const x4 = this.app.renderer.width;
        const y4 = y3 - star.height - length * Math.sin(angle);

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = intersection.x;
        star.y = intersection.y;
      }

      /*
            |
            |
       _____|
      */
      if (star.y >= h) {
        const x1 = w;
        const y1 = 0;
        const x2 = w;
        const y2 = h;
        const x3 = star.x;
        const y3 = star.y;
        const length = w;
        const x4 = x3 + length * Math.cos(angle);
        const y4 = y3 - length * Math.sin(angle);

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = w;
        star.y = intersection.y;
      }
    }
  }
}

export default RosiAnimationBackground;
