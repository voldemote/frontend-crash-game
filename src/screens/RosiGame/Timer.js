import { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (seconds < 60) {
      setTimeout(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    if (ms < 100) {
      setTimeout(() => {
        setMs(prevMs => prevMs + 10);
      }, 100);
    } else {
      setMs(0);
    }
  }, [ms]);

  return <span>{seconds}.{ms}</span>
};

export default Timer;
