'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import VideoSection from '@/components/VideoSection';
import CommentSection from '@/components/CommentSection';
import VideoEditModal from '@/components/VideoEditModal';
import VideoSidebar from '@/components/VideoSidebar';
import VideoGrid from '@/components/VideoGrid';
import type { Video } from '@/types';

export default function VideoDetailPage() {
  const params = useParams<{ id: string }>();
  const videoId = params.id;
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <VideoSection videoId={videoId} onEdit={setEditingVideo} />

          <CommentSection videoId={videoId} />

          {/* VideoGrid for mobile/tablet - hidden on desktop */}
          <div className="block lg:hidden">
            <VideoGrid currentVideoId={videoId} />
          </div>
        </div>

        {/* Sidebar for desktop - hidden on mobile/tablet */}
        <div className="hidden flex-shrink-0 lg:block">
          <VideoSidebar videoId={videoId} />
        </div>
      </div>

      {/* Edit Modal - positioned outside main content */}
      <VideoEditModal isOpen={!!editingVideo} onClose={() => setEditingVideo(null)} video={editingVideo!} />
    </>
  );
}
