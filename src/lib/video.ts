// Video utility functions

/**
 * Format seconds as M:SS (e.g., 125 -> "2:05")
 * Handles null values and invalid input gracefully
 */
export function formatTime(time: number | null): string {
  if (time == null || !isFinite(time) || time < 0) {
    return '–:–';
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
