'use client';

import Link from 'next/link';
import { useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import VideoCard from '@/components/VideoCard';

export default function VideosPage() {
  const { data, isLoading, error } = useVideos(USER_ID);

  if (isLoading) return <p>Loading videos…</p>;
  if (error) return <p>Failed to load videos</p>;

  const videos = data ?? [];
  if (!videos.length)
    return (
      <p>
        No videos yet.{' '}
        <Link href="/videos/new" className="underline">
          Create one
        </Link>
        .
      </p>
    );

  return (
    <ul className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ul>
  );
}
