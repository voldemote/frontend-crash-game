import * as PIXI from 'pixi.js';

export default class MovieClip extends PIXI.AnimatedSprite {
  constructor (config) {
    var textures = []

    for (var i = 1; i <= config.framesNum; i++) {
      if (i < 10) {
        if (config.framesNum > 100) {
          textures.push(PIXI.Texture.from(config.imageName + '00' + i + '.' + config.imageExt))
        } else {
          textures.push(PIXI.Texture.from(config.imageName + '0' + i + '.' + config.imageExt))
        }
      } else {
        if (config.framesNum > 100 && i < 100) {
          textures.push(PIXI.Texture.from(config.imageName + '0' + i + '.' + config.imageExt))
        } else {
          textures.push(PIXI.Texture.from(config.imageName + i + '.' + config.imageExt))
        }
      }
    }
    
    super(textures)

    if (config.animationSpeed !== undefined) {
      this.animationSpeed = config.animationSpeed
    }

    if (config.loop !== undefined) {
      this.loop = config.loop
    }

    if (config.loopFrame) {
      this.onLoop = () => {
        this.gotoAndStop(0)
        this.gotoAndPlay(config.loopFrame)
      }
    }

    if (config.autoplay !== undefined && config.autoplay === true) {
      this.gotoAndPlay(0)
    }
  }
}
