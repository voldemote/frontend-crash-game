import { useEffect, useState } from 'react';

const Timer = ({ pause, startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [seconds, setSeconds] = useState(startTime.getSeconds());
  const [ms, setMs] = useState(startTime.getMilliseconds());

  useEffect(() => {
    let timeoutHandle;

    if (pause) {
      clearTimeout(timeoutHandle);
      return;
    }

    if (seconds < 60) {
      timeoutHandle = setTimeout(() => {
        if (pause) return;
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearTimeout(timeoutHandle);
  }, [seconds, pause]);

  useEffect(() => {
    let timeoutHandle;

    if (pause) {
      clearTimeout(timeoutHandle);
      return;
    }

    if (ms < 100) {
      timeoutHandle = setTimeout(() => {
        if (pause) return;
        setMs(prevMs => prevMs + 10);
      }, 100);
    } else {
      setMs(0);
    }

    return () => clearTimeout(timeoutHandle);
  }, [ms, pause]);

  return (
    <span>
      {seconds}.{ms === 0 ? '00' : ms}
    </span>
  );
};

export default Timer;
