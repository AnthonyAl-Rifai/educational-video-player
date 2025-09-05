'use client';

export default function VideoPlayerSkeleton() {
  return (
    <div className="relative aspect-video w-full animate-pulse overflow-hidden rounded bg-gray-100">
      <div className="absolute inset-0 grid place-items-center" role="status" aria-live="polite" aria-busy="true">
        <div className="h-20 w-20 animate-spin rounded-full border-5 border-gray-300 border-t-gray-500" />
        <span className="sr-only">Loading video</span>
      </div>
    </div>
  );
}
