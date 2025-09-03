'use client';

import { useRef, useState } from 'react';

export default function VideoPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  function setPlaybackRate(r: number) {
    setRate(r);
    ref.current && (ref.current.playbackRate = r);
  }
  function setVol(v: number) {
    setVolume(v);
    if (ref.current) ref.current.volume = v;
  }
  async function goFull() {
    if (!ref.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await ref.current.requestFullscreen();
  }

  return (
    <div className="space-y-2">
      <video ref={ref} src={src} controls className="w-full rounded border" />
      {/* <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          Speed
          <select
            value={rate}
            onChange={(e) => setPlaybackRate(Number(e.target.value))}
            className="border rounded p-1"
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
              <option key={s} value={s}>
                {s}x
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVol(Number(e.target.value))}
          />
        </label>

        <button onClick={goFull} className="border rounded px-3 py-1">
          Fullscreen
        </button>
      </div> */}
    </div>
  );
}
