'use client';
import { Card } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useTimer} from './Timer_Context';

const Stopwatch = () => {
  const {time, setTime } = useTimer();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, setTime]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    
  };

  const addMinute = () => {
    setTime(prevTime => prevTime + 6000); // 6000 centiseconds = 1 minute
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
        <button className = "stopwatch-button" onClick={addMinute}>
          + 1 Minute
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

