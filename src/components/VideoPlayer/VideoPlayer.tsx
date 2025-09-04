'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';
import PlayerOverlay from './components/PlayerOverlay';

type PlaybackState = 'idle' | 'ready' | 'playing' | 'paused' | 'buffering';

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

  useEffect(() => {
    console.log('PlaybackState changed to:', playbackState);
  }, [playbackState]);

  const handleTogglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {
        // ignore or surface a tooltip/snackbar if desired
      }
    } else {
      v.pause();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg"
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
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

/**

Within this Component
Want to store the player in context set up in App (for in app PIP) - when a player is created store in context - use the context to access the player to subscribe to events
PlayerControls component
  PlayButton component - when clicked, update player state from paused to playing
  PauseButton component - when clicked, update player state from playing to paused
  Ellapsed time component - subsribe to time update event (usePlayerEvent a utility hook, subscribes and unmounts when needed)
  Volume Slider component
  Playback Speed Menu component
  Full screen button
  ProgressBar
  Spinner (when buffering)

Have to keep track of player state (paused, playing, buffering)

For starters, add 
If you can, avoid subscribing to time updating events because that will cause rerenders, the only components that should
be subscribing is the Ellapsed time component and the ProgressBar

in my components folder i would have folders for the component so i could have a hooks folder in it

create methods like togglePlay, seekTo(position), setPlaybackRate, setVolume()

for now I dont want to pass the videoRef into the child, I will just create callbacks in the VideoPlayer and pass them into the children

autoplay detection. 

auto-hide controls when not hovering would be cool

Double click full screen
**/
