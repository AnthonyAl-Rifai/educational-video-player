export default function VideoCommentSkeleton() {
  return (
    <div className="flex gap-3">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
