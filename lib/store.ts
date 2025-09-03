"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CourseState {
  currentStep: number;
  completedSteps: number[];
  quizScores: Record<number, number>;
  totalSteps: number;

  // Actions
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  setQuizScore: (step: number, score: number) => void;
  resetProgress: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      currentStep: 1,
      completedSteps: [],
      quizScores: {},
      totalSteps: 4,

      setCurrentStep: (step: number) => set({ currentStep: step }),

      completeStep: (step: number) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),

      setQuizScore: (step: number, score: number) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [step]: score },
        })),

      resetProgress: () =>
        set({
          currentStep: 1,
          completedSteps: [],
          quizScores: {},
        }),
    }),
    {
      name: "course-progress",
    }
  )
);

// Helper hooks for specific functionality
export const useCurrentStep = () =>
  useCourseStore((state) => state.currentStep);
export const useCompletedSteps = () =>
  useCourseStore((state) => state.completedSteps);
export const useQuizScores = () => useCourseStore((state) => state.quizScores);
export const useProgress = () => {
  const { completedSteps, totalSteps } = useCourseStore();
  return Math.round((completedSteps.length / totalSteps) * 100);
};
