import { useVideo } from '@/lib/queries';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerSkeleton from './VideoPlayerSkeleton';
import VideoDetails from './VideoDetails';
import VideoDetailsSkeleton from './VideoDetailsSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import type { Video } from '@/types';

interface VideoSectionProps {
  videoId: string;
  onEdit: (video: Video) => void;
}

export default function VideoSection({ videoId, onEdit }: VideoSectionProps) {
  const { data: video, isLoading, error, refetch } = useVideo(videoId);

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title="Video not found"
          message="We couldn't load this video. It may have been deleted or the link is invalid."
          onRetry={() => refetch()}
          variant="page"
        />
      </div>
    );
  }

  return (
    <>
      {isLoading ? <VideoPlayerSkeleton /> : video ? <VideoPlayer src={video.video_url} /> : null}

      {isLoading ? <VideoDetailsSkeleton /> : video ? <VideoDetails video={video} onEdit={onEdit} /> : null}
    </>
  );
}
