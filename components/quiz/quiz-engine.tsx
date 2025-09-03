"use client";

import {
  fetchStep2Quiz,
  type QuizData,
  type QuizQuestion,
} from "@/lib/course-data/step2.quiz";
import { fetchStep4Quiz as fetchStep4Data } from "@/lib/course-data/step4.quiz";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FillBlankQuestion } from "./items/fill-blank";
import { MatchingQuestion } from "./items/matching";
import { MultipleChoiceQuestion } from "./items/multiple-choice";
import { OrderingQuestion } from "./items/ordering";
import { TrueFalseQuestion } from "./items/true-false";
import { QuizError } from "./quiz-error";
import { QuizHeader } from "./quiz-header";
import { QuizLoading } from "./quiz-loading";
import { QuizNavigation } from "./quiz-navigation";
import { QuizProgress } from "./quiz-progress";
import { QuizResults } from "./quiz-results";

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
      } catch (error) {
        console.error("Failed to load quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [stepNumber]);

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

  const handleTimeUp = useCallback(() => {
    setShowResults(true);
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex, quizData?.questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const currentQuestion = useMemo(
    () => quizData?.questions?.[currentQuestionIndex],
    [quizData, currentQuestionIndex]
  );

  const renderQuestion = useCallback(
    (question: QuizQuestion) => {
      const answer = answers[question.id];

      switch (question.type) {
        case "multiple-choice":
          return (
            <MultipleChoiceQuestion
              key={question.id}
              question={question}
              answer={answer as string | undefined}
              onAnswer={(answer: string) => handleAnswer(question.id, answer)}
              showResults={showResults}
            />
          );
        case "true-false":
          return (
            <TrueFalseQuestion
              key={question.id}
              question={question}
              answer={answer as string | undefined}
              onAnswer={(answer: string) => handleAnswer(question.id, answer)}
              showResults={showResults}
            />
          );
        case "fill-blank":
          return (
            <FillBlankQuestion
              key={question.id}
              question={question}
              answer={answer as string | undefined}
              onAnswer={(answer: string) => handleAnswer(question.id, answer)}
              showResults={showResults}
            />
          );
        case "matching":
          return (
            <MatchingQuestion
              key={question.id}
              question={question}
              answer={answer as string[] | undefined}
              onAnswer={(answer: string[]) => handleAnswer(question.id, answer)}
              showResults={showResults}
            />
          );
        case "ordering":
          return (
            <OrderingQuestion
              key={question.id}
              question={question}
              answer={answer as string[] | undefined}
              onAnswer={(answer: string[]) => handleAnswer(question.id, answer)}
              showResults={showResults}
            />
          );
        default:
          return <div>Unsupported question type</div>;
      }
    },
    [handleAnswer, showResults]
  );

  if (loading) {
    return <QuizLoading />;
  }

  if (!quizData) {
    return <QuizError />;
  }

  if (showResults) {
    return (
      <QuizResults
        quizData={quizData}
        answers={answers}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <QuizHeader
        title={quizData.title}
        description={quizData.description}
        timeLimit={quizData.timeLimit || null}
        showResults={showResults}
        onTimeUp={handleTimeUp}
      />

      {/* Progress */}
      <QuizProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizData.questions.length}
      />

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {currentQuestion ? (
          renderQuestion(currentQuestion)
        ) : (
          <div>Loading question...</div>
        )}
      </div>

      {/* Navigation */}
      <QuizNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizData.questions.length}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
        hasAnswer={
          currentQuestion ? answers[currentQuestion.id] !== undefined : false
        }
      />
    </div>
  );
}
