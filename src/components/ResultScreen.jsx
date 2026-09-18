import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const ResultScreen = () => {
  const { state, dispatch } = useContext(QuizContext);

  const getScoreClass = () => {
    const percentage = (state.score / state.questions.length) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  return (
    <div className="card result-screen fade-in">
      <h1>Quiz Complete!</h1>
      <div className="final-score">
        <h2>Your Score:</h2>
        <span className={`score-badge ${getScoreClass()}`}>{state.score} / {state.questions.length}</span>
      </div>

      <div className="results-summary">
        <h3>Summary</h3>
        <ul className="results-list">
          {state.results.map((result, index) => (
            <li key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="question-header">
                <strong>Q{index + 1}:</strong> {result.question.question}
              </div>
              <div className="answer-details">
                <span className="your-answer">Your answer: {result.selected}</span>
                {!result.isCorrect && (
                  <span className="correct-answer">Correct answer: {result.correct}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn-primary" onClick={() => dispatch({ type: 'RESTART' })}>
        Try Again
      </button>
    </div>
  );
};

export default ResultScreen;
