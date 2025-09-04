'use client';

import { RefObject, useCallback, useState, useEffect } from 'react';
import FullscreenIcon from '@/components/icons/FullscreenIcon';
import FullscreenExitIcon from '@/components/icons/FullscreenExitIcon';

function getContainerEl(ref?: RefObject<HTMLDivElement | null>) {
  return ref?.current ?? null;
}

export default function FullScreenButton({
  containerRef,
}: {
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Listen to document fullscreen changes
  useEffect(() => {
    const onDocumentFullscreenChange = () => {
      const container = getContainerEl(containerRef);
      if (!container) return;

      const isCurrentlyFullscreen = !!(
        document.fullscreenElement === container ||
        (document as Document & { webkitFullscreenElement?: Element })
          .webkitFullscreenElement === container ||
        (document as Document & { mozFullScreenElement?: Element })
          .mozFullScreenElement === container ||
        (document as Document & { msFullscreenElement?: Element })
          .msFullscreenElement === container
      );

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
  }, [containerRef]);

  const handleToggleFullscreen = useCallback(async () => {
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

  return (
    <button
      type="button"
      onClick={handleToggleFullscreen}
      className="cursor-pointer text-xl text-white transition-transform hover:scale-110"
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? (
        <FullscreenExitIcon size={32} />
      ) : (
        <FullscreenIcon size={32} />
      )}
    </button>
  );
}
