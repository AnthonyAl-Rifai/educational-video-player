'use client';

import { useEffect, useState, useRef, RefObject, useCallback } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';
import { formatTime } from '@/lib/video';

function getVideoEl(ref?: RefObject<HTMLVideoElement | null>) {
  return ref?.current ?? null;
}

interface ProgressBarProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function ProgressBar({ videoRef }: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Update current time
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v && !isDragging) {
      setCurrentTime(v.currentTime);
    }
  };

  // Update duration when metadata loads
  const onLoadedMetadata = () => {
    const v = getVideoEl(videoRef);
    if (v) {
      setDuration(v.duration);
    }
  };

  // Use the custom hook to listen to video events
  usePlayerEvent(videoRef, 'timeupdate', onTimeUpdate);
  usePlayerEvent(videoRef, 'loadedmetadata', onLoadedMetadata);

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle seeking
  const handleSeek = useCallback(
    (clientX: number) => {
      const v = getVideoEl(videoRef);
      const bar = progressBarRef.current;
      if (!bar || !v) return;

      // Get the bounding box of the progress bar to translate click position into a fraction
      const rect = bar.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const fraction = offsetX / rect.width;

      // clamp between 0 and 1
      const clamped = Math.max(0, Math.min(1, fraction));

      const newTime = clamped * duration;

      v.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [videoRef, duration],
  );

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSeek(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleSeek(e.clientX);
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, duration, handleSeek]);

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="group relative h-2 w-full cursor-pointer rounded-full bg-white/30 transition-all hover:h-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Progress fill */}
        <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progressPercentage}%` }} />

        {/* Progress handle */}
        <div
          className={`absolute top-1/2 h-4 w-4 rounded-full bg-white transition-all ${
            isHovering || isDragging ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{
            left: `${progressPercentage}%`,
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        />
      </div>

      {/* Time display */}
      <div className="mt-1 flex justify-between text-xs text-white/80">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
