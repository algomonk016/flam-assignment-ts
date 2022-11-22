import React, { useState, useEffect } from "react";

const Timer = ({ initialHours = 0, initialMinutes = 0, initialSeconds = 0}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if(hours === 0) {
            clearInterval(myInterval)
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleSingleDigit = (num) => {
    return num < 10 ? `0${num}` : num;
  }

  return (
    <div>
      {hours == 0 && minutes === 0 && seconds === 0
        ? 'Times Up'
        : <h1> {handleSingleDigit(hours)} : {handleSingleDigit(minutes)} : {handleSingleDigit(seconds)}</h1>
      }
    </div>
  )
}

export default Timer;