import { ROSI_GAME_MOBILE_BREAKPOINT } from 'constants/RosiGame';

export const isMobileRosiGame =
  window.innerWidth <= ROSI_GAME_MOBILE_BREAKPOINT;

export function calcPercent(totalValue, percentToGet) {
  return (percentToGet / 100) * totalValue;
}

export function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomItems(items, n) {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export function calcCrashFactorFromElapsedTime(timeDiff = 1) {
  var offsetTime = 0;
  var offsetFactor = 0;
  let speed = 0;

  if (timeDiff > 0  && timeDiff < 38000) {
    offsetTime = 0;
    offsetFactor = 1.0;
    speed = 190;
  }
  if (timeDiff >= 38000  && timeDiff < 60000) {
    offsetTime = 38000;
    offsetFactor = 3.0;
    speed = 110;
  }
  if (timeDiff >= 60000  && timeDiff < 79500) {
    offsetTime = 60000;
    offsetFactor = 5.0;
    speed = 65;
  }
  if (timeDiff >= 79500  && timeDiff < 95500) {
    offsetTime = 79500;
    offsetFactor = 8.0;
    speed = 80;
  }
  if (timeDiff >= 95500  && timeDiff < 135500) {
    offsetTime = 95500;
    offsetFactor = 10.0;
    speed = 80;
  }
  if (timeDiff >= 135500  && timeDiff < 345500) {
    offsetTime = 135500;
    offsetFactor = 15.0;
    speed = 60;
  }
  if (timeDiff >= 345500) {
    offsetTime = 345500;
    offsetFactor = 50.0;
    speed = 52;
  }

  //console.log(`((${timeDiff}-${offsetTime})/${speed} * 0.01) + ${offsetFactor}`)
  return ( ((timeDiff-offsetTime)/speed * 0.01) + offsetFactor).toFixed(2);  //currentCrashFactor
}

export function calcTotalDelayTime(crashFactor){
  var totalDelayTime = 0;
  let delay = 0;

  for (let i = 1; i <= crashFactor; i = i + 0.01) {
    if (i > 1  && i < 3.00) {
      delay = 190; //speed: 38000/200 => 190 per 0.01 increment
    }
    if (i >= 3.00  && i < 5.00) {
      delay = 110;     //speed: 22000/200 => 110 per 0.01 increment
    }
    if (i >= 5.00  && i < 8.00) {
      delay = 65;     //speed: 20000/300 => 66.66 per 0.01 increment
    }
    if (i >= 8.00  && i < 10) {
      delay = 80;
    }
    if (i >= 10 && i < 15) {
      delay = 80;
    }
    if (i >= 15 && i < 50) {
      delay = 60;
    }
    if (i >= 50) {
      delay = 52;
    }

    totalDelayTime = totalDelayTime + delay;
  }
  return totalDelayTime;  //in seconds
}

export function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
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

/* new calc start */

/* new calc end */
