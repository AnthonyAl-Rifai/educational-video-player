// app/videos/VideosPage.tsx
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
import type { SortOption, Video } from '@/types';

export default function VideosPage() {
  const { data, isLoading, error, refetch } = useVideos(USER_ID);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const { openModal } = useModal();

  const sortedVideos = useMemo(() => {
    if (!data) return [];

    function sortByDateDesc(a: Video, b: Video) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }

    function sortByCommentsThenDate(a: Video, b: Video) {
      // Sort by comment count (descending), then by date (descending) as tiebreaker
      const commentDifference = b.num_comments - a.num_comments;
      return commentDifference !== 0 ? commentDifference : sortByDateDesc(a, b);
    }

    const videosToSort = [...data];
    videosToSort.sort(sortBy === 'comments' ? sortByCommentsThenDate : sortByDateDesc);
    return videosToSort;
  }, [data, sortBy]);

  const renderContent = () => {
    if (error && !data) {
      return (
        <ErrorState
          title="Unable to load videos"
          message="We're having trouble loading your videos. This might be a temporary issue."
          onRetry={() => refetch()}
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
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6" aria-live="polite">
        {sortedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <FilterBar sortBy={sortBy} onSortChange={setSortBy} isLoading={isLoading} />
      {renderContent()}
    </div>
  );
}
