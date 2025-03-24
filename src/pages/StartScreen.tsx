import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  return (
    <div className="h-screen w-full space-y-7 rounded-lg bg-[#1F1F1F] p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-white">
        Що вершить долю людства у цьому світі? Якась незрима істота чи закон,
        подібно до Длани Господньої, що ширяє над світом? Принаймні істинно те,
        що людина не має навіть над своєю волею
      </h1>
      <div className="text-gray-300">
        <label htmlFor="numOfQuestions" className="mr-2">
          Скільки питань хочеш пройти?
        </label>
        <select
          id="numOfQuestions"
          value={numOfQuestions}
          onChange={(e) => setNumOfQuestions(+e.target.value)}
          className="rounded border border-gray-600 bg-[#2A2A2A] p-1 text-white"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
      <Link
        to={`/questions?quantity=${numOfQuestions}`}
        className="inline-block rounded-full bg-green-600 px-6 py-3 text-xl text-white transition-colors hover:bg-green-700"
      >
        Почати квіз
      </Link>
    </div>
  );
}

export default StartScreen;
