import { fetchDelays, mockFetch } from "../mockFetch";

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: "text" | "list" | "code" | "image";
  imageUrl?: string;
  code?: string;
}

export interface ContentData {
  id: string;
  title: string;
  description: string;
  sections: ContentSection[];
  estimatedReadTime: number; // in minutes
}

export const step3ContentData: ContentData = {
  id: "step3-content",
  title: "Advanced Learning Techniques",
  description:
    "Explore advanced strategies for creating effective learning experiences.",
  estimatedReadTime: 8,
  sections: [
    {
      id: "section1",
      title: "The Science of Learning",
      type: "text",
      content:
        "Understanding how the brain processes and retains information is crucial for designing effective learning experiences. Research in cognitive science has revealed several key principles that can significantly improve learning outcomes.",
    },
    {
      id: "section2",
      title: "Key Learning Principles",
      type: "list",
      content:
        "Cognitive Load Theory: Information should be presented in manageable chunks to avoid overwhelming working memory.\n\nDual Coding: Combining verbal and visual information improves comprehension and retention.\n\nContext-Dependent Learning: Learning is enhanced when new information is presented in meaningful contexts.\n\nMetacognition: Teaching learners how to think about their own learning process improves outcomes.",
    },
    {
      id: "section3",
      title: "Practical Implementation",
      type: "code",
      code: `// Example of chunking information
const learningModule = {
  title: "Advanced Techniques",
  chunks: [
    { topic: "Cognitive Load", duration: "5min" },
    { topic: "Dual Coding", duration: "5min" },
    { topic: "Context Learning", duration: "5min" }
  ],
  assessment: "Quiz after each chunk"
};`,
      content:
        "Here's how to structure learning content using cognitive principles:",
    },
    {
      id: "section4",
      title: "Visual Learning Aids",
      type: "image",
      imageUrl: "/api/placeholder/600/300",
      content:
        "Visual representations can significantly enhance understanding and retention of complex concepts.",
    },
  ],
};

export async function fetchStep3Content(): Promise<ContentData> {
  return mockFetch(step3ContentData, fetchDelays.content);
}
