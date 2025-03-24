import { useEffect, useMemo, useState } from 'react';
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
      navigate(`/results?quantity=${numOfQuestions}&score=${score}`);
    }
  }, [currentQuestion, navigate, numOfQuestions, questions, score]);

  if (isQuering) return <Loader />;

  return (
    <div className="flex min-h-screen flex-col bg-[#1F1F1F] text-white">
      <header className="border-b border-gray-700 p-4">
        <div className="text-lg">
          🎯Скор:{' '}
          <span className="font-bold">
            {score} / {questions?.length}
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-2">
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
      </main>

      <footer className="border-t border-gray-700 p-4">
        <div className="flex justify-center gap-5">
          <button
            disabled={currentQuestion === 0}
            onClick={() => moveToQuestion('back')}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-700"
          >
            Назад
          </button>
          <button
            onClick={() => moveToQuestion('next')}
            className="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Далі
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Questions;
