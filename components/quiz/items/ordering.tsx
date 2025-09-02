"use client";

import type { QuizQuestion } from "@/lib/course-data/step2.quiz";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderingQuestionProps {
  question: QuizQuestion;
  answer?: string[];
  onAnswer: (answer: string[]) => void;
  showResults: boolean;
}

export function OrderingQuestion({
  question,
  answer,
  onAnswer,
  showResults,
}: OrderingQuestionProps) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (question.options) {
      // Initialize with existing answer or shuffled options
      if (answer && Array.isArray(answer)) {
        setItems(answer);
      } else {
        // Shuffle the options for the initial state
        const shuffled = [...question.options].sort(() => Math.random() - 0.5);
        setItems(shuffled);
      }
    }
  }, [question.options, answer]);

  useEffect(() => {
    // Update parent whenever items change
    if (items.length > 0) {
      onAnswer(items);
    }
  }, [items, onAnswer]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (showResults) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  const isCorrect = () => {
    if (!Array.isArray(question.correctAnswer)) return false;
    return (
      items.length === question.correctAnswer.length &&
      items.every((item, index) => item === question.correctAnswer[index])
    );
  };

  const correct = isCorrect();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </h3>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isCorrectPosition =
            showResults &&
            Array.isArray(question.correctAnswer) &&
            item === question.correctAnswer[index];

          return (
            <div
              key={`${item}-${index}`}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200",
                {
                  "border-green-500 bg-green-50 dark:bg-green-900/20":
                    showResults && isCorrectPosition,
                  "border-red-500 bg-red-50 dark:bg-red-900/20":
                    showResults && !isCorrectPosition,
                  "border-gray-200 dark:border-gray-700":
                    !showResults || isCorrectPosition,
                  "cursor-move": !showResults,
                }
              )}
            >
              {/* Drag Handle */}
              {!showResults && (
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveItem(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      moveItem(index, Math.min(items.length - 1, index + 1))
                    }
                    disabled={index === items.length - 1}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Order Number */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
                  {
                    "bg-green-500 text-white": showResults && isCorrectPosition,
                    "bg-red-500 text-white": showResults && !isCorrectPosition,
                    "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300":
                      !showResults,
                  }
                )}
              >
                {index + 1}
              </div>

              {/* Grip Icon */}
              {!showResults && (
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              )}

              {/* Item Text */}
              <div className="flex-1">
                <span className="font-medium">{item}</span>
              </div>

              {/* Result Indicator */}
              {showResults && (
                <div className="flex items-center space-x-1">
                  {isCorrectPosition ? (
                    <svg
                      className="w-5 h-5 text-green-500"
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
                      className="w-5 h-5 text-red-500"
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
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        {!showResults ? (
          <p>Drag the items to arrange them in the correct order.</p>
        ) : (
          <div className="flex items-start space-x-2">
            {correct ? (
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
                  "text-green-800 dark:text-green-200": correct,
                  "text-red-800 dark:text-red-200": !correct,
                })}
              >
                {correct ? "Perfect order!" : "Incorrect order"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {question.explanation}
              </p>
              {!correct && Array.isArray(question.correctAnswer) && (
                <div className="mt-2">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Correct order:
                  </p>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 ml-4">
                    {question.correctAnswer.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
