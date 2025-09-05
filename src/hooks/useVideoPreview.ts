import { useRef, useState, useCallback } from 'react';
import { usePlayerEvent } from './usePlayerEvent';

interface UseVideoPreviewReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  durationSeconds: number | null;
  remainingSeconds: number | null;
  isPreviewPlaying: boolean;
  startHoverPreview: () => void;
  stopHoverPreview: () => void;
}

export function useVideoPreview(): UseVideoPreviewReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Set initial duration and countdown when metadata loads
  const onLoadedMetadata = useCallback(() => {
    const el = videoRef.current;
    if (el?.duration && durationSeconds === null) {
      setDurationSeconds(el.duration);
      setRemainingSeconds(el.duration);
    }
  }, [durationSeconds]);

  // Update remaining time as the video plays
  const onTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (el && durationSeconds !== null) {
      setRemainingSeconds(Math.max(0, durationSeconds - el.currentTime));
    }
  }, [durationSeconds]);

  // Track when the preview starts and stops
  const onPlay = useCallback(() => setIsPreviewPlaying(true), []);
  const onPause = useCallback(() => setIsPreviewPlaying(false), []);

  // Reset playback and countdown when preview ends
  const onEnded = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      setIsPreviewPlaying(false);
      setRemainingSeconds(durationSeconds);
      el.currentTime = 0;
    }
  }, [durationSeconds]);

  // Register video event listeners
  usePlayerEvent(videoRef, 'loadedmetadata', onLoadedMetadata);
  usePlayerEvent(videoRef, 'loadeddata', onLoadedMetadata);
  usePlayerEvent(videoRef, 'timeupdate', onTimeUpdate);
  usePlayerEvent(videoRef, 'play', onPlay);
  usePlayerEvent(videoRef, 'pause', onPause);
  usePlayerEvent(videoRef, 'ended', onEnded);

  // Start the hover preview from the beginning
  const startHoverPreview = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  }, []);

  // Stop the preview and reset time and countdown
  const stopHoverPreview = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      setRemainingSeconds(durationSeconds);
    }
  }, [durationSeconds]);

  return {
    videoRef,
    durationSeconds,
    remainingSeconds,
    isPreviewPlaying,
    startHoverPreview,
    stopHoverPreview,
  };
}
