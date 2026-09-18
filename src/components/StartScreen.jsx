import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const StartScreen = () => {
  const { dispatch, state } = useContext(QuizContext);

  return (
    <div className="card start-screen">
      <h1>Knowledge Quiz</h1>
      <p>Test your knowledge with these {state.questions.length} multiple-choice questions.</p>
      <ul>
        <li>You will have 60 seconds per question.</li>
        <li>Correct answers give you +1 point.</li>
        <li>Running out of time deducts 1 point.</li>
      </ul>
      <button className="btn-primary" onClick={() => dispatch({ type: 'START' })}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
