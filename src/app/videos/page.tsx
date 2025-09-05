'use client';

import { useState, useMemo } from 'react';
import { useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import VideoCard from '@/components/VideoCard';
import { useModal } from '@/hooks/useModal';
import VideoCardSkeleton from '@/components/VideoCardSkeleton';
import FilterBar from '@/components/FilterBar';

type SortOption = 'date' | 'comments';

export default function VideosPage() {
  const { data, isLoading, error } = useVideos(USER_ID);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const { openModal } = useModal();

  // Memoize the videos array to prevent unnecessary re-renders
  const videos = useMemo(() => data ?? [], [data]);

  // Sort videos based on selected filter
  const sortedVideos = useMemo(() => {
    const sorted = [...videos];

    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'comments':
        return sorted.sort(
          (a, b) =>
            b.num_comments - a.num_comments || new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      default:
        return sorted;
    }
  }, [videos, sortBy]);

  // Render content based on loading/error state
  const renderContent = () => {
    if (error && !data) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Failed to load videos</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6" aria-busy="true" aria-live="polite">
          {Array.from({ length: 12 }, (_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </ul>
      );
    }

    if (!videos.length) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">
            No videos yet.
            <button type="button" onClick={openModal} className="underline transition-colors hover:text-blue-600">
              Create one
            </button>
            .
          </p>
        </div>
      );
    }

    return (
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {sortedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar - Always rendered */}
      <FilterBar sortBy={sortBy} onSortChange={setSortBy} isLoading={isLoading} />

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
}
