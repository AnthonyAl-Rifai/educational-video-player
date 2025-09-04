import { LayoutGroup } from 'motion/react';
import { useComments, useCreateComment, useVideo } from '@/lib/queries';
import CommentForm from '@/components/CommentForm';
import VideoComment from '@/components/VideoComment';
import VideoCommentSkeleton from '@/components/VideoCommentSkeleton';

interface CommentSectionProps {
  videoId: string;
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const { data: video, isLoading: videoLoading } = useVideo(videoId);
  const { data: comments, isLoading: commentsLoading } = useComments(videoId);
  const addComment = useCreateComment(videoId);

  const isLoading = videoLoading || commentsLoading;
  return (
    <section className="flex flex-col gap-6">
      {isLoading ? (
        <>
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-4">
            <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <VideoCommentSkeleton key={i} />
              ))}
            </div>
          </div>
        </>
      ) : video ? (
        <>
          <h2 className="text-lg font-semibold">
            {comments?.length || 0}{' '}
            {(comments?.length || 0) === 1 ? 'Comment' : 'Comments'}
          </h2>

          <LayoutGroup>
            <CommentForm
              onSubmit={(content, user_id) =>
                addComment.mutate({ content, user_id })
              }
              pending={addComment.isPending}
            />
            <ul className="flex flex-col gap-6">
              {(comments ?? []).map((comment) => (
                <VideoComment key={comment.id} comment={comment} />
              ))}
            </ul>
          </LayoutGroup>
        </>
      ) : null}
    </section>
  );
}
