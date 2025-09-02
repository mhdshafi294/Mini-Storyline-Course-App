import { fetchDelays, mockFetch } from "../mockFetch";

export interface QuizQuestion {
  id: string;
  type:
    | "multiple-choice"
    | "true-false"
    | "fill-blank"
    | "matching"
    | "ordering";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export const step2QuizData: QuizData = {
  id: "step2-quiz",
  title: "Learning Fundamentals Quiz",
  description:
    "Test your understanding of the key concepts from the introductory video.",
  passingScore: 70,
  timeLimit: 10,
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      question:
        "What is the primary goal of progressive disclosure in learning?",
      options: [
        "To overwhelm learners with information",
        "To reveal information gradually to improve comprehension",
        "To test learners immediately",
        "To skip difficult concepts",
      ],
      correctAnswer: "To reveal information gradually to improve comprehension",
      explanation:
        "Progressive disclosure helps learners build understanding step by step, reducing cognitive load and improving retention.",
      points: 10,
    },
    {
      id: "q2",
      type: "true-false",
      question:
        "Active recall is more effective for long-term retention than passive review.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Active recall strengthens memory by forcing the brain to retrieve information, creating stronger neural connections.",
      points: 10,
    },
    {
      id: "q3",
      type: "fill-blank",
      question:
        "The technique of reviewing material at increasing intervals is called _____.",
      correctAnswer: "spaced repetition",
      explanation:
        "Spaced repetition optimizes the timing of reviews to maximize long-term retention of information.",
      points: 15,
    },
    {
      id: "q4",
      type: "matching",
      question: "Match the learning technique with its primary benefit:",
      options: [
        "Progressive Disclosure",
        "Active Recall",
        "Spaced Repetition",
        "Reduced Cognitive Load",
        "Stronger Memory",
        "Better Retention",
      ],
      correctAnswer: [
        "Progressive Disclosure-Reduced Cognitive Load",
        "Active Recall-Stronger Memory",
        "Spaced Repetition-Better Retention",
      ],
      explanation:
        "Each technique serves a specific purpose in optimizing the learning process and improving outcomes.",
      points: 20,
    },
  ],
};

export async function fetchStep2Quiz(): Promise<QuizData> {
  return mockFetch(step2QuizData, fetchDelays.quiz);
}
