"use client";

import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  hasAnswer: boolean;
}

export function QuizNavigation({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  hasAnswer,
}: QuizNavigationProps) {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={isFirstQuestion}>
        Previous
      </Button>

      <Button onClick={onNext} disabled={!hasAnswer}>
        {isLastQuestion ? "Finish Quiz" : "Next"}
      </Button>
    </div>
  );
}




