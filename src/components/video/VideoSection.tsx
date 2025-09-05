import { useVideo } from '@/lib/queries';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerSkeleton from './VideoPlayerSkeleton';
import VideoDetails from './VideoDetails';
import VideoDetailsSkeleton from './VideoDetailsSkeleton';
import type { Video } from '@/types';

interface VideoSectionProps {
  videoId: string;
  onEdit: (video: Video) => void;
}

export default function VideoSection({ videoId, onEdit }: VideoSectionProps) {
  const { data: video, isLoading } = useVideo(videoId);
  return (
    <>
      {isLoading ? <VideoPlayerSkeleton /> : video ? <VideoPlayer src={video.video_url} /> : null}

      {isLoading ? <VideoDetailsSkeleton /> : video ? <VideoDetails video={video} onEdit={onEdit} /> : null}
    </>
  );
}
