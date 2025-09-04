'use client';

import { RefObject } from 'react';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import VolumeControl from './VolumeControl';
import PlaybackSpeedMenu from './PlaybackSpeedMenu';
import FullScreenButton from './FullScreenButton';
type PlaybackState = 'idle' | 'ready' | 'playing' | 'paused' | 'buffering';

export default function PlayerControls({
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
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex h-14 items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 text-white">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {isPlaying ? (
          <PauseButton onClick={onTogglePlay} disabled={isDisabled} />
        ) : (
          <PlayButton onClick={onTogglePlay} disabled={isDisabled} />
        )}
        <VolumeControl videoRef={videoRef} />
      </div>

      {/* Right section placeholder */}
      <div className="flex items-center space-x-4">
        <PlaybackSpeedMenu videoRef={videoRef} />
        <FullScreenButton containerRef={containerRef} />
      </div>
    </div>
  );
}
