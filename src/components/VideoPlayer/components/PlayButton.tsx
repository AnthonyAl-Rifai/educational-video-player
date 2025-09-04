'use client';

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function PlayButton({
  onClick,
  disabled = false,
}: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer text-2xl transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      aria-label="Play"
    >
      ▶
    </button>
  );
}
