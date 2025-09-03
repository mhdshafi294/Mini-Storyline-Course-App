"use client";

import type { QuizQuestion } from "@/lib/course-data/step2.quiz";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

interface OrderingQuestionProps {
  question: QuizQuestion;
  answer?: string[];
  onAnswer: (answer: string[]) => void;
  showResults: boolean;
}

interface SortableItemProps {
  id: string;
  item: string;
  index: number;
  showResults: boolean;
  isCorrectPosition: boolean;
}

const SortableItem = memo(function SortableItem({
  id,
  item,
  index,
  showResults,
  isCorrectPosition,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging
      ? "none"
      : transition ||
        "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 200ms ease-out",
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 select-none",
        {
          "border-green-500 bg-green-50 dark:bg-green-900/20":
            showResults && isCorrectPosition,
          "border-red-500 bg-red-50 dark:bg-red-900/20":
            showResults && !isCorrectPosition,
          "border-gray-200 dark:border-gray-700":
            !showResults || isCorrectPosition,
          "opacity-70 scale-105 shadow-2xl border-blue-400 dark:border-blue-500 shadow-blue-200 dark:shadow-blue-900/50":
            isDragging,
          "shadow-md ": !isDragging && !showResults,
          "hover:border-gray-300 dark:hover:border-gray-600": !showResults,
          "ring-2 ring-blue-300 dark:ring-blue-600 ring-opacity-50": isOver,
          "transform-gpu": isDragging, // Use GPU acceleration for smoother animation
        }
      )}
    >
      {/* Drag Handle */}
      {!showResults && (
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 hover:shadow-sm"
          aria-label={`Drag to reorder ${item}`}
          tabIndex={0}
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-active:text-blue-600 group-hover:scale-110 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      )}

      {/* Order Number */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
          {
            "bg-green-500 text-white": showResults && isCorrectPosition,
            "bg-red-500 text-white": showResults && !isCorrectPosition,
            "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300":
              !showResults,
          }
        )}
      >
        {index + 1}
      </div>

      {/* Item Text */}
      <div className="flex-1">
        <span className="font-medium">{item}</span>
      </div>

      {/* Result Indicator */}
      {showResults && (
        <div className="flex items-center space-x-1">
          {isCorrectPosition ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
        </div>
      )}
    </div>
  );
});

export const OrderingQuestion = memo(function OrderingQuestion({
  question,
  answer,
  onAnswer,
  showResults,
}: OrderingQuestionProps) {
  const [items, setItems] = useState<string[]>([]);
  const previousAnswerRef = useRef<string[]>([]);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (question.options) {
      // Initialize with existing answer or shuffled options
      if (answer && Array.isArray(answer)) {
        setItems(answer);
      } else {
        // Shuffle the options for the initial state
        const shuffled = [...question.options].sort(() => Math.random() - 0.5);
        setItems(shuffled);
      }
    }
  }, [question.options, answer]);

  useEffect(() => {
    // Only call onAnswer if the answer actually changed
    const answerChanged =
      items.length !== previousAnswerRef.current.length ||
      !items.every((item, index) => item === previousAnswerRef.current[index]);

    if (answerChanged) {
      previousAnswerRef.current = [...items];
      onAnswer(items);
    }
  }, [items, onAnswer]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item === active.id);
      const newIndex = items.findIndex((item) => item === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setItems((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  const isCorrect = () => {
    if (!Array.isArray(question.correctAnswer)) return false;
    return (
      items.length === question.correctAnswer.length &&
      items.every((item, index) => item === question.correctAnswer[index])
    );
  };

  const correct = isCorrect();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {question.question}
      </h3>

      {/* Instructions with enhanced styling */}
      {!showResults && (
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <span>
              Drag items using the handle (≡) to reorder them in the correct
              sequence
            </span>
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => {
          // Add a subtle vibration effect on drag start for mobile
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 relative">
            {/* Drop zones for visual feedback */}
            {items.map((_, index) => (
              <div
                key={`drop-zone-${index}`}
                className="absolute left-0 right-0 h-2 bg-blue-200 dark:bg-blue-800 rounded opacity-0 transition-opacity duration-200 pointer-events-none"
                style={{
                  top: `${index * 72 + 36}px`, // Position between items
                  zIndex: 10,
                }}
              />
            ))}
            {items.map((item, index) => {
              const isCorrectPosition =
                showResults &&
                Array.isArray(question.correctAnswer) &&
                item === question.correctAnswer[index];

              return (
                <SortableItem
                  key={item}
                  id={item}
                  item={item}
                  index={index}
                  showResults={showResults}
                  isCorrectPosition={isCorrectPosition}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Instructions */}
      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        {!showResults ? (
          <p>Drag the items to arrange them in the correct order.</p>
        ) : (
          <div className="flex items-start space-x-2">
            {correct ? (
              <svg
                className="w-5 h-5 text-green-500 mt-0.5"
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
              <svg
                className="w-5 h-5 text-red-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <div>
              <p
                className={cn("font-medium", {
                  "text-green-800 dark:text-green-200": correct,
                  "text-red-800 dark:text-red-200": !correct,
                })}
              >
                {correct ? "Perfect order!" : "Incorrect order"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {question.explanation}
              </p>
              {!correct && Array.isArray(question.correctAnswer) && (
                <div className="mt-2">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Correct order:
                  </p>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 ml-4">
                    {question.correctAnswer.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
