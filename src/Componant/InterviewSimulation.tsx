// src/InterviewSimulation.tsx

import React, { useState, useEffect } from 'react';

interface InterviewSimulationProps {
  interviewType: string;
}

function InterviewSimulation({ interviewType }: InterviewSimulationProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Mock API call to fetch interview questions based on interviewType
    // Replace this with actual API integration with OpenAI or your data source
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/interview-questions?type=${interviewType}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching interview questions:', error);
      }
    };

    fetchQuestions();
  }, [interviewType]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  return (
    <div >
      {questions.length > 0 ? (
        <div>
          <h2>Interview Simulation: {interviewType}</h2>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div>
            <p>{questions[currentQuestionIndex]}</p>
            <input
              type="text"
              value={userAnswers[currentQuestionIndex] || ''}
              onChange={handleAnswerChange}
            />
          </div>
          <div>
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default InterviewSimulation;
