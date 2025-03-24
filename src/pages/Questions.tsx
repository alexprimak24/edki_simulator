/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Question from '../ui/Question';
import Loader from '../ui/Loader';
import { useRandom } from '../hooks/useRandom';
import { getQuestions } from '../services/apiQuestions';

function Questions() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [searchParams] = useSearchParams();
  const numOfQuestions = searchParams.get('quantity');
  const questionIds = useRandom(Number(numOfQuestions));

  const { data: questions, isPending: isQuering } = useQuery({
    queryFn: () => getQuestions(questionIds),

    queryKey: ['question'],
  });

  function handleRightAnswer() {
    setScore((score) => score + 1);
  }

  if (isQuering) return <Loader />;
  return (
    <div>
      <div className="">Скор: {score}</div>
      {questions[currentQuestion + 1](
        <Question
          key={question.id}
          question={question.question}
          options={question.options}
          answer={question.answer}
          onRightAnswer={handleRightAnswer}
        />,
      )}
      <div className="flex gap-5">
        <button>Далі</button>
        <button>Назад</button>
      </div>
    </div>
  );
}

export default Questions;
