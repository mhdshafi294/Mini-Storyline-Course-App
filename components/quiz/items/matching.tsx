"use client";

import type { QuizQuestion } from "@/lib/course-data/step2.quiz";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MatchingQuestionProps {
  question: QuizQuestion;
  answer?: string[];
  onAnswer: (answer: string[]) => void;
  showResults: boolean;
}

export function MatchingQuestion({
  question,
  answer,
  onAnswer,
  showResults,
}: MatchingQuestionProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeftItem, setSelectedLeftItem] = useState<string | null>(null);

  // Initialize items and matches only when question changes
  useEffect(() => {
    if (question.options && Array.isArray(question.correctAnswer)) {
      // Split options into left and right sides
      const midPoint = Math.ceil(question.options.length / 2);
      const newLeftItems = question.options.slice(0, midPoint);
      const newRightItems = question.options.slice(midPoint);

      setLeftItems(newLeftItems);
      setRightItems(newRightItems);

      // Only initialize matches if we haven't initialized them yet
      // This prevents overwriting user matches when component re-renders
      setMatches((currentMatches) => {
        // If we already have matches, don't overwrite them
        if (Object.keys(currentMatches).length > 0) {
          return currentMatches;
        }

        // Initialize matches from existing answer (only on first load)
        if (answer && Array.isArray(answer)) {
          const matchObj: Record<string, string> = {};
          for (let i = 0; i < answer.length; i += 2) {
            if (answer[i] && answer[i + 1]) {
              matchObj[answer[i]] = answer[i + 1];
            }
          }
          return matchObj;
        }

        return {};
      });
    }
  }, [question.options, question.correctAnswer]); // Removed 'answer' dependency

  const handleLeftItemClick = (leftItem: string) => {
    if (showResults) return;
    setSelectedLeftItem(selectedLeftItem === leftItem ? null : leftItem);
  };

  const handleRightItemClick = (rightItem: string) => {
    if (showResults || !selectedLeftItem) return;

    setMatches((prev) => {
      const newMatches = { ...prev };

      // Remove any existing match for this right item
      Object.keys(newMatches).forEach((key) => {
        if (newMatches[key] === rightItem) {
          delete newMatches[key];
        }
      });

      // Remove any existing match for the selected left item
      delete newMatches[selectedLeftItem];

      // Add new match
      newMatches[selectedLeftItem] = rightItem;

      return newMatches;
    });

    setSelectedLeftItem(null);
  };

  const removeMatch = (leftItem: string) => {
    if (showResults) return;

    setMatches((prev) => {
      const newMatches = { ...prev };
      delete newMatches[leftItem];
      return newMatches;
    });
  };

  // Update parent component when matches change
  useEffect(() => {
    const answerArray: string[] = [];
    Object.entries(matches).forEach(([left, right]) => {
      answerArray.push(left, right);
    });
    // Only call onAnswer if we have actual matches to avoid unnecessary updates
    if (answerArray.length > 0 || Object.keys(matches).length === 0) {
      onAnswer(answerArray);
    }
  }, [matches]); // Removed onAnswer from dependencies to prevent unnecessary re-renders

  const isCorrect = () => {
    if (!Array.isArray(question.correctAnswer)) return false;

    const userMatches: string[] = [];
    Object.entries(matches).forEach(([left, right]) => {
      userMatches.push(`${left}-${right}`);
    });

    const correctMatches: string[] = [];
    for (let i = 0; i < question.correctAnswer.length; i += 2) {
      correctMatches.push(
        `${question.correctAnswer[i]}-${question.correctAnswer[i + 1]}`
      );
    }

    return (
      userMatches.length === correctMatches.length &&
      correctMatches.every((match) => userMatches.includes(match))
    );
  };

  const correct = isCorrect();

  const clearAllMatches = () => {
    if (showResults) return;
    setMatches({});
    setSelectedLeftItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {question.question}
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedLeftItem
              ? `Selected: &quot;${selectedLeftItem}&quot; - Click a match on the right`
              : "Click an item on the left, then click its match on the right"}
          </p>
          {Object.keys(matches).length > 0 && !showResults && (
            <div className="flex items-center justify-center space-x-4 text-xs">
              <span className="text-gray-500">
                {Object.keys(matches).length} of {leftItems.length} matched
              </span>
              <button
                onClick={clearAllMatches}
                className="text-red-500 hover:text-red-700 underline hover:no-underline transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Items to Match */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 text-center">
            Items to Match
          </h4>
          <div className="space-y-2">
            {leftItems.map((item, index) => {
              const isSelected = selectedLeftItem === item;
              const isMatched = matches[item];
              const isCorrectMatch = showResults && matches[item] && correct;

              return (
                <div
                  key={index}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 transform relative group",
                    {
                      "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 scale-105 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800":
                        isSelected && !showResults,
                      "border-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30":
                        showResults && isCorrectMatch,
                      "border-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30":
                        showResults && isMatched && !correct,
                      "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:scale-102":
                        !isSelected && !isMatched && !showResults,
                      "border-blue-400 bg-gradient-to-r from-blue-25 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20":
                        isMatched && !showResults,
                      "cursor-not-allowed opacity-75": showResults,
                    }
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300 shrink-0",
                          {
                            "bg-blue-500 scale-125": isSelected,
                            "bg-green-500":
                              isMatched && showResults && isCorrectMatch,
                            "bg-red-500":
                              isMatched && showResults && !isCorrectMatch,
                            "bg-gray-300 dark:bg-gray-600":
                              !isSelected && !isMatched,
                            "bg-blue-400": isMatched && !showResults,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-all duration-300",
                          {
                            "text-blue-900 dark:text-blue-100": isSelected,
                            "text-green-900 dark:text-green-100":
                              isMatched && showResults && isCorrectMatch,
                            "text-red-900 dark:text-red-100":
                              isMatched && showResults && !isCorrectMatch,
                          }
                        )}
                      >
                        {item}
                      </span>
                    </div>

                    {isMatched && !showResults && (
                      <div className="flex w-full items-center gap-2 ms-5">
                        <div className="flex items-center space-x-2 px-2 py-1 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                          <ArrowRight className="w-3 h-3 text-blue-500" />
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                            {matches[item]}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMatch(item);
                          }}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-all duration-200 group-hover:scale-110 z-20"
                          type="button"
                          title="Remove match"
                        >
                          <X className="size-3 text-red-500" />
                        </button>
                      </div>
                    )}

                    {showResults && isMatched && (
                      <div className="flex items-center space-x-1">
                        {isCorrectMatch ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Invisible button overlay for clicking */}
                  {!showResults && (
                    <button
                      onClick={() => handleLeftItemClick(item)}
                      disabled={showResults}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:opacity-10 focus:bg-blue-100 dark:focus:bg-blue-900/20"
                      type="button"
                      aria-label={`Select ${item} to match`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 text-center">
            Match Options
          </h4>
          <div className="space-y-2">
            {rightItems.map((item, index) => {
              const isMatched = Object.values(matches).includes(item);
              const matchedBy = Object.keys(matches).find(
                (key) => matches[key] === item
              );
              const isCorrectMatch = showResults && isMatched && correct;
              const canSelect = selectedLeftItem && !showResults && !isMatched;
              const isWaitingForSelection =
                !selectedLeftItem && !showResults && !isMatched;

              return (
                <div
                  key={index}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 relative",
                    {
                      "border-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30":
                        showResults && isCorrectMatch,
                      "border-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30":
                        showResults && isMatched && !correct,
                      "border-blue-400 bg-gradient-to-r from-blue-25 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20":
                        isMatched && !showResults,
                      "border-gray-300 dark:border-gray-600 opacity-40 cursor-not-allowed":
                        isWaitingForSelection,
                      "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:border-blue-600 hover:shadow-lg hover:scale-102 cursor-pointer ring-2 ring-blue-200 dark:ring-blue-800":
                        canSelect,
                    }
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300 shrink-0",
                          {
                            "bg-green-500":
                              isMatched && showResults && isCorrectMatch,
                            "bg-red-500":
                              isMatched && showResults && !isCorrectMatch,
                            "bg-blue-400": isMatched && !showResults,
                            "bg-gray-400 dark:bg-gray-500":
                              isWaitingForSelection,
                            "bg-blue-500 animate-pulse": canSelect,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-all duration-300",
                          {
                            "text-green-900 dark:text-green-100":
                              isMatched && showResults && isCorrectMatch,
                            "text-red-900 dark:text-red-100":
                              isMatched && showResults && !isCorrectMatch,
                            "text-blue-900 dark:text-blue-100": canSelect,
                            "text-gray-500 dark:text-gray-400":
                              isWaitingForSelection,
                          }
                        )}
                      >
                        {item}
                      </span>
                    </div>

                    {matchedBy && !showResults && (
                      <div className="ms-5 flex items-center space-x-2 px-2 py-1 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 w-fit">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          {matchedBy}
                        </span>
                        <ArrowLeft className="w-3 h-3 text-blue-500" />
                      </div>
                    )}

                    {showResults && isMatched && (
                      <div className="flex items-center space-x-1">
                        {isCorrectMatch ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}

                    {canSelect && (
                      <div className="ms-5 text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                        Click to match
                      </div>
                    )}
                  </div>

                  {/* Invisible button overlay for clicking */}
                  {canSelect && (
                    <button
                      onClick={() => handleRightItemClick(item)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:opacity-10 focus:bg-blue-100 dark:focus:bg-blue-900/20"
                      type="button"
                      aria-label={`Match with ${item}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Instructions */}
      {!showResults && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-gray-600 dark:text-gray-400">
                  Selected item
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-gray-600 dark:text-gray-400">
                  Matched item
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full" />
                <span className="text-gray-600 dark:text-gray-400">
                  Available
                </span>
              </div>
            </div>

            {selectedLeftItem && (
              <div className="flex items-center justify-center space-x-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Selected:{" "}
                  <span className="font-semibold">
                    &quot;{selectedLeftItem}&quot;
                  </span>
                </p>
                <button
                  onClick={() => setSelectedLeftItem(null)}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline hover:no-underline transition-colors"
                >
                  Clear selection
                </button>
              </div>
            )}

            {Object.keys(matches).length === leftItems.length &&
              !showResults && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      All items matched! Ready to submit.
                    </span>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {showResults && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start space-x-3">
            {correct ? (
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p
                className={cn("font-medium", {
                  "text-green-800 dark:text-green-200": correct,
                  "text-red-800 dark:text-red-200": !correct,
                })}
              >
                {correct
                  ? "All matches correct!"
                  : "Some matches are incorrect"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {question.explanation}
              </p>
              {!correct && Array.isArray(question.correctAnswer) && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded border">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correct matches:
                  </p>
                  <div className="space-y-1">
                    {question.correctAnswer.map((item, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="font-medium">{item}</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>{question.correctAnswer[index + 1]}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
