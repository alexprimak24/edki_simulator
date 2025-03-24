import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  answer: string;
  onRightAnswer: () => void;
}

function Question({ question, options, answer, onRightAnswer }: QuestionProps) {
  function handleChoise(option: string) {
    if (answer === option) {
      onRightAnswer();
    }
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
