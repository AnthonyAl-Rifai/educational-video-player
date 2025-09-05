'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from '@/lib/dayjs';
import VideoPreview from './VideoPreview';
import type { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <Link
        href={`/videos/${video.id}`}
        className="group relative flex h-full cursor-pointer flex-col gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Preview */}
        <VideoPreview src={video.video_url} title={video.title} isPlaying={isHovered} />

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
              • {video.num_comments} {video.num_comments === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
