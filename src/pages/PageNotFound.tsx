import React from 'react';
import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="w-full max-w-4xl rounded-lg bg-[#1F1F1F] p-8 text-white shadow-lg">
      <p className="mb-4 text-xl font-semibold">Сторінка не знайдена</p>
      <button
        onClick={moveBack}
        className="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
      >
        Повернутись
      </button>
    </div>
  );
}

export default PageNotFound;
