'use client';

import { useState, RefObject } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function getVideoEl(ref?: RefObject<HTMLVideoElement | null>) {
  return ref?.current ?? null;
}

export default function PlaybackSpeedMenu({
  videoRef,
}: {
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  usePlayerEvent(videoRef || { current: null }, 'ratechange', () => {
    const video = getVideoEl(videoRef);
    if (video) setPlaybackRate(video.playbackRate);
  });

  const cyclePlaybackRate = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    const nextRate = SPEED_OPTIONS[nextIndex];

    const video = getVideoEl(videoRef);
    if (!video) return;
    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const setRate = (rate: number) => {
    const video = getVideoEl(videoRef);
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={cyclePlaybackRate}
        className="cursor-pointer rounded bg-black/60 px-2 py-1 text-sm text-white"
      >
        {playbackRate}x
      </button>

      {isHovered && (
        <div className="absolute bottom-full z-20 w-24 rounded bg-black text-sm text-white shadow-md">
          {[...SPEED_OPTIONS].reverse().map((rate) => (
            <button
              key={rate}
              onClick={() => setRate(rate)}
              className={`w-full px-3 py-1 text-left hover:bg-white/10 ${
                playbackRate === rate ? 'bg-white font-bold text-black' : ''
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
