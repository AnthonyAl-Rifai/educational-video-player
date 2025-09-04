export default function VideoCardSkeleton() {
  return (
    <li>
      <div className="group relative flex h-full cursor-default flex-col gap-3">
        {/* Preview*/}
        <div className="relative aspect-video animate-pulse overflow-hidden rounded-xl bg-gray-200">
          <div className="absolute right-2 bottom-2 h-5 w-12 rounded bg-black/20" />
        </div>

        {/* Details*/}
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-start gap-x-3 gap-y-0">
          {/* Avatar*/}
          <div className="row-span-2 h-12 w-12 animate-pulse rounded-full bg-blue-100" />

          {/* Title*/}
          <div className="col-start-2 row-start-1 mt-1 h-5 w-4/5 animate-pulse rounded bg-gray-200" />

          {/* Metadata */}
          <div className="col-start-2 row-start-2 mt-2 flex flex-wrap items-center gap-2">
            <div className="h-3.5 w-25 animate-pulse rounded bg-gray-200" />
            <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-3.5 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </li>
  );
}
