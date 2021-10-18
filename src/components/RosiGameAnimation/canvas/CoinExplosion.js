import * as PIXI from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
class CoinExplosion {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.visible = true;

    const textures = this.app.loader.resources['coin-anim'].textures;

    this.emitter = new particles.Emitter(
      this.container,

      {
        lifetime: {
          min: 0.5,
          max: 0.7,
        },
        frequency: 0.02,
        emitterLifetime: 0.31,
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
                    value: 0.8,
                  },
                ],
              },
            },
          },
          {
            type: 'moveSpeed',
            config: {
              speed: {
                list: [
                  {
                    time: 0,
                    value: 200,
                  },
                  {
                    time: 1,
                    value: 100,
                  },
                ],
              },
            },
          },
          {
            type: 'scaleStatic',
            config: {
              min: 0.3,
              max: 0.5,
            },
          },
          {
            type: 'animatedRandom',
            config: {
              anims: [
                {
                  framerate: 20,
                  loop: true,
                  textures: Object.keys(textures),
                },
                {
                  framerate: 20,
                  loop: true,
                  textures: Object.keys(textures),
                },
                {
                  framerate: 1,
                  loop: false,
                  textures: [this.app.loader.resources.star1.texture],
                },
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
                radius: 40,
                innerRadius: 39,
                affectRotation: true,
              },
            },
          },
        ],
      }
    );

    this.elapsed = Date.now();

    const update = () => {
      requestAnimationFrame(update);
      var now = Date.now();
      this.emitter.update((now - this.elapsed) * 0.001);
      this.elapsed = now;
    };

    update();

    const spritesheet = this.app.loader.resources['explode-anim'].spritesheet;
    this.explosion = new PIXI.AnimatedSprite(
      Object.values(spritesheet.textures)
    );
    this.explosion.anchor.set(0.5);
    this.explosion.scale.set(1);
    this.explosion.animationSpeed = 0.1;
    this.explosion.visible = false;
    this.explosion.loop = false;
    this.explosion.onComplete = () => {
      this.explosion.stop();
      this.explosion.visible = false;
    };
    this.container.addChild(this.explosion);
  }

  startAnimation(x, y) {
    this.emitter.emit = true;
    this.elapsed = Date.now();
    this.emitter.resetPositionTracking();
    this.emitter.updateOwnerPos(x, y);
    this.explosion.position.x = x;
    this.explosion.position.y = y;
    this.explosion.gotoAndPlay(0);
    this.explosion.visible = true;
  }

  stopAnimation() {
    this.emitter.emit = false;
  }
}

export default CoinExplosion;
