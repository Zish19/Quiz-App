import React, { createContext, useReducer, useEffect } from 'react';
import questionsData from '../data/questions.json';

const initialState = {
  questions: questionsData,
  status: 'start', // 'start', 'playing', 'finished'
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  timeRemaining: 60,
  results: [] // Array of { question, selected, correct, isCorrect }
};

export const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...initialState, status: 'playing' };
    
    case 'ANSWER_QUESTION':
      if (state.selectedAnswer !== null) return state; // Prevent multiple selections
      
      const isCorrect = action.payload === state.questions[state.currentQuestionIndex].correctAnswer;
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
        results: [...state.results, {
          question: state.questions[state.currentQuestionIndex],
          selected: action.payload,
          correct: state.questions[state.currentQuestionIndex].correctAnswer,
          isCorrect
        }]
      };
      
    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex >= state.questions.length - 1) {
        return { ...state, status: 'finished' };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        timeRemaining: 60
      };
      
    case 'TIME_OUT':
      return {
        ...state,
        score: state.score - 1,
        selectedAnswer: 'TIME_OUT',
        results: [...state.results, {
          question: state.questions[state.currentQuestionIndex],
          selected: 'Time out',
          correct: state.questions[state.currentQuestionIndex].correctAnswer,
          isCorrect: false
        }]
      };

    case 'TICK':
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1
      };
      
    case 'RESTART':
      return initialState;
      
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Timer logic
  useEffect(() => {
    let timer;
    if (state.status === 'playing' && state.timeRemaining > 0 && state.selectedAnswer === null) {
      timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else if (state.timeRemaining === 0 && state.selectedAnswer === null) {
      dispatch({ type: 'TIME_OUT' });
    }
    
    return () => clearInterval(timer);
  }, [state.status, state.timeRemaining, state.selectedAnswer]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
