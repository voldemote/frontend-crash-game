/* Config for resources used in this game
* These resources will be loaded and set as ResPackage to game's view class */
import closed from '../assets/closed.png';
import empty from '../assets/empty.png';
import bg from '../assets/bg.png';
import flag from '../assets/flag.png';
import mine from '../assets/mine.png';
import zero from '../assets/zero.png';
import one from '../assets/one.png';

export default [
  {
    "name": "Minesweeper",
    "resources": [
      {
        "name": "closed",
        "url": closed
      },
      {
        "name": "empty",
        "url": empty
      },
      {
        "name": "flag",
        "url": flag
      },
      {
        "name": "mine",
        "url": mine
      },
      {
        "name": "zero",
        "url": zero
      },
      {
        "name": "one",
        "url": one
      },
      {
        "name": "two",
        "url": "./assets/two.png"
      },
      {
        "name": "three",
        "url": "./assets/three.png"
      },
      {
        "name": "four",
        "url": "./assets/four.png"
      },
      {
        "name": "five",
        "url": "./assets/five.png"
      },
      {
        "name": "six",
        "url": "./assets/six.png"
      },
      {
        "name": "seven",
        "url": "./assets/seven.png"
      },
      {
        "name": "eight",
        "url": "./assets/eight.png"
      },
      {
        "name": "nine",
        "url": "./assets/nine.png"
      },
      {
        "name": "background",
        "url": bg
      },
      {
        "name": "coin",
        "url": "./assets/alpaca_win.png",
        "json": "./assets/alpaca_win.json"
      }

    ]
  }
];
