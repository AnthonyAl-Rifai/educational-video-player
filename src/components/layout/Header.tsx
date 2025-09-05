'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useModal } from '@/hooks/useModal';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const { openModal } = useModal();

  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastY.current;
    lastY.current = y;
    if (Math.abs(y - prev) < 2) return;
    if (y < 80) return setIsVisible(true);
    setIsVisible(y < prev);
  });

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-md transition-transform duration-300 will-change-transform"
      style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <nav className="mx-auto max-w-[1504px] px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
              }}
            >
              <Link
                href="/"
                className="flex items-center text-4xl font-bold text-gray-900 transition-colors hover:text-blue-600"
                aria-label="Go to homepage"
              >
                <span>Edeo</span>
              </Link>
            </motion.div>
          </div>

          {/* Navigation - visible on all screens */}
          <div className="flex items-center gap-6" aria-label="Primary navigation">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
              }}
            >
              <Link
                href="/videos"
                className="px-3 py-2 text-xl font-bold text-gray-700 transition-colors hover:text-blue-600"
              >
                Videos
              </Link>
            </motion.div>
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
  );
}
