'use client';

import PlayIcon from '@/components/icons/PlayIcon';

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function PlayButton({ onClick, disabled = false }: PlayButtonProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="cursor-pointer text-white transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        aria-label="Play"
      >
        <PlayIcon size={32} />
      </button>
    </div>
  );
}
