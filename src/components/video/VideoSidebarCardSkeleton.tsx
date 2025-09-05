export default function VideoSidebarCardSkeleton() {
  return (
    <li>
      <div className="group relative flex cursor-default gap-3">
        {/* Preview*/}
        <div className="relative aspect-video w-36 flex-shrink-0 animate-pulse overflow-hidden rounded-lg bg-gray-200">
          <div className="absolute right-1 bottom-1 h-4 w-8 rounded bg-black/20" />
        </div>

        {/* Details*/}
        <div className="min-w-0 flex-1">
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="mt-1 h-4 w-3/5 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-1 flex gap-2">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </li>
  );
}
