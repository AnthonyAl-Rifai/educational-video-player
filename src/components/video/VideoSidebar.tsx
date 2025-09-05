'use client';

import { useMemo } from 'react';
import { useVideos } from '@/lib/queries';
import VideoSidebarCard from './VideoSidebarCard';
import VideoSidebarCardSkeleton from './VideoSidebarCardSkeleton';
import { USER_ID } from '@/lib/config';

interface VideoSidebarProps {
  videoId: string;
}

export default function VideoSidebar({ videoId }: VideoSidebarProps) {
  const { data: videos, isLoading, error } = useVideos(USER_ID);

  const otherVideos = useMemo(() => (videos ?? []).filter((v) => v.id !== videoId), [videos, videoId]);

  return (
    <div className="w-80 space-y-4" aria-busy={isLoading ? 'true' : undefined} aria-live="polite">
      <h3 className="text-lg font-semibold">More Videos</h3>

      {isLoading ? (
        <ul className="space-y-4">
          {Array.from({ length: 12 }, (_, i) => (
            <VideoSidebarCardSkeleton key={i} />
          ))}
        </ul>
      ) : error || !videos ? (
        <p className="text-gray-500">Failed to load videos</p>
      ) : otherVideos.length === 0 ? (
        <p className="text-gray-500">No other videos available</p>
      ) : (
        <ul className="space-y-4">
          {otherVideos.map((video) => (
            <VideoSidebarCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </div>
  );
}
