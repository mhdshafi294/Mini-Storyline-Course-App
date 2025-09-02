"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NavControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function NavControls({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: NavControlsProps) {
  const hasPrevious = currentStep > 1;
  const hasNext = currentStep < totalSteps;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center space-x-4">
        {hasPrevious && (
          <Link href={`/course/mini/step/${currentStep - 1}`}>
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
          </Link>
        )}

        {/* <Link href="/">
          <Button variant="ghost" className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </Link> */}
      </div>

      <div className="flex items-center space-x-4">
        {hasNext && (
          <Link href={`/course/mini/step/${currentStep + 1}`}>
            <Button onClick={onNext} className="flex items-center space-x-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        )}

        {isLastStep && (
          <Link href="/">
            <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
              <span>Complete Course</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
