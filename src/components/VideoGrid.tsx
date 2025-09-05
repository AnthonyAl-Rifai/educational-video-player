'use client';

import { useMemo } from 'react';
import { useVideos } from '@/lib/queries';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';
import { USER_ID } from '@/lib/config';

interface VideoGridProps {
  currentVideoId?: string;
  title?: string;
}

export default function VideoGrid({ currentVideoId, title = 'More Videos' }: VideoGridProps) {
  const { data: videos, isLoading, error } = useVideos(USER_ID);

  // Filter out the current video if provided
  const otherVideos = useMemo(() => {
    if (!videos) return [];
    return currentVideoId ? videos.filter((v) => v.id !== currentVideoId) : videos;
  }, [videos, currentVideoId]);

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6" aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }, (_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </ul>
      </section>
    );
  }

  if (error || !videos) {
    return (
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">Failed to load videos</p>
      </section>
    );
  }

  if (otherVideos.length === 0) {
    return (
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">No other videos available</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {otherVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </section>
  );
}
