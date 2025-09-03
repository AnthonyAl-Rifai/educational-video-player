'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import VideoCard from '@/components/VideoCard';
import { useModal } from '@/hooks/useModal';

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
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      case 'comments':
        return sorted.sort(
          (a, b) =>
            b.num_comments - a.num_comments ||
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      default:
        return sorted;
    }
  }, [videos, sortBy]);

  if (isLoading) return <p>Loading videos…</p>;
  if (error) return <p>Failed to load videos</p>;
  if (!videos.length)
    return (
      <div>
        <p>
          No videos yet.{' '}
          <button
            type="button"
            onClick={openModal}
            className="underline transition-colors hover:text-blue-600"
          >
            Create one
          </button>
          .
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex rounded-lg bg-gray-100 p-1 ring-1 ring-gray-200">
            <motion.button
              type="button"
              aria-pressed={sortBy === 'date'}
              onClick={() => setSortBy('date')}
              className={`relative cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === 'date'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sortBy === 'date' && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Date</span>
            </motion.button>

            <motion.button
              type="button"
              aria-pressed={sortBy === 'comments'}
              onClick={() => setSortBy('comments')}
              className={`relative cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === 'comments'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sortBy === 'comments' && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Comments</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {sortedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </div>
  );
}
