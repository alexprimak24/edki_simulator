import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Question from '../ui/Question';
import Loader from '../ui/Loader';
import { getQuestions } from '../services/apiQuestions';
import { generateRandomNumbers } from '../utils';

function Questions() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get amount of questions and randomly fetch them from supabase
  const [searchParams] = useSearchParams();
  const numOfQuestions = Number(searchParams.get('quantity'));
  const navigate = useNavigate();
  // Generating random numbers and saving it to useMemo so on the next question
  // there won't be unnecessary recalculation
  const questionIds = useMemo(
    () => generateRandomNumbers(numOfQuestions),
    [numOfQuestions],
  );

  const { data: questions, isPending: isQuering } = useQuery({
    queryFn: () => getQuestions(questionIds),

    queryKey: ['question', questionIds],
  });

  function handleSubmitAnswer(isRightAnswer: boolean) {
    if (isRightAnswer) {
      setScore((score) => score + 1);
    }
    setCurrentQuestion((cur) => cur + 1);
  }

  function moveToQuestion(moveTo: 'back' | 'next') {
    setCurrentQuestion((cur) => (moveTo === 'next' ? cur + 1 : cur - 1));
  }

  useEffect(() => {
    if (questions && currentQuestion >= questions.length) {
      navigate('/results');
    }
  }, [currentQuestion, navigate, questions]);

  if (isQuering) return <Loader />;

  return (
    <div>
      <div className="">Скор: {score}</div>
      {questions && questions[currentQuestion] ? (
        <Question
          key={questions[currentQuestion].id}
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          answer={questions[currentQuestion].answer}
          onSubmitAnswer={handleSubmitAnswer}
        />
      ) : (
        <div>There is an error with fetching questions</div>
      )}
      <div className="flex gap-5">
        <button
          disabled={currentQuestion === 0}
          onClick={() => moveToQuestion('back')}
          className="disabled:bg-gray-600 disabled:text-white"
        >
          Назад
        </button>
        <button onClick={() => moveToQuestion('next')}>Далі</button>
      </div>
    </div>
  );
}

export default Questions;
