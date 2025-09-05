'use client';

import { useEffect, useState, RefObject, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlaybackState } from '@/types';
import PlayerControls from './PlayerControls';
import LoadingSpinner from './LoadingSpinner';
import PlayIcon from '@/components/ui/icons/PlayIcon';
import PauseIcon from '@/components/ui/icons/PauseIcon';
import { useFullscreen } from '@/hooks/useFullscreen';

interface PlayerOverlayProps {
  state: PlaybackState;
  onTogglePlay: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function PlayerOverlay({ state, onTogglePlay, videoRef, containerRef }: PlayerOverlayProps) {
  const [feedbackIcon, setFeedbackIcon] = useState<'play' | 'pause' | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(containerRef);

  const handleClick = () => {
    const nextIcon = state === 'playing' ? 'pause' : 'play';
    setFeedbackIcon(nextIcon);
    onTogglePlay();
  };

  const handleDoubleClick = async () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      await enterFullscreen();
    } else {
      await exitFullscreen();
    }
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (!feedbackIcon) return;
    const timeout = setTimeout(() => setFeedbackIcon(undefined), 500);
    return () => clearTimeout(timeout);
  }, [feedbackIcon]);

  // Handle delayed hiding of controls
  useEffect(() => {
    if (isHovering) {
      // Show controls immediately when hovering
      setShowControls(true);
    } else {
      // Hide controls after 1 second when not hovering
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isHovering]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick} onDoubleClick={handleDoubleClick} className="pointer-events-auto absolute inset-0">
        <AnimatePresence>
          {feedbackIcon && (
            <motion.div
              key={feedbackIcon}
              initial={{ scale: 0.75, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
            >
              {feedbackIcon === 'play' ? <PlayIcon size={36} /> : <PauseIcon size={32} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading spinner when buffering */}
      {state === 'buffering' && <LoadingSpinner />}

      <PlayerControls
        state={state}
        onTogglePlay={onTogglePlay}
        videoRef={videoRef}
        containerRef={containerRef}
        showControls={showControls}
      />
    </div>
  );
}
