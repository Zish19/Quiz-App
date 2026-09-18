import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const Timer = () => {
  const { state } = useContext(QuizContext);
  
  const percentage = (state.timeRemaining / 60) * 100;
  
  let timerClass = "timer-bar-fill";
  if (state.timeRemaining <= 10) {
    timerClass += " danger";
  } else if (state.timeRemaining <= 30) {
    timerClass += " warning";
  }

  return (
    <div className="timer-container">
      <div className="timer-text">
        <span>Time Remaining:</span>
        <span className="time">{state.timeRemaining}s</span>
      </div>
      <div className="timer-bar-bg">
        <div 
          className={timerClass} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
