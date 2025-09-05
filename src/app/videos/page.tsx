'use client';

import { useState, useMemo } from 'react';
import { useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import VideoCard from '@/components/video/VideoCard';
import VideoCardSkeleton from '@/components/video/VideoCardSkeleton';
import { useModal } from '@/hooks/useModal';
import FilterBar from '@/components/filters/FilterBar';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import type { SortOption } from '@/types';

export default function VideosPage() {
  const { data, isLoading, error } = useVideos(USER_ID);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const { openModal } = useModal();

  // Sort videos based on selected filter
  const sortedVideos = useMemo(() => {
    const videos = data ?? [];
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
  }, [data, sortBy]);

  // Render content based on loading/error state
  const renderContent = () => {
    if (error && !data) {
      return (
        <ErrorState
          title="Unable to load videos"
          message="We're having trouble loading your videos. This might be a temporary issue."
          onRetry={() => window.location.reload()}
          variant="page"
        />
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

    if (!data?.length) {
      return (
        <EmptyState
          title="No videos yet"
          message="Start your learning journey by creating your first video. Share your knowledge with the community!"
          actionText="Create Video"
          onAction={openModal}
          variant="page"
        />
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
