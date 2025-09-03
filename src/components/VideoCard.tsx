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

interface VideoCardProps {
  video: Video;
  variant?: 'default' | 'sidebar';
}

export default function VideoCard({
  video,
  variant = 'default',
}: VideoCardProps) {
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

  if (variant === 'sidebar') {
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

  return (
    <li>
      <Link
        href={`/videos/${video.id}`}
        className="group relative flex h-full cursor-pointer flex-col gap-3"
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
          <span className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
            {isPreviewPlaying
              ? formatDurationMMSS(remainingSeconds)
              : formatDurationMMSS(durationSeconds)}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-start gap-x-3 gap-y-0">
          {/* Avatar */}
          <div className="row-span-2 flex h-12 w-12 items-center justify-center self-start rounded-full bg-blue-100 font-bold text-blue-700">
            {video.user_id.slice(0, 1).toUpperCase()}
          </div>
          {/* Title */}
          <div className="col-start-2 row-start-1 line-clamp-2 self-center leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {video.title}
          </div>

          {/* Metadata */}
          <div className="col-start-2 row-start-2 flex flex-wrap items-center gap-x-2 self-center text-sm text-gray-500">
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
