"use client";

import type { QuizQuestion } from "@/lib/course-data/step2.quiz";
import { cn } from "@/lib/utils";

interface TrueFalseQuestionProps {
  question: QuizQuestion;
  answer?: string;
  onAnswer: (answer: string) => void;
  showResults: boolean;
}

export function TrueFalseQuestion({
  question,
  answer,
  onAnswer,
  showResults,
}: TrueFalseQuestionProps) {
  const handleSelect = (selectedAnswer: string) => {
    if (showResults) return;
    onAnswer(selectedAnswer);
  };

  const isCorrect = answer === question.correctAnswer;
  const showCorrectAnswer = showResults && question.correctAnswer;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {["True", "False"].map((option) => {
          const isSelected = answer === option;
          const isCorrectOption = option === question.correctAnswer;
          const shouldHighlight =
            showResults && (isSelected || isCorrectOption);

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={showResults}
              className={cn(
                "p-6 text-center rounded-lg border-2 transition-all duration-200 font-medium text-lg",
                {
                  "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100":
                    isSelected && !showResults,
                  "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100":
                    showResults && isCorrectOption,
                  "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100":
                    showResults && isSelected && !isCorrect,
                  "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300":
                    !isSelected && !shouldHighlight,
                  "cursor-not-allowed opacity-75": showResults,
                }
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResults && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start space-x-2">
            {isCorrect ? (
              <svg
                className="w-5 h-5 text-green-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <div>
              <p
                className={cn("font-medium", {
                  "text-green-800 dark:text-green-200": isCorrect,
                  "text-red-800 dark:text-red-200": !isCorrect,
                })}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
