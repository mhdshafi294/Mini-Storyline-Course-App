"use client";

import { Button } from "@/components/ui/button";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: string) => void;
  onLoad?: (duration: number) => void;
}

export default function VideoPlayer({
  src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  poster,
  className = "",
  autoPlay = false,
  muted = false,
  onTimeUpdate,
  onPlay,
  onPause,
  onError,
  onLoad,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
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

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      onLoad?.(video.duration);
    };

    const handleTimeUpdate = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        const time = video.currentTime;
        const prog = (time / video.duration) * 100;
        setCurrentTime(time);
        setProgress(prog);
        onTimeUpdate?.(time, video.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      if (target?.error) {
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
        onError?.(errorMessage);
      }
    };

    const handleCanPlay = () => {
      setVideoError(null);
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleCanPlayThrough = () => {
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
  }, [onTimeUpdate, onPlay, onPause, onError, onLoad]);

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
      } else {
        await video.play();
      }
    } catch (error) {
      console.error("Video playback error:", error);
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

  // Keyboard shortcuts
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

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group cursor-pointer ${className}`}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster={poster}
        preload="metadata"
        playsInline
        controls={false}
        autoPlay={autoPlay}
        muted={muted}
        onClick={togglePlayPause}
      >
        <source src={src} type="video/mp4" />
        <source
          src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
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
  );
}
