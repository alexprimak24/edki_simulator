import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Results() {
  const [searchParams] = useSearchParams();
  const numOfQuestions = Number(searchParams.get('quantity'));
  const userScore = Number(searchParams.get('score'));
  const resultInPercentage = ((userScore / numOfQuestions) * 100).toFixed(2);
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center gap-2 rounded-lg bg-[#1F1F1F] p-8 text-white shadow-lg">
        <span>
          Ваш результат {userScore}/{numOfQuestions} ({resultInPercentage}%)
        </span>
        <Link
          to={'/start'}
          className="max-w-[220px] rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
        >
          Повернутися на головну
        </Link>
      </div>
    </>
  );
}

export default Results;
