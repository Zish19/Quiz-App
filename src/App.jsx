import React, { useContext } from 'react';
import { QuizContext } from './context/QuizContext';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import './index.css';

function App() {
  const { state } = useContext(QuizContext);

  return (
    <div className="app-container">
      {state.status === 'start' && <StartScreen />}
      {state.status === 'playing' && <QuestionCard />}
      {state.status === 'finished' && <ResultScreen />}
    </div>
  );
}

export default App;
