"use client";

import type { QuizQuestion } from "@/lib/course-data/step2.quiz";
import { cn } from "@/lib/utils";
import { memo, useEffect, useState } from "react";

interface FillBlankQuestionProps {
  question: QuizQuestion;
  answer?: string;
  onAnswer: (answer: string) => void;
  showResults: boolean;
}

export const FillBlankQuestion = memo(function FillBlankQuestion({
  question,
  answer,
  onAnswer,
  showResults,
}: FillBlankQuestionProps) {
  const [inputValue, setInputValue] = useState<string>(answer || "");

  // Update local state when answer prop changes
  useEffect(() => {
    if (answer !== undefined) {
      setInputValue(answer);
    }
  }, [answer]);

  const handleChange = (value: string) => {
    if (showResults) return;
    setInputValue(value);
    onAnswer(value);
  };

  const isCorrect =
    inputValue.toLowerCase().trim() ===
    (question.correctAnswer as string).toLowerCase().trim();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={showResults}
          placeholder="Type your answer here..."
          className={cn(
            "w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200",
            {
              "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800":
                !showResults,
              "border-green-500 bg-green-50 dark:bg-green-900/20":
                showResults && isCorrect,
              "border-red-500 bg-red-50 dark:bg-red-900/20":
                showResults && !isCorrect && inputValue,
              "cursor-not-allowed opacity-75": showResults,
            }
          )}
        />

        {showResults && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
              <div className="flex-1">
                <p
                  className={cn("font-medium", {
                    "text-green-800 dark:text-green-200": isCorrect,
                    "text-red-800 dark:text-red-200": !isCorrect,
                  })}
                >
                  {isCorrect
                    ? "Correct!"
                    : `Incorrect. The answer is: "${question.correctAnswer}"`}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
