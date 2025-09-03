"use client";

import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function QuizProgress({
  currentQuestionIndex,
  totalQuestions,
}: QuizProgressProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}


