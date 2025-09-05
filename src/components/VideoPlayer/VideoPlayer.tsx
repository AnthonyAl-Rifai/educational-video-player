'use client';

import { useRef, useState, useCallback } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';
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

  usePlayerEvent(videoRef, 'playing', onPlaying);
  usePlayerEvent(videoRef, 'pause', onPaused);
  usePlayerEvent(videoRef, 'waiting', onBuffering);
  usePlayerEvent(videoRef, 'canplay', onCanPlay);

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

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-lg">
      <video ref={videoRef} src={src} playsInline preload="metadata" className="absolute inset-0 h-full w-full" />
      <PlayerOverlay
        state={playbackState}
        onTogglePlay={handleTogglePlay}
        videoRef={videoRef}
        containerRef={containerRef}
      />
    </div>
  );
}
