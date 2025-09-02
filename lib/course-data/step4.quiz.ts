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

export const step4QuizData: QuizData = {
  id: "step4-quiz",
  title: "Final Assessment",
  description:
    "Demonstrate your mastery of all learning concepts covered in this course.",
  passingScore: 80,
  timeLimit: 15,
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      question:
        "Which of the following is NOT a principle of effective learning design?",
      options: [
        "Progressive disclosure of information",
        "Immediate testing without prior instruction",
        "Context-dependent learning",
        "Metacognitive awareness",
      ],
      correctAnswer: "Immediate testing without prior instruction",
      explanation:
        "Immediate testing without instruction would hinder learning rather than enhance it. Learners need foundational knowledge first.",
      points: 15,
    },
    {
      id: "q2",
      type: "ordering",
      question: "Arrange the learning process steps in the optimal order:",
      options: [
        "Present Information",
        "Practice Retrieval",
        "Provide Feedback",
        "Apply in Context",
      ],
      correctAnswer: [
        "Present Information",
        "Practice Retrieval",
        "Provide Feedback",
        "Apply in Context",
      ],
      explanation:
        "This sequence follows evidence-based learning science: introduce concepts, practice recall, get feedback, then apply knowledge.",
      points: 25,
    },
    {
      id: "q3",
      type: "true-false",
      question:
        "Spaced repetition is more effective than massed practice for long-term retention.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Spaced repetition distributes learning over time, strengthening memory consolidation and improving long-term retention.",
      points: 10,
    },
    {
      id: "q4",
      type: "fill-blank",
      question:
        "The theory that explains why we can only hold 7±2 items in working memory is called _____.",
      correctAnswer: "cognitive load theory",
      explanation:
        "Cognitive Load Theory explains the limitations of working memory and guides the design of instructional materials.",
      points: 15,
    },
    {
      id: "q5",
      type: "matching",
      question: "Match the learning strategy with its primary benefit:",
      options: [
        "Dual Coding",
        "Active Recall",
        "Progressive Disclosure",
        "Enhanced Comprehension",
        "Stronger Neural Connections",
        "Reduced Cognitive Overload",
      ],
      correctAnswer: [
        "Dual Coding-Enhanced Comprehension",
        "Active Recall-Stronger Neural Connections",
        "Progressive Disclosure-Reduced Cognitive Overload",
      ],
      explanation:
        "Each strategy targets specific cognitive processes to optimize learning effectiveness.",
      points: 20,
    },
  ],
};

export async function fetchStep4Quiz(): Promise<QuizData> {
  return mockFetch(step4QuizData, fetchDelays.quiz);
}
