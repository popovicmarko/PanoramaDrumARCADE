import React, { useState, useEffect } from 'react';
import '../Console.css';

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      calculatePrice();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setPrice(0);
  };

  const calculatePrice = () => {
    const hours = elapsedTime / 3600000;
    const priceInDinars = hours * 200;
    setPrice(priceInDinars.toFixed(2));
  };

  const formatTime = () => {
    const centiseconds = ("0" + (Math.floor(elapsedTime / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(elapsedTime / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(elapsedTime / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor(elapsedTime / 3600000)).slice(-2);

    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
  };

  return (
    <div className='content'>
        <h2>Play Station 5</h2>
      <div className='time'>{formatTime()}</div>
      <div className='time price'>{price} din</div>
      <div className='buttons'>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
