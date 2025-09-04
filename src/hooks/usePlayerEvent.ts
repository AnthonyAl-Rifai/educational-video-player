import { RefObject, useEffect } from 'react';

export function usePlayerEvent<K extends keyof HTMLMediaElementEventMap>(
  videoRef: RefObject<HTMLVideoElement | null>,
  eventType: K,
  handler: (event: HTMLMediaElementEventMap[K]) => void,
) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.addEventListener(eventType, handler as EventListener);
    return () => el.removeEventListener(eventType, handler as EventListener);
  }, [videoRef, eventType, handler]);
}
