import '@pixi/sound';
import * as Sound from '@pixi/sound';
import { some } from 'lodash';
import { Factory } from "../../sources/libs/index.js";

/**
 * @class Cell
 * @extends PIXI.Sprite
 * To hold cell's data and display different cell's states
 * */
export default class Cell extends Factory.Sprite {

  /**
   * @param {PIXI.Texture} texture
   * @param {CellModel} model*/
  constructor(texture, { col, row, text, isMine, isRevealed, isFlagged, isEmpty }) {
    super(texture);

    this.col = col;
    this.row = row;
    this.text = text;
    this.isMine = isMine;
    this.isRevealed = isRevealed;
    this.isFlagged = isFlagged;
    this.isEmpty = isEmpty;
    
  }

  reveal(textures, styles) {
    console.log(textures)
    console.log("REVEAL");
    this.isRevealed = true;
    Sound.sound.add(
      {
        coin: {
          url: '/sounds/mines/coin.mp3',
          loop: false,
        },
        poop: {
          url: '/sounds/mines/poop.mp3',
          loop: false,
        }
      }
    );
   
    if (this.isMine) {
      this.texture = textures.get("mine");
      Sound.sound.play('poop');
      
    } else {
      textures.get("empty");
      Sound.sound.play('coin');
    }
   
    this.texture = this.isMine ? textures.get("mine") : textures.get("empty");
    // const style = { ...styles.common, ...styles[ this.text ] };
    // this.addChild(new Factory.Text(this.text, style));
  }

  toggleFlag(textures) {
    if ( this.isRevealed ) return;

    this.isFlagged = !this.isFlagged;
    this.texture = this.isFlagged ? textures.get("flag") : textures.get("closed");
  }
  setupAnim() {}
}
