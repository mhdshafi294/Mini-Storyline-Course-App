"use client";

import { useCourseStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StepTracker() {
  const { currentStep, totalSteps } = useCourseStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Course Progress
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="w-full flex items-center justify-between space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              className={cn("flex items-center flex-1", {
                "w-fit flex-0": stepNumber === totalSteps,
              })}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ease-out transform",
                  {
                    "bg-accent border-accent text-accent-foreground scale-100":
                      isCompleted,
                    "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30":
                      isCurrent,
                    "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors":
                      isUpcoming,
                  }
                )}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4 animate-in zoom-in-50 duration-300"
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
                  <span className="text-sm font-medium transition-all duration-300">
                    {stepNumber}
                  </span>
                )}
              </div>

              {stepNumber < totalSteps ? (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-700 ease-out",
                    {
                      "bg-accent shadow-sm": isCompleted,
                      "bg-primary shadow-md animate-pulse": isCurrent,
                      "bg-gray-300 dark:bg-gray-600": isUpcoming,
                    }
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-500">
          {Math.round(((currentStep - 1) / totalSteps) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}
