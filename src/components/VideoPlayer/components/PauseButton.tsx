'use client';

import PauseIcon from '@/components/icons/PauseIcon';

interface PauseButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function PauseButton({
  onClick,
  disabled = false,
}: PauseButtonProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="cursor-pointer text-white transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        aria-label="Pause"
      >
        <PauseIcon size={28} />
      </button>
    </div>
  );
}
