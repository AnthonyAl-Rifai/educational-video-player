'use client';

import { RefObject } from 'react';
import { PlaybackState } from '@/types';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import VolumeControl from './VolumeControl';
import PlaybackSpeedMenu from './PlaybackSpeedMenu';
import FullscreenButton from './FullscreenButton';

interface ControlBarProps {
  state: PlaybackState;
  onTogglePlay: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ControlBar({ state, onTogglePlay, videoRef, containerRef }: ControlBarProps) {
  const isPlaying = state === 'playing';

  return (
    <div className="flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {isPlaying ? <PauseButton onClick={onTogglePlay} /> : <PlayButton onClick={onTogglePlay} />}
        <VolumeControl videoRef={videoRef} />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <PlaybackSpeedMenu videoRef={videoRef} />
        <FullscreenButton containerRef={containerRef} />
      </div>
    </div>
  );
}
