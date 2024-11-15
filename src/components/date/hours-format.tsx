import React, { useState, useEffect } from 'react';

interface IFormatTime {
  initialTime: number;
}

export function CountdownTimer(props: IFormatTime): React.JSX.Element {
  const [remainingTime, setRemainingTime] = useState(props?.initialTime);
  const [exTime, setExtime] = useState(0)

  useEffect(() => {
    if (props?.initialTime >= 0) {
      setRemainingTime(props?.initialTime)
    } else {
      setExtime(props?.initialTime * (-1))
    }
  }, [props?.initialTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  useEffect(() => {
    const exTimer = setInterval(() => {
      setExtime(prevTime => {
        if (remainingTime === 0) {
          return prevTime + 1;
        } else {
          clearInterval(exTimer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(exTimer);
  }, [remainingTime, exTime])

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const convertSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = formatTime(hours);
    const formattedMinutes = formatTime(minutes);
    const formattedSeconds = formatTime(seconds % 60);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const formattedTime = convertSecondsToTime(remainingTime);
  const extraTime = convertSecondsToTime(exTime)

  return (
    <div>
      <p>{
        remainingTime > 0 ? formattedTime
          : (exTime > 0
            ? '-' + extraTime : 'Time out')
      }</p>
    </div>
  );
}
