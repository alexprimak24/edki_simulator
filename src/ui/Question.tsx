import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  answer: string;
  // eslint-disable-next-line no-unused-vars
  onSubmitAnswer: (isRightAnswer: boolean) => void;
}

function Question({
  question,
  options,
  answer,
  onSubmitAnswer,
}: QuestionProps) {
  function handleChoice(option: string) {
    const isRightAnswer = answer === option;
    onSubmitAnswer(isRightAnswer);
  }

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      {/* Adaptive font sizes for the question text */}
      <p className="mb-4 text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
        {question}
      </p>

      {/* The list of options stretches to fill vertical space.
      'w-full' ensures each <li> can fill the width within a centered parent. */}
      <ul className="flex w-full flex-1 flex-col gap-4">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleChoice(option)}
            className="cursor-pointerrounded flex-1 items-center bg-[#2A2A2A] p-4 text-center transition-colors hover:bg-gray-700"
          >
            <span className="mt-6">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
