'use client';

import { RefObject, useCallback, useState } from 'react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';

function getVideoEl(ref?: RefObject<HTMLVideoElement | null>) {
  return ref?.current ?? null;
}

export default function VolumeControl({
  videoRef,
}: {
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = useCallback(() => {
    const v = getVideoEl(videoRef);
    if (!v) return;
    setVolume(v.volume);
    setIsMuted(v.muted);
  }, [videoRef]);

  const handleToggleMute = useCallback(() => {
    const v = getVideoEl(videoRef);
    if (!v) return;
    v.muted = !v.muted;
  }, [videoRef]);

  const handleSetVolume = useCallback(
    (value: number) => {
      const v = getVideoEl(videoRef);
      if (!v) return;
      const clamped = Math.min(1, Math.max(0, value));
      v.volume = clamped;
      if (clamped > 0 && v.muted) {
        v.muted = false; // auto-unmute when slider is moved above 0
      }
    },
    [videoRef],
  );

  usePlayerEvent(
    videoRef || { current: null },
    'volumechange',
    handleVolumeChange,
  );

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleToggleMute}
        className="cursor-pointer text-xl text-white"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => handleSetVolume(parseFloat(e.target.value))}
        className="w-24 cursor-pointer"
      />
    </div>
  );
}
