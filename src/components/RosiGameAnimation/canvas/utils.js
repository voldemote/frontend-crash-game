import { ROSI_GAME_MOBILE_BREAKPOINT } from 'constants/RosiGame';

export const isMobileRosiGame =
  window.innerWidth <= ROSI_GAME_MOBILE_BREAKPOINT;

export function calcPercent(totalValue, percentToGet) {
  return (percentToGet / 100) * totalValue;
}

export function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function calcCrashFactorFromElapsedTime(timeDiff) {
  let offsetTime = 0;
  let offsetFactor = 0;
  let speed = 0;

  if (timeDiff > 0 && timeDiff < 18000) {
    offsetTime = 0;
    offsetFactor = 1;
    speed = 120;
    //speed: 18000/150 => 120 per 0.01 increment
  }
  if (timeDiff >= 18000 && timeDiff < 43000) {
    offsetTime = 18000;
    offsetFactor = 2.5;
    speed = 100; //speed: 25000/250 => 100 per 0.01 increment
  }
  if (timeDiff >= 43000 && timeDiff < 58000) {
    offsetTime = 43000;
    offsetFactor = 5;
    speed = 60; //speed: 15000/250 => 60 per 0.01 increment
  }
  if (timeDiff >= 58000 && timeDiff <= 68000) {
    offsetTime = 58000;
    offsetFactor = 7.5;
    speed = 40; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 68000 && timeDiff <= 112970) {
    offsetTime = 68000;
    offsetFactor = 10;
    speed = 30; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 112970 && timeDiff <= 162990) {
    offsetTime = 112970;
    offsetFactor = 25;
    speed = 20; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 162990 && timeDiff <= 187980) {
    offsetTime = 162990;
    offsetFactor = 50;
    speed = 10; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 187980 && timeDiff <= 200480) {
    offsetTime = 187980;
    offsetFactor = 75;
    speed = 5; //speed: 10000/250 => 40 per 0.01 increment
  }

  return (((timeDiff - offsetTime) / speed) * 0.01 + offsetFactor).toFixed(2); //currentCrashFactor
}
