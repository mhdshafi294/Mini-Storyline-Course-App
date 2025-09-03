"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  fetchStep2Quiz,
  type QuizData,
  type QuizQuestion,
} from "@/lib/course-data/step2.quiz";
import { fetchStep4Quiz as fetchStep4Data } from "@/lib/course-data/step4.quiz";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FillBlankQuestion } from "./items/fill-blank";
import { MatchingQuestion } from "./items/matching";
import { MultipleChoiceQuestion } from "./items/multiple-choice";
import { OrderingQuestion } from "./items/ordering";
import { TrueFalseQuestion } from "./items/true-false";

interface QuizEngineProps {
  stepNumber: number;
}

export default function QuizEngine({ stepNumber }: QuizEngineProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, string | boolean | Record<string, string> | string[]>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        let data: QuizData;
        if (stepNumber === 2) {
          data = await fetchStep2Quiz();
        } else if (stepNumber === 4) {
          data = await fetchStep4Data();
        } else {
          throw new Error("Invalid step number for quiz");
        }
        setQuizData(data);
        if (data.timeLimit) {
          setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
        }
      } catch (error) {
        console.error("Failed to load quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [stepNumber]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  const handleAnswer = useCallback(
    (
      questionId: string,
      answer: string | boolean | Record<string, string> | string[]
    ) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    },
    []
  );

  const nextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    if (!quizData) return 0;

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

  const renderQuestion = (question: QuizQuestion) => {
    const answer = answers[question.id];

    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion
            question={question}
            answer={answer as string | undefined}
            onAnswer={(answer: string) => handleAnswer(question.id, answer)}
            showResults={showResults}
          />
        );
      case "true-false":
        return (
          <TrueFalseQuestion
            question={question}
            answer={answer as string | undefined}
            onAnswer={(answer: string) => handleAnswer(question.id, answer)}
            showResults={showResults}
          />
        );
      case "fill-blank":
        return (
          <FillBlankQuestion
            question={question}
            answer={answer as string | undefined}
            onAnswer={(answer: string) => handleAnswer(question.id, answer)}
            showResults={showResults}
          />
        );
      case "matching":
        return (
          <MatchingQuestion
            question={question}
            answer={answer as string[] | undefined}
            onAnswer={(answer: string[]) => handleAnswer(question.id, answer)}
            showResults={showResults}
          />
        );
      case "ordering":
        return (
          <OrderingQuestion
            question={question}
            answer={answer as string[] | undefined}
            onAnswer={(answer: string[]) => handleAnswer(question.id, answer)}
            showResults={showResults}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded animate-pulse" />
          <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Quiz
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
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
          <Button
            size="lg"
            onClick={() => window.location.reload()}
            className={passed ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {passed ? "Continue to Next Step" : "Retry Quiz"}
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {quizData.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {quizData.description}
        </p>

        {/* Timer */}
        {timeLeft !== null && (
          <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {renderQuestion(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={answers[currentQuestion.id] === undefined}
        >
          {currentQuestionIndex === quizData.questions.length - 1
            ? "Finish Quiz"
            : "Next"}
        </Button>
      </div>
    </div>
  );
}
