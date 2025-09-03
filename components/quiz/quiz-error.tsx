"use client";

export function QuizError() {
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




