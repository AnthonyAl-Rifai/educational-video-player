'use client';

import { useVideos } from '@/lib/queries';
import VideoCard from './VideoCard';

interface VideoSidebarProps {
  currentVideoId?: string;
  userId: string;
}

export default function VideoSidebar({
  currentVideoId,
  userId,
}: VideoSidebarProps) {
  const { data: videos, isLoading, error } = useVideos(userId);

  if (isLoading) {
    return (
      <div className="w-90 space-y-4">
        <h3 className="text-lg font-semibold">More Videos</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-3 aspect-video rounded-xl bg-gray-200"></div>
              <div className="flex gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !videos) {
    return (
      <div className="w-80">
        <h3 className="text-lg font-semibold">More Videos</h3>
        <p className="text-gray-500">Failed to load videos</p>
      </div>
    );
  }

  // Filter out the current video from the sidebar
  const otherVideos = videos.filter((video) => video.id !== currentVideoId);

  if (otherVideos.length === 0) {
    return (
      <div className="w-80">
        <h3 className="text-lg font-semibold">More Videos</h3>
        <p className="text-gray-500">No other videos available</p>
      </div>
    );
  }

  return (
    <div className="w-90 space-y-4">
      <h3 className="text-lg font-semibold">More Videos</h3>
      <ul className="space-y-4">
        {otherVideos.map((video) => (
          <VideoCard key={video.id} video={video} variant="sidebar" />
        ))}
      </ul>
    </div>
  );
}
