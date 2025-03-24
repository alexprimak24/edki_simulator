import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  return (
    <div className="max-w-4xl space-y-7">
      <h1>
        Що вершить долю людства у цьому світі? Якась незрима істота чи закон,
        подібно до Длани Господньої, що ширяє над світом? Принаймні істинно те,
        що людина не має навіть над своєю волею{' '}
      </h1>
      <div className="">
        <label htmlFor="numOfQuestions">Скільки питань хочеш пройти?</label>
        <select
          id="numOfQuestions"
          value={numOfQuestions}
          onChange={(e) => setNumOfQuestions(+e.target.value)}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
      <Link
        to={`/questions?quantity=${numOfQuestions}`}
        className="rounded-full p-3 text-2xl outline"
      >
        Почати квіз
      </Link>
    </div>
  );
}

export default StartScreen;
