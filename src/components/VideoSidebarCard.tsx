'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from '@/lib/dayjs';
import VideoPreview from './VideoPreview';
import type { Video } from '@/types';

interface VideoSidebarCardProps {
  video: Video;
}

export default function VideoSidebarCard({ video }: VideoSidebarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <Link
        href={`/videos/${video.id}`}
        className="group relative flex cursor-pointer gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Preview - fixed width with aspect-video for sidebar layout */}
        <div className="w-36 flex-shrink-0">
          <VideoPreview src={video.video_url} title={video.title} isPlaying={isHovered} inSidebar />
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
                • {video.num_comments} {video.num_comments === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
