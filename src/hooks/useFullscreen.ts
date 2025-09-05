'use client';

import { RefObject, useCallback, useState, useEffect } from 'react';

function getContainerEl(ref?: RefObject<HTMLDivElement | null>) {
  return ref?.current ?? null;
}

export function useFullscreen(containerRef?: RefObject<HTMLDivElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if element is currently in fullscreen
  const checkFullscreenState = useCallback(() => {
    const container = getContainerEl(containerRef);
    if (!container) return false;

    return !!(
      document.fullscreenElement === container ||
      (document as Document & { webkitFullscreenElement?: Element })
        .webkitFullscreenElement === container ||
      (document as Document & { mozFullScreenElement?: Element })
        .mozFullScreenElement === container ||
      (document as Document & { msFullscreenElement?: Element })
        .msFullscreenElement === container
    );
  }, [containerRef]);

  // Listen to document fullscreen changes
  useEffect(() => {
    const onDocumentFullscreenChange = () => {
      const isCurrentlyFullscreen = checkFullscreenState();
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', onDocumentFullscreenChange);
    document.addEventListener(
      'webkitfullscreenchange',
      onDocumentFullscreenChange,
    );
    document.addEventListener(
      'mozfullscreenchange',
      onDocumentFullscreenChange,
    );
    document.addEventListener('MSFullscreenChange', onDocumentFullscreenChange);

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        onDocumentFullscreenChange,
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        onDocumentFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        onDocumentFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        onDocumentFullscreenChange,
      );
    };
  }, [checkFullscreenState]);

  // Toggle fullscreen state
  const toggleFullscreen = useCallback(async () => {
    const container = getContainerEl(containerRef);
    if (!container) return;

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (
          (
            container as HTMLDivElement & {
              webkitRequestFullscreen?: () => Promise<void>;
            }
          ).webkitRequestFullscreen
        ) {
          await (
            container as HTMLDivElement & {
              webkitRequestFullscreen: () => Promise<void>;
            }
          ).webkitRequestFullscreen();
        } else if (
          (
            container as HTMLDivElement & {
              mozRequestFullScreen?: () => Promise<void>;
            }
          ).mozRequestFullScreen
        ) {
          await (
            container as HTMLDivElement & {
              mozRequestFullScreen: () => Promise<void>;
            }
          ).mozRequestFullScreen();
        } else if (
          (
            container as HTMLDivElement & {
              msRequestFullscreen?: () => Promise<void>;
            }
          ).msRequestFullscreen
        ) {
          await (
            container as HTMLDivElement & {
              msRequestFullscreen: () => Promise<void>;
            }
          ).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (
          (
            document as Document & {
              webkitExitFullscreen?: () => Promise<void>;
            }
          ).webkitExitFullscreen
        ) {
          await (
            document as Document & { webkitExitFullscreen: () => Promise<void> }
          ).webkitExitFullscreen();
        } else if (
          (document as Document & { mozCancelFullScreen?: () => Promise<void> })
            .mozCancelFullScreen
        ) {
          await (
            document as Document & { mozCancelFullScreen: () => Promise<void> }
          ).mozCancelFullScreen();
        } else if (
          (document as Document & { msExitFullscreen?: () => Promise<void> })
            .msExitFullscreen
        ) {
          await (
            document as Document & { msExitFullscreen: () => Promise<void> }
          ).msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn('Fullscreen toggle failed:', error);
    }
  }, [containerRef, isFullscreen]);

  // Enter fullscreen (for double-click behavior)
  const enterFullscreen = useCallback(async () => {
    const container = getContainerEl(containerRef);
    if (!container) return;

    try {
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (
        (
          container as HTMLDivElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen
      ) {
        await (
          container as HTMLDivElement & {
            webkitRequestFullscreen: () => Promise<void>;
          }
        ).webkitRequestFullscreen();
      } else if (
        (
          container as HTMLDivElement & {
            mozRequestFullScreen?: () => Promise<void>;
          }
        ).mozRequestFullScreen
      ) {
        await (
          container as HTMLDivElement & {
            mozRequestFullScreen: () => Promise<void>;
          }
        ).mozRequestFullScreen();
      } else if (
        (
          container as HTMLDivElement & {
            msRequestFullscreen?: () => Promise<void>;
          }
        ).msRequestFullscreen
      ) {
        await (
          container as HTMLDivElement & {
            msRequestFullscreen: () => Promise<void>;
          }
        ).msRequestFullscreen();
      }
    } catch (error) {
      console.warn('Enter fullscreen failed:', error);
    }
  }, [containerRef]);

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (
        (
          document as Document & {
            webkitExitFullscreen?: () => Promise<void>;
          }
        ).webkitExitFullscreen
      ) {
        await (
          document as Document & { webkitExitFullscreen: () => Promise<void> }
        ).webkitExitFullscreen();
      } else if (
        (document as Document & { mozCancelFullScreen?: () => Promise<void> })
          .mozCancelFullScreen
      ) {
        await (
          document as Document & { mozCancelFullScreen: () => Promise<void> }
        ).mozCancelFullScreen();
      } else if (
        (document as Document & { msExitFullscreen?: () => Promise<void> })
          .msExitFullscreen
      ) {
        await (
          document as Document & { msExitFullscreen: () => Promise<void> }
        ).msExitFullscreen();
      }
    } catch (error) {
      console.warn('Exit fullscreen failed:', error);
    }
  }, []);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    checkFullscreenState,
  };
}
