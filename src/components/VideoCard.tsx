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

export default function VideoCard({ video }: { video: Video }) {
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
        className="group relative h-full flex flex-col gap-3 cursor-pointer"
        onMouseEnter={startHoverPreview}
        onMouseLeave={stopHoverPreview}
        onFocus={startHoverPreview}
        onBlur={stopHoverPreview}
      >
        {/* Preview */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
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
          <span className="pointer-events-none absolute right-2 bottom-2 rounded px-1.5 py-0.5 text-xs font-semibold text-white bg-black/80">
            {isPreviewPlaying
              ? formatDurationMMSS(remainingSeconds)
              : formatDurationMMSS(durationSeconds)}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-start gap-x-3 gap-y-0">
          {/* Avatar */}
          <div className="row-span-2 h-12 w-12 rounded-full bg-blue-100 self-center flex items-center justify-center text-blue-700 font-bold">
            {video.user_id.slice(0, 1).toUpperCase()}
          </div>
          {/* Title */}
          <div className="col-start-2 row-start-1 line-clamp-2 self-center font-semibold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
            {video.title}
          </div>

          {/* Metadata */}
          <div className="col-start-2 row-start-2 self-center flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
            <span>{video.user_id}</span>
            <span>• {dayjs(video.created_at).fromNow()}</span>
            <span>
              • {video.num_comments}{' '}
              {video.num_comments === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
