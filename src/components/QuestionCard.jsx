import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import Timer from './Timer';

const QuestionCard = () => {
  const { state, dispatch } = useContext(QuizContext);
  const question = state.questions[state.currentQuestionIndex];

  const handleAnswer = (option) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: option });
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const getButtonClass = (option) => {
    if (!state.selectedAnswer) return 'btn-option';
    
    if (option === question.correctAnswer) {
      return 'btn-option correct';
    }
    
    if (state.selectedAnswer === option) {
      return 'btn-option incorrect';
    }
    
    return 'btn-option disabled';
  };

  return (
    <div className="card question-card fade-in">
      <div className="card-header">
        <span className="question-number">Question {state.currentQuestionIndex + 1} of {state.questions.length}</span>
        <span className="score">Score: {state.score}</span>
      </div>
      
      <Timer />

      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => handleAnswer(option)}
            disabled={state.selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {state.selectedAnswer && (
        <div className="feedback-container slide-up">
          {state.selectedAnswer === 'TIME_OUT' ? (
            <p className="feedback-text warning">Time's up! The correct answer was <strong>{question.correctAnswer}</strong>.</p>
          ) : state.selectedAnswer === question.correctAnswer ? (
            <p className="feedback-text success">Correct!</p>
          ) : (
            <p className="feedback-text error">Incorrect. The correct answer is <strong>{question.correctAnswer}</strong>.</p>
          )}
          
          <button className="btn-primary" onClick={handleNext}>
            {state.currentQuestionIndex === state.questions.length - 1 ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
