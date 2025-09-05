import { RefObject, useEffect } from 'react';

interface UsePlayerEventOptions {
  once?: boolean;
}

export function usePlayerEvent<K extends keyof HTMLMediaElementEventMap>(
  videoRef: RefObject<HTMLVideoElement | null>,
  eventType: K,
  handler: (event: HTMLMediaElementEventMap[K]) => void,
  options?: UsePlayerEventOptions,
) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const eventHandler = (event: Event) => {
      handler(event as HTMLMediaElementEventMap[K]);
      if (options?.once) {
        el.removeEventListener(eventType, eventHandler);
      }
    };

    el.addEventListener(eventType, eventHandler as EventListener);
    return () => el.removeEventListener(eventType, eventHandler as EventListener);
  }, [videoRef, eventType, handler, options?.once]);
}
