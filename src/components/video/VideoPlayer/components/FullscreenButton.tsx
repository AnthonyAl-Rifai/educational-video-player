'use client';

import { RefObject } from 'react';
import FullscreenIcon from '@/components/ui/icons/FullscreenIcon';
import FullscreenExitIcon from '@/components/ui/icons/FullscreenExitIcon';
import { useFullscreen } from '@/hooks/useFullscreen';

interface FullscreenButtonProps {
  containerRef?: RefObject<HTMLDivElement | null>;
}

export default function FullscreenButton({ containerRef }: FullscreenButtonProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className="cursor-pointer text-xl text-white transition-transform hover:scale-110"
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? <FullscreenExitIcon size={32} /> : <FullscreenIcon size={32} />}
    </button>
  );
}
