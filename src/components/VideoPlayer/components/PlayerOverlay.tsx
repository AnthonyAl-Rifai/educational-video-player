'use client';

import { useEffect, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PlayerControls from './PlayerControls';

type PlaybackState = 'idle' | 'ready' | 'playing' | 'paused' | 'buffering';

export default function PlayerOverlay({
  state,
  onTogglePlay,
  videoRef,
  containerRef,
}: {
  state: PlaybackState;
  onTogglePlay: () => void;
  videoRef?: RefObject<HTMLVideoElement | null>;
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  const [feedbackIcon, setFeedbackIcon] = useState<'play' | 'pause' | null>(
    null,
  );

  const handleClick = () => {
    const nextIcon = state === 'playing' ? 'pause' : 'play';
    setFeedbackIcon(nextIcon);
    onTogglePlay();
  };

  useEffect(() => {
    if (!feedbackIcon) return;
    const timeout = setTimeout(() => setFeedbackIcon(null), 500);
    return () => clearTimeout(timeout);
  }, [feedbackIcon]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        onClick={handleClick}
        className="pointer-events-auto absolute inset-0"
      >
        <AnimatePresence>
          {feedbackIcon && (
            <motion.div
              key={feedbackIcon}
              initial={{ scale: 0.75, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-4xl text-white"
            >
              {feedbackIcon === 'play' ? '▶' : '⏸'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PlayerControls
        state={state}
        onTogglePlay={onTogglePlay}
        videoRef={videoRef}
        containerRef={containerRef}
      />
    </div>
  );
}
