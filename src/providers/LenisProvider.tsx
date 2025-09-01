'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

type Props = {
  children: React.ReactNode;
  stopped?: boolean;
};

export default function LenisProvider({ children, stopped = false }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    const raf = (t: number) => {
      lenis.raf(t);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const l = lenisRef.current;
    if (!l) return;
    if (stopped) {
      l.stop();
    } else {
      l.start();
    }
  }, [stopped]);

  return <>{children}</>;
}
