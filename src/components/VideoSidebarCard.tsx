'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import dayjs from '@/lib/dayjs';
import type { Video } from '@/types';

// Format seconds as M:SS (e.g., 125 -> "2:05")
function formatDurationMMSS(totalSeconds: number | null): string {
  if (totalSeconds == null || !isFinite(totalSeconds) || totalSeconds <= 0) {
    return '–:–';
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

interface VideoSidebarCardProps {
  video: Video;
}

export default function VideoSidebarCard({ video }: VideoSidebarCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Initialize duration from metadata
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onLoadedMetadata = () => {
      setDurationSeconds(el.duration);
      setRemainingSeconds(el.duration);
    };
    el.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => el.removeEventListener('loadedmetadata', onLoadedMetadata);
  }, []);

  // Track countdown + playing state
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onTime = () =>
      setRemainingSeconds(Math.max(0, (durationSeconds ?? 0) - el.currentTime));
    const onPlay = () => setIsPreviewPlaying(true);
    const onPause = () => setIsPreviewPlaying(false);
    const onEnded = () => {
      setIsPreviewPlaying(false);
      setRemainingSeconds(durationSeconds);
      el.currentTime = 0;
    };
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
    };
  }, [durationSeconds]);

  const startHoverPreview = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const stopHoverPreview = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setRemainingSeconds(durationSeconds);
  };

  return (
    <li>
      <Link
        href={`/videos/${video.id}`}
        className="group relative flex cursor-pointer gap-3"
        onMouseEnter={startHoverPreview}
        onMouseLeave={stopHoverPreview}
        onFocus={startHoverPreview}
        onBlur={stopHoverPreview}
      >
        {/* Preview - smaller for sidebar */}
        <div className="relative aspect-video w-36 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <video
            ref={videoRef}
            src={video.video_url}
            muted
            playsInline
            preload="metadata"
            controls={false}
            className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            aria-label={video.title}
          />
          <span className="pointer-events-none absolute right-1 bottom-1 rounded bg-black/80 px-1 py-0.5 text-xs font-semibold text-white">
            {isPreviewPlaying
              ? formatDurationMMSS(remainingSeconds)
              : formatDurationMMSS(durationSeconds)}
          </span>
        </div>

        {/* Details - vertical layout */}
        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {video.title}
          </h4>
          <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500">
            <span>{video.user_id}</span>
            <div className="flex gap-1">
              <span>{dayjs(video.created_at).fromNow()}</span>
              <span>
                • {video.num_comments}{' '}
                {video.num_comments === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
