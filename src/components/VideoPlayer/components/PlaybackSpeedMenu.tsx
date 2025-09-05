'use client';

import { useState, RefObject, useCallback } from 'react';
import { motion } from 'motion/react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';

interface PlaybackSpeedMenuProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function PlaybackSpeedMenu({ videoRef }: PlaybackSpeedMenuProps) {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const onRateChange = () => {
    const video = videoRef.current;
    if (video) setPlaybackRate(video.playbackRate);
  };

  usePlayerEvent(videoRef, 'ratechange', onRateChange);

  const handleCyclePlaybackRate = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    const nextRate = SPEED_OPTIONS[nextIndex];

    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const handleSetRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setIsHovered(false); // Close menu after selection
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div className="flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Horizontal speed options - animates from right to left */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered ? 312 : 0, // 6 buttons × 48px + 5 gaps × 4px = 312px
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="mr-2 overflow-hidden"
      >
        <div className="flex items-center space-x-1 py-1">
          {SPEED_OPTIONS.map((rate) => (
            <button
              key={rate}
              onClick={() => handleSetRate(rate)}
              className={`text-md flex w-12 cursor-pointer items-center justify-center rounded px-2 py-1 text-center whitespace-nowrap transition-colors ${
                playbackRate === rate ? 'bg-white font-bold text-black' : 'bg-black/60 text-white hover:bg-white/20'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </motion.div>

      {/* Current speed button */}
      <button
        type="button"
        onClick={handleCyclePlaybackRate}
        className="text-md flex w-12 cursor-pointer items-center justify-center rounded bg-black/60 px-2 py-1 text-center text-white hover:bg-white/20"
      >
        {playbackRate}x
      </button>
    </div>
  );
}
