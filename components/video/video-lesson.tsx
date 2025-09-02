"use client";

import { Button } from "@/components/ui/button";
import { fetchStep1Video, type VideoData } from "@/lib/course-data/step1.video";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VideoLesson() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await fetchStep1Video();
        setVideoData(data);
      } catch (error) {
        console.error("Failed to load video:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, []);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoData) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      console.log("Video loaded successfully, duration:", video.duration);
    };

    const handleTimeUpdate = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log("Video started playing");
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log("Video paused");
    };

    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      const target = e.target as HTMLVideoElement;
      if (target?.error) {
        console.error("Video error code:", target.error.code);
        console.error("Video error message:", target.error.message);

        let errorMessage = "Video failed to load";
        switch (target.error.code) {
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading video";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Video format not supported";
            break;
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Video loading was aborted";
            break;
          default:
            errorMessage = "Unknown video error";
        }
        setVideoError(errorMessage);
      }
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoError(null);
    };

    const handleWaiting = () => {
      console.log("Video is buffering");
      setIsBuffering(true);
    };

    const handleCanPlayThrough = () => {
      console.log("Video can play through");
      setIsBuffering(false);
    };

    // Add event listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplaythrough", handleCanPlayThrough);

    // Force load the video
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [videoData]);

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const togglePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Video playback error:", error);
      // Handle autoplay restrictions or other playback errors
      if (error instanceof Error && error.name === "NotAllowedError") {
        console.log("Autoplay blocked - user interaction required");
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;

    video.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when video is focused or controls are visible
      if (
        !videoRef.current ||
        (!showControls && document.activeElement !== videoRef.current)
      )
        return;

      const video = videoRef.current;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          // Inline play/pause logic to avoid dependency issues
          if (video.paused) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case "KeyM":
          e.preventDefault();
          video.muted = !video.muted;
          break;
        case "KeyF":
          e.preventDefault();
          // Inline fullscreen logic
          if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen?.();
          } else {
            document.exitFullscreen?.();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showControls]);

  if (loading) {
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

  if (!videoData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Video
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Video Player */}
      <div
        ref={containerRef}
        className="relative bg-black rounded-lg overflow-hidden group cursor-pointer"
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          poster={
            videoData?.thumbnailUrl ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&crop=center"
          }
          preload="metadata"
          playsInline
          controls={false}
          onClick={togglePlayPause}
        >
          <source
            src={
              videoData?.videoUrl ||
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
            type="video/mp4"
          />
          {/* Fallback video sources */}
          <source
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. Please try a different
          browser or update your current one.
        </video>

        {/* Error Overlay */}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2">Video Error</h3>
              <p className="text-sm opacity-80 mb-4">{videoError}</p>
              <button
                onClick={() => {
                  setVideoError(null);
                  const video = videoRef.current;
                  if (video) {
                    video.load();
                  }
                }}
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Buffering Overlay */}
        {isBuffering && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex items-center space-x-2 text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              <span className="text-sm">Buffering...</span>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !isBuffering && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg group"
            >
              <Play className="w-8 h-8 text-black ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar */}
          <div
            className="w-full bg-white/20 rounded-full h-2 mb-4 cursor-pointer hover:h-3 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div
              className="bg-white h-full rounded-full transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20 hover:scale-110 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 hover:scale-110 transition-all"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>

              <div className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 hover:scale-110 transition-all"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Information */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {videoData.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {videoData.description}
          </p>
        </div>

        {/* Transcript Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Transcript
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {videoData.transcript}
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
          <Button
            size="lg"
            className="px-8"
            onClick={() => {
              // In a real app, this would mark the step as completed
              console.log("Video completed!");
            }}
          >
            Mark as Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
