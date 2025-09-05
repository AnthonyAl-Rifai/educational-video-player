'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useModal } from '@/hooks/useModal';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false); // sheet mounted?
  const [contentVisible, setContentVisible] = useState(false); // menu content shown?
  const { openModal } = useModal();

  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (mobileOpen) return setIsVisible(true);
    const prev = lastY.current;
    lastY.current = y;
    if (Math.abs(y - prev) < 2) return;
    if (y < 80) return setIsVisible(true);
    setIsVisible(y < prev);
  });

  // open / close
  const openMenu = () => {
    setMobileOpen(true);
    setContentVisible(true);
  };
  const startClose = () => {
    setContentVisible(false);
  }; // sheet unmounts after content exit

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && startClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // lock body scroll while sheet mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [mobileOpen]);

  // ENTER: slight delay + stagger
  // EXIT: fast fade (~120ms) + reverse stagger so items disappear almost together
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.12,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
  };

  return (
    <>
      {/* Header bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-transform duration-300 will-change-transform ${mobileOpen ? 'bg-white/90 backdrop-blur' : 'bg-white/60 backdrop-blur-md'} border-white/40`}
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <nav className="mx-auto max-w-[1504px] px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-20 items-center justify-between">
            {/* Left: brand + desktop search */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center text-4xl font-bold text-gray-900 transition-colors hover:text-blue-600"
                aria-label="Go to homepage"
              >
                <span>Edeo</span>
              </Link>

              <div className="relative hidden w-64 md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search videos..."
                  className="block w-full rounded-md border bg-white/70 py-2 pr-3 pl-10 text-lg ring-1 ring-white/40 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Search videos"
                />
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
              <Link href="/videos" className="px-3 py-2 text-xl text-gray-700 transition-colors hover:text-blue-600">
                Videos
              </Link>
              <motion.button
                type="button"
                onClick={openModal}
                className="inline-flex cursor-pointer items-center rounded-md bg-blue-600 px-4 py-2 text-xl text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                + Create
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      {/* Seed (only when closed) — at the button spot */}
      {!mobileOpen && (
        <motion.div
          layoutId="mobile-sheet"
          className="pointer-events-none fixed top-4 right-4 z-[70] h-12 w-12 transform-gpu rounded-xl bg-white/50 ring-1 ring-white/40 backdrop-blur-md md:hidden"
        />
      )}

      {/* Single fixed icon (topmost) — toggles open/close */}
      <button
        type="button"
        onClick={() => (mobileOpen ? startClose() : openMenu())}
        className="fixed top-4 right-4 z-[90] rounded-xl p-2 text-gray-900 md:hidden"
        aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-overlay"
      >
        {/* same icon for now so it never visually switches */}
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Morph target sheet */}
      <AnimatePresence mode="popLayout">
        {mobileOpen && (
          <motion.div
            layoutId="mobile-sheet"
            role="dialog"
            aria-modal="true"
            id="mobile-overlay"
            className="fixed inset-0 z-[80] transform-gpu bg-white/40 ring-1 ring-white/40 backdrop-blur-xl md:hidden"
            initial={{ borderRadius: 16 }}
            animate={{ borderRadius: 0 }}
            exit={{ borderRadius: 16 }} // no opacity fade → no flash
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => contentVisible && startClose()} // tap backdrop to start close
          >
            {/* Content staged separately: fades out first, THEN we unmount the sheet */}
            <AnimatePresence
              mode="wait"
              onExitComplete={() => setMobileOpen(false)} // after content fades out, morph back
            >
              {contentVisible && (
                <motion.div
                  key="menu-content"
                  className="mx-auto h-full max-w-[1504px] overflow-y-auto px-6 pt-24 pb-12"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()} // don't close when clicking inside
                >
                  <motion.div variants={item} className="relative mb-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      placeholder="Search videos..."
                      className="block w-full rounded-lg border bg-white/70 py-3 pr-3 pl-10 text-base ring-1 ring-white/40 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </motion.div>

                  <motion.nav variants={container} className="flex flex-col gap-4 text-2xl font-semibold">
                    <motion.div variants={item}>
                      <Link href="/videos" onClick={startClose} className="text-gray-900 hover:opacity-80">
                        Videos
                      </Link>
                    </motion.div>
                    <motion.div variants={item}>
                      <motion.button
                        type="button"
                        onClick={() => {
                          openModal();
                          startClose();
                        }}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-lg text-white"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: '#1d4ed8',
                          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        + Create
                      </motion.button>
                    </motion.div>
                  </motion.nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
