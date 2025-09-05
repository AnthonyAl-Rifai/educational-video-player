'use client';

import { useRef, useState, useCallback } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { PlaybackState } from '@/types';
import PlayerOverlay from './components/PlayerOverlay';

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');

  const onPlaying = useCallback(() => setPlaybackState('playing'), []);
  const onPaused = useCallback(() => setPlaybackState('paused'), []);
  const onBuffering = useCallback(() => setPlaybackState('buffering'), []);
  const onCanPlay = useCallback(() => setPlaybackState('ready'), []);
  const onTimeUpdate = useCallback(() => {
    if (playbackState !== 'playing') {
      setPlaybackState('playing');
    }
  }, [playbackState]);

  usePlayerEvent(videoRef, 'playing', onPlaying);
  usePlayerEvent(videoRef, 'pause', onPaused);
  usePlayerEvent(videoRef, 'waiting', onBuffering);
  usePlayerEvent(videoRef, 'canplay', onCanPlay);
  usePlayerEvent(videoRef, 'timeupdate', onTimeUpdate, { once: true });

  const handleTogglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {}
    } else {
      v.pause();
    }
  }, []);

  // Enable keyboard controls for this video player, space bar to toggle play, can extend
  useKeyboardControls({ onTogglePlay: handleTogglePlay });

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        autoPlay
        className="absolute inset-0 h-full w-full"
      />
      <PlayerOverlay
        state={playbackState}
        onTogglePlay={handleTogglePlay}
        videoRef={videoRef}
        containerRef={containerRef}
      />
    </div>
  );
}
