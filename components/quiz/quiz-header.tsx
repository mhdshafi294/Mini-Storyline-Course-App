"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizHeaderProps {
  title: string;
  description: string;
  timeLimit: number | null; // Initial time limit in minutes
  showResults: boolean;
  onTimeUp: () => void; // Callback when time runs out
}

export function QuizHeader({
  title,
  description,
  timeLimit,
  showResults,
  onTimeUp,
}: QuizHeaderProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Initialize timer when timeLimit changes
  useEffect(() => {
    if (timeLimit !== null) {
      setTimeLeft(timeLimit * 60); // Convert minutes to seconds
    } else {
      setTimeLeft(null);
    }
  }, [timeLimit]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          onTimeUp(); // Notify parent when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResults, onTimeUp]);

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>

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
  );
}
