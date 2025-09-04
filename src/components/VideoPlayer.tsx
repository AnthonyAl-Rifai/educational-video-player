'use client';

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
