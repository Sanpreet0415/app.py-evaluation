import React, { useState, useEffect } from 'react';
import { checkFocus } from './ProctoringService'; // Ensure correct path
import './App.css';

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris" },
  // Add more questions here
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [alertCount, setAlertCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const focusCheckInterval = setInterval(() => {
      checkFocus(handleProctoringAlert);
    }, 3000);

    return () => clearInterval(focusCheckInterval);
  }, []);

  const handleProctoringAlert = (focusStatus) => {
    if (focusStatus === 'lookingAway') {
      setAlertCount(prevCount => {
        if (prevCount >= 2) {
          submitQuiz();
        }
        return prevCount + 1;
      });
    }
  };

  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    alert('Quiz submitted');
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="App">
      <h1>Quiz Application</h1>
      <div>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
        <p>{questions[currentQuestionIndex].question}</p>
        {questions[currentQuestionIndex].options.map(option => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={handleAnswerChange}
              />
              {option}
            </label>
          </div>
        ))}
        <div>
          <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        </div>
        <div>
          <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
          <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
        </div>
        <div>
          <p>Alerts Received: {alertCount}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
