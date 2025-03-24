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
  function handleChoise(option: string) {
    const isRightAnswer = answer === option;
    onSubmitAnswer(isRightAnswer);
  }

  return (
    <div>
      <p>{question}</p>
      <ul>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleChoise(option)}
            className="cursor-poiner"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
