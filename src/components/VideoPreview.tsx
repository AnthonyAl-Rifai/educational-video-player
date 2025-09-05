'use client';

import { useEffect } from 'react';
import { formatTime } from '@/lib/video';
import { useVideoPreview } from '@/hooks/useVideoPreview';

interface VideoPreviewProps {
  src: string;
  title: string;
  isPlaying: boolean;
  inSidebar?: boolean;
}

export default function VideoPreview({
  src,
  title,
  isPlaying,
  inSidebar = false,
}: VideoPreviewProps) {
  const {
    videoRef,
    durationSeconds,
    remainingSeconds,
    isPreviewPlaying,
    startHoverPreview,
    stopHoverPreview,
  } = useVideoPreview();

  // Control preview based on parent's play state
  useEffect(() => {
    if (isPlaying) {
      startHoverPreview();
    } else {
      stopHoverPreview();
    }
  }, [isPlaying, startHoverPreview, stopHoverPreview]);
  return (
    <div
      className={`relative aspect-video overflow-hidden ${inSidebar ? 'rounded-lg' : 'rounded-xl'} bg-gray-200`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        controls={false}
        className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        aria-label={title}
      />
      <span
        className={`pointer-events-none absolute rounded bg-black/80 font-semibold text-white ${
          inSidebar
            ? 'right-1 bottom-1 px-1 py-0.5 text-xs'
            : 'right-2 bottom-2 px-1.5 py-0.5 text-xs'
        }`}
      >
        {isPreviewPlaying
          ? formatTime(remainingSeconds)
          : formatTime(durationSeconds)}
      </span>
    </div>
  );
}
