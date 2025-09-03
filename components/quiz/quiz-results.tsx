"use client";

import { Button } from "@/components/ui/button";
import { type QuizData } from "@/lib/course-data/step2.quiz";
import { useCourseStore } from "@/lib/store";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface QuizResultsProps {
  quizData: QuizData;
  answers: Record<string, string | boolean | Record<string, string> | string[]>;
  onRetry: () => void;
}

export function QuizResults({ quizData, answers, onRetry }: QuizResultsProps) {
  const { currentStep } = useCourseStore();
  const calculateScore = () => {
    let totalScore = 0;
    quizData.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer !== undefined) {
        // Simple scoring - in a real app, this would be more sophisticated
        if (Array.isArray(question.correctAnswer)) {
          if (
            Array.isArray(userAnswer) &&
            question.correctAnswer.length === userAnswer.length &&
            question.correctAnswer.every(
              (ans, index) => ans === userAnswer[index]
            )
          ) {
            totalScore += question.points;
          }
        } else if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      }
    });

    return Math.round(
      (totalScore / quizData.questions.reduce((sum, q) => sum + q.points, 0)) *
        100
    );
  };

  const score = calculateScore();
  const passed = score >= quizData.passingScore;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Results
        </h1>

        <div
          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
            passed
              ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
          }`}
        >
          {passed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <span className="text-lg font-semibold">
            {passed ? "Passed!" : "Try Again"}
          </span>
        </div>

        <div className="mt-6">
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {score}%
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Passing score: {quizData.passingScore}%
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Question Review
        </h3>
        <div className="space-y-3">
          {quizData.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = Array.isArray(question.correctAnswer)
              ? Array.isArray(userAnswer) &&
                question.correctAnswer.length === userAnswer.length &&
                question.correctAnswer.every(
                  (ans, idx) => ans === userAnswer[idx]
                )
              : userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded"
              >
                <span className="text-sm font-medium">
                  Question {index + 1}: {question.question.slice(0, 50)}...
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {userAnswer
                      ? isCorrect
                        ? "Correct"
                        : "Incorrect"
                      : "Not answered"}
                  </span>
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        {passed ? (
          <Link href={`/course/mini/step/${currentStep + 1}`}>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Continue to Next Step
            </Button>
          </Link>
        ) : (
          <Button size="lg" onClick={onRetry}>
            {passed ? "Continue to Next Step" : "Retry Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
