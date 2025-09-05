export default function VideoDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
