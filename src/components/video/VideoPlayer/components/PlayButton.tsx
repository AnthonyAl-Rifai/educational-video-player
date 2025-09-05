'use client';

import PlayIcon from '@/components/ui/icons/PlayIcon';

interface PlayButtonProps {
  onClick: () => void;
}

export default function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer text-white transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        aria-label="Play"
      >
        <PlayIcon size={32} />
      </button>
    </div>
  );
}
