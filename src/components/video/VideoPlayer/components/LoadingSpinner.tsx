'use client';

export default function LoadingSpinner() {
  return (
    <div className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="h-24 w-24 animate-spin rounded-full border-6 border-white/30 border-t-white"></div>
    </div>
  );
}
