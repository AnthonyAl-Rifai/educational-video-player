import { useVideo } from '@/lib/queries';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import VideoPlayerSkeleton from '@/components/VideoPlayerSkeleton';
import VideoDetails from '@/components/VideoDetails';
import VideoDetailsSkeleton from '@/components/VideoDetailsSkeleton';
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
