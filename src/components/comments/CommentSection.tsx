import { LayoutGroup } from 'motion/react';
import { useComments, useCreateComment } from '@/lib/queries';
import CommentForm from './CommentForm';
import VideoComment from './VideoComment';
import VideoCommentSkeleton from './VideoCommentSkeleton';
import ErrorState from '@/components/ui/ErrorState';

interface CommentSectionProps {
  videoId: string;
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments(videoId);
  const addComment = useCreateComment(videoId);

  return (
    <section className="flex flex-col gap-6">
      {commentsLoading ? (
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
      ) : commentsError ? (
        <ErrorState
          title="Unable to load comments"
          message="We're having trouble loading the comments for this video. Please try again."
          onRetry={() => window.location.reload()}
          variant="inline"
        />
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            {comments?.length || 0} {(comments?.length || 0) === 1 ? 'Comment' : 'Comments'}
          </h2>

          <LayoutGroup>
            <CommentForm
              onSubmit={(content, user_id) => addComment.mutate({ content, user_id })}
              pending={addComment.isPending}
            />
            <ul className="flex flex-col gap-6">
              {(comments ?? []).map((comment) => (
                <VideoComment key={comment.id} comment={comment} />
              ))}
            </ul>
          </LayoutGroup>
        </>
      )}
    </section>
  );
}
