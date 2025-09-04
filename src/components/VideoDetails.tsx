import VideoDropdownMenu from '@/components/VideoDropdownMenu';
import type { Video } from '@/types';

interface VideoDetailsProps {
  video: Video;
  onEdit: (video: Video) => void;
}

export default function VideoDetails({ video, onEdit }: VideoDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="flex-1 text-2xl font-semibold">{video.title}</h1>
        <VideoDropdownMenu onEdit={() => onEdit(video)} />
      </div>
      <p className="text-gray-600">{video.description}</p>
    </div>
  );
}
