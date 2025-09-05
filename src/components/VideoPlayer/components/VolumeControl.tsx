'use client';

import { RefObject, useCallback, useState } from 'react';
import VolumeMuteIcon from '@/components/icons/VolumeMuteIcon';
import VolumeLowIcon from '@/components/icons/VolumeLowIcon';
import VolumeHighIcon from '@/components/icons/VolumeHighIcon';
import { motion } from 'motion/react';
import { usePlayerEvent } from '@/hooks/usePlayerEvent';
interface VolumeControlProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function VolumeControl({ videoRef }: VolumeControlProps) {
  const [volume, setVolume] = useState(1); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onVolumeChange = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setVolume(v.volume);
    setIsMuted(v.muted);
  }, [videoRef]);

  const handleToggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (v.muted) {
      // If muted, unmute and set volume to 100% if it's at 0
      v.muted = false;
      if (v.volume === 0) {
        v.volume = 1;
      }
    } else {
      // If not muted, just mute
      v.muted = true;
    }
  }, [videoRef]);

  const handleSetVolume = useCallback(
    (value: number) => {
      const v = videoRef.current;
      if (!v) return;
      const clamped = Math.min(1, Math.max(0, value));
      v.volume = clamped;
      if (clamped > 0 && v.muted) {
        v.muted = false; // auto-unmute when slider is moved above 0
      } else if (clamped === 0) {
        v.muted = true; // auto-mute when volume is set to 0
      }
    },
    [videoRef],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  usePlayerEvent(videoRef, 'volumechange', onVolumeChange);

  return (
    <div className="flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={handleToggleMute}
        className="cursor-pointer text-xl text-white"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted || volume === 0 ? (
          <VolumeMuteIcon size={28} />
        ) : volume < 0.5 ? (
          <VolumeLowIcon size={28} />
        ) : (
          <VolumeHighIcon size={28} />
        )}
      </button>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovering ? 96 : 0, // w-24 = 96px
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="ml-2 overflow-hidden"
      >
        <div className="relative w-24 py-2">
          {/* Track container with padding for handle */}
          <div className="px-1.5">
            {/* Volume track */}
            <div className="relative h-1.5 rounded-full bg-white/30">
              {/* Volume fill */}
              <div
                className="h-full rounded-full bg-white transition-all duration-100"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
              {/* Volume handle - positioned relative to track */}
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-white shadow-sm transition-all duration-100"
                style={{
                  left: `${(isMuted ? 0 : volume) * 100}%`,
                }}
              />
            </div>
          </div>
          {/* Invisible input for interaction */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => handleSetVolume(parseFloat(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </motion.div>
    </div>
  );
}
