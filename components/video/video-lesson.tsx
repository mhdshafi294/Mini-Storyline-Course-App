"use client";

import { buttonVariants } from "@/components/ui/button";
import { fetchStep1Video } from "@/lib/course-data/step1.video";
import { useCourseStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import VideoPlayer from "./video-player";

export default function VideoLesson() {
  const params = useParams();
  const stepNumber = parseInt(params.n as string, 10);
  const { setCurrentStep } = useCourseStore();

  // Load video data with React Query
  const {
    data: videoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["video", "step1"],
    queryFn: fetchStep1Video,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Video Loading Skeleton */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg">Loading video...</p>
            </div>
          </div>
        </div>

        {/* Content Loading Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Video
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message || "Please try refreshing the page."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Video Player */}
      <VideoPlayer
        src={videoData!.videoUrl}
        poster={
          videoData!.thumbnailUrl ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center"
        }
        onLoad={(duration) => console.log("Video loaded, duration:", duration)}
        onPlay={() => console.log("Video started playing")}
        onPause={() => console.log("Video paused")}
        onError={(error) => console.error("Video error:", error)}
      />

      {/* Video Information */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {videoData!.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {videoData!.description}
          </p>
        </div>

        {/* Transcript Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Transcript
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {videoData!.transcript}
          </p>
        </div>

        {/* Video Controls Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Keyboard Shortcuts
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-blue-800 dark:text-blue-200">
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">
                Space
              </kbd>
              <span>Play/Pause</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">
                ←→
              </kbd>
              <span>Seek ±10s</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">
                M
              </kbd>
              <span>Mute/Unmute</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs">
                F
              </kbd>
              <span>Fullscreen</span>
            </div>
          </div>
        </div>

        {/* Completion Action */}
        <div className="flex justify-center pt-6">
          <Link
            href={`/course/mini/step/${stepNumber + 1}`}
            onClick={() => setCurrentStep(stepNumber + 1)}
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
                className: "px-8",
              })
            )}
          >
            Mark as Complete
          </Link>
        </div>
      </div>
    </div>
  );
}
