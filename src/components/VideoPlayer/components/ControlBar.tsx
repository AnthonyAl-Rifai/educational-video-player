'use client';

import { RefObject } from 'react';
import { PlaybackState } from '@/types';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import VolumeControl from './VolumeControl';
import PlaybackSpeedMenu from './PlaybackSpeedMenu';
import FullScreenButton from './FullScreenButton';

export default function ControlBar({
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
  const isPlaying = state === 'playing';
  const isDisabled = state === 'idle' || state === 'buffering';

  return (
    <div className="flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {isPlaying ? (
          <PauseButton onClick={onTogglePlay} disabled={isDisabled} />
        ) : (
          <PlayButton onClick={onTogglePlay} disabled={isDisabled} />
        )}
        <VolumeControl videoRef={videoRef} />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <PlaybackSpeedMenu videoRef={videoRef} />
        <FullScreenButton containerRef={containerRef} />
      </div>
    </div>
  );
}
