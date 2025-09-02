'use client';

import { useParams } from 'next/navigation';
import { motion, LayoutGroup } from 'motion/react';
import { useComments, useCreateComment, useVideo } from '@/lib/queries';
import VideoPlayer from '@/components/VideoPlayer';
import CommentForm from '@/components/CommentForm';

export default function VideoDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data: video, isLoading, error } = useVideo(id);
  const { data: comments } = useComments(id);
  const addComment = useCreateComment(id);

  if (isLoading) return <p>Loading…</p>;
  if (error || !video) return <p>Not found.</p>;

  return (
    <div className="space-y-6">
      <VideoPlayer src={video.video_url} />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{video.title}</h1>
        <p className="text-gray-600">{video.description}</p>
      </div>

      <section className="space-y-3">
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
          <ul className="space-y-2">
            {(comments ?? []).map((c) => (
              <motion.li
                key={c.id}
                layout
                className="border rounded p-2"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <p className="text-sm">{c.content}</p>
                <span className="text-xs text-gray-500">by {c.user_id}</span>
              </motion.li>
            ))}
          </ul>
        </LayoutGroup>
      </section>
    </div>
  );
}
