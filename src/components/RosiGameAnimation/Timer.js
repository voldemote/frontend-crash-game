import { useEffect, useState } from 'react';
import { calcCrashFactorFromElapsedTime } from './canvas/utils';

const Timer = ({ startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    const intervalTime = 10;
    let intervalId;

    const tick = () => {
      let now = Date.now();

      setFactor(calcCrashFactorFromElapsedTime(now - startTime.getTime()));
    };

    intervalId = setInterval(tick, intervalTime);

    return () => clearTimeout(intervalId);
  }, []);

  return <span>{factor}</span>;
};

export default Timer;
