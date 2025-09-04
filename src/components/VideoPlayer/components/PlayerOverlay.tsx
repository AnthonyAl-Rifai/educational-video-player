'use client';

import { useEffect, useState, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PlayerControls from './PlayerControls';
import LoadingSpinner from './LoadingSpinner';

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
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handleClick = () => {
    const nextIcon = state === 'playing' ? 'pause' : 'play';
    setFeedbackIcon(nextIcon);
    onTogglePlay();
  };

  const handleDoubleClick = () => {
    if (!containerRef?.current) return;

    // Check if already in fullscreen
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement === containerRef.current ||
      (document as Document & { webkitFullscreenElement?: Element })
        .webkitFullscreenElement === containerRef.current ||
      (document as Document & { mozFullScreenElement?: Element })
        .mozFullScreenElement === containerRef.current ||
      (document as Document & { msFullscreenElement?: Element })
        .msFullscreenElement === containerRef.current
    );

    if (!isCurrentlyFullscreen) {
      // Enter fullscreen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (
        (
          containerRef.current as HTMLDivElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen
      ) {
        (
          containerRef.current as HTMLDivElement & {
            webkitRequestFullscreen: () => Promise<void>;
          }
        ).webkitRequestFullscreen();
      } else if (
        (
          containerRef.current as HTMLDivElement & {
            mozRequestFullScreen?: () => Promise<void>;
          }
        ).mozRequestFullScreen
      ) {
        (
          containerRef.current as HTMLDivElement & {
            mozRequestFullScreen: () => Promise<void>;
          }
        ).mozRequestFullScreen();
      } else if (
        (
          containerRef.current as HTMLDivElement & {
            msRequestFullscreen?: () => Promise<void>;
          }
        ).msRequestFullscreen
      ) {
        (
          containerRef.current as HTMLDivElement & {
            msRequestFullscreen: () => Promise<void>;
          }
        ).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (
        (
          document as Document & {
            webkitExitFullscreen?: () => Promise<void>;
          }
        ).webkitExitFullscreen
      ) {
        (
          document as Document & { webkitExitFullscreen: () => Promise<void> }
        ).webkitExitFullscreen();
      } else if (
        (document as Document & { mozCancelFullScreen?: () => Promise<void> })
          .mozCancelFullScreen
      ) {
        (
          document as Document & { mozCancelFullScreen: () => Promise<void> }
        ).mozCancelFullScreen();
      } else if (
        (document as Document & { msExitFullscreen?: () => Promise<void> })
          .msExitFullscreen
      ) {
        (
          document as Document & { msExitFullscreen: () => Promise<void> }
        ).msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (!feedbackIcon) return;
    const timeout = setTimeout(() => setFeedbackIcon(null), 500);
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
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
