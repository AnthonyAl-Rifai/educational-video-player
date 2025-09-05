// hooks/useKeyboardControls.ts
import { useEffect, useCallback } from 'react';

type UseKeyboardControlsProps = {
  onTogglePlay: () => void;
  enabled?: boolean;
};

export function useKeyboardControls({ onTogglePlay, enabled = true }: UseKeyboardControlsProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const t = e.target as HTMLElement | null;
      const isTypingTarget =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);

      if (isTypingTarget) return;

      // Space or "k" to toggle (YouTube-style)
      if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
        e.preventDefault(); // avoid page scroll on Space
        onTogglePlay();
      }
    },
    [enabled, onTogglePlay],
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}
