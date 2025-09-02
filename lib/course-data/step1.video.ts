import { fetchDelays, mockFetch } from "../mockFetch";

export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  thumbnailUrl: string;
  transcript: string;
}

export const step1VideoData: VideoData = {
  id: "step1-video",
  title: "Welcome to Your Learning Journey",
  description:
    "Get started with the fundamentals of interactive learning and discover what you'll accomplish in this course.",
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  duration: "1:00",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center",
  transcript:
    "Welcome to your learning journey! In this introductory video, we'll explore the fundamental concepts that will guide you through this interactive course. You'll learn about progressive disclosure, active recall techniques, and spaced repetition. By the end of this course, you'll have a solid understanding of how to create engaging learning experiences that stick with your audience.",
};

export async function fetchStep1Video(): Promise<VideoData> {
  return mockFetch(step1VideoData, fetchDelays.video);
}
