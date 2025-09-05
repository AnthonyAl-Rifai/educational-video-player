'use client';

import { RefObject } from 'react';
import { motion } from 'motion/react';
import { PlaybackState } from '@/types';
import ProgressBar from './ProgressBar';
import ControlBar from './ControlBar';

export default function PlayerControls({
  state,
  onTogglePlay,
  videoRef,
  containerRef,
  showControls,
}: {
  state: PlaybackState;
  onTogglePlay: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef?: RefObject<HTMLDivElement | null>;
  showControls: boolean;
}) {
  // Show controls if not playing OR if showControls is true
  const shouldShowControls = state !== 'playing' || showControls;

  return (
    <motion.div
      animate={{
        opacity: shouldShowControls ? 1 : 0,
        y: shouldShowControls ? 0 : 20,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 to-transparent px-8 pb-6 text-white"
      style={{
        pointerEvents: shouldShowControls ? 'auto' : 'none',
      }}
    >
      <ProgressBar videoRef={videoRef} />
      <ControlBar state={state} onTogglePlay={onTogglePlay} videoRef={videoRef} containerRef={containerRef} />
    </motion.div>
  );
}
