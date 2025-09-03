"use client";

import { StepSkeleton } from "@/components/loaders/step-skeleton";
import { NavControls } from "@/components/nav-controls";
import { useCourseStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Lazy load components for each step type
const Step1Video = lazy(() => import("@/components/video/video-lesson"));
const StepQuiz = lazy(() => import("@/components/quiz/quiz-engine"));
const Step3Content = lazy(() => import("@/components/content/content-view"));

import { lazy } from "react";

export default function StepPage() {
  const params = useParams();
  const stepNumber = parseInt(params.n as string, 10);
  const { setCurrentStep, totalSteps } = useCourseStore();

  // Update current step when route changes
  useEffect(() => {
    setCurrentStep(stepNumber);
  }, [stepNumber, setCurrentStep]);

  const renderStepContent = () => {
    switch (stepNumber) {
      case 1:
        return <Step1Video />;
      case 2:
        return <StepQuiz stepNumber={2} />;
      case 3:
        return <Step3Content />;
      case 4:
        return <StepQuiz stepNumber={4} />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Step Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The requested step does not exist.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100dvh-140px)]">
      {/* Step Content with Suspense */}
      <Suspense fallback={<StepSkeleton />}>
        <div className="container mx-auto px-4 py-8">{renderStepContent()}</div>
      </Suspense>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <NavControls currentStep={stepNumber} totalSteps={totalSteps} />
      </div>
    </div>
  );
}
