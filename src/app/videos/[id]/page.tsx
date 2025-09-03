'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { useComments, useCreateComment, useVideo } from '@/lib/queries';
import VideoPlayer from '@/components/VideoPlayer';
import CommentForm from '@/components/CommentForm';
import VideoEditModal from '@/components/VideoEditModal';
import VideoDropdownMenu from '@/components/VideoDropdownMenu';
import VideoSidebar from '@/components/VideoSidebar';
import dayjs from '@/lib/dayjs';
import type { Video } from '@/types';

export default function VideoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data: video, isLoading, error } = useVideo(id);
  const { data: comments } = useComments(id);
  const addComment = useCreateComment(id);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  if (isLoading) return <p>Loading…</p>;
  if (error || !video) return <p>Not found.</p>;

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 space-y-6">
        <VideoPlayer src={video.video_url} />
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="flex-1 text-2xl font-semibold">{video.title}</h1>
            <VideoDropdownMenu onEdit={() => setEditingVideo(video)} />
          </div>
          <p className="text-gray-600">{video.description}</p>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold">
            {video.num_comments}{' '}
            {video.num_comments === 1 ? 'Comment' : 'Comments'}
          </h2>

          <LayoutGroup>
            <CommentForm
              onSubmit={(content, user_id) =>
                addComment.mutate({ content, user_id })
              }
              pending={addComment.isPending}
            />
            <ul className="flex flex-col gap-6">
              {(comments ?? []).map((c) => (
                <motion.li
                  key={c.id}
                  layout
                  className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] items-start gap-x-3 gap-y-1"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <div className="row-span-2 flex h-12 w-12 items-center justify-center self-start rounded-full bg-blue-100 font-bold text-blue-700">
                    {c.user_id.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="col-start-2 row-start-1 flex flex-wrap items-center gap-x-2 self-center text-sm text-gray-500">
                    <span className="font-bold">{c.user_id}</span>
                    <span>• {dayjs(c.created_at).fromNow()}</span>
                  </div>
                  <div className="col-start-2 row-start-2 self-center leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
                    {c.content}
                  </div>
                </motion.li>
              ))}
            </ul>
          </LayoutGroup>
        </section>

        {/* Edit Modal */}
        {editingVideo && (
          <VideoEditModal
            isOpen={!!editingVideo}
            onClose={() => setEditingVideo(null)}
            video={editingVideo}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="flex-shrink-0">
        <VideoSidebar currentVideoId={video.id} userId={video.user_id} />
      </div>
    </div>
  );
}
