import React, { createContext, useState, useContext, useEffect } from 'react';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
    }, 60000); // Increase time every minute

    return () => clearInterval(intervalId);
}, []);

  return (
    <TimerContext.Provider value={{time, setTime}}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
