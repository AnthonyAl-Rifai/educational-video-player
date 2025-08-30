'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (mobileOpen) return setIsVisible(true); // keep header visible when menu is open
    const prev = lastY.current;
    lastY.current = y;
    if (Math.abs(y - prev) < 2) return;
    if (y < 80) return setIsVisible(true);
    setIsVisible(y < prev);
  });

  // Close on Escape + lock/unlock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 will-change-transform border-b
        ${mobileOpen ? 'bg-white/95 backdrop-blur' : 'bg-white/70 backdrop-blur-md'} border-gray-200/60`}
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <nav
          className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center h-20">
            {/* Left: Brand + desktop search */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                aria-label="Go to homepage"
              >
                <span>Edeo</span>
              </Link>

              <div className="relative w-64 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-label="Search videos"
                />
              </div>
            </div>

            {/* Desktop nav */}
            <div
              className="hidden md:flex items-center gap-6"
              aria-label="Primary navigation"
            >
              <Link
                href="/videos"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-xl transition-colors"
              >
                Videos
              </Link>
              <Link
                href="/videos/new"
                className="inline-flex items-center px-4 py-2 text-xl text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                + Create
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors bg-amber-400"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-overlay"
              >
                                 {mobileOpen ? (
                   <svg
                     className="h-8 w-8"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M6 18L18 6M6 6l12 12"
                     />
                   </svg>
                 ) : (
                   <svg
                     className="h-8 w-8"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M4 6h16M4 12h16M4 18h16"
                     />
                   </svg>
                 )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full-viewport mobile overlay */}
      <div
        id="mobile-overlay"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-200
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* content */}
        <div className="relative h-full max-w-[1504px] mx-auto px-6 pt-24">
          <button
            className="absolute right-4 top-4 p-2 rounded-md text-gray-700 hover:text-blue-600"
            aria-label="Close mobile menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="h-full flex flex-col gap-6 overflow-y-auto overscroll-contain pb-12">
            {/* Mobile search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Search videos"
              />
            </div>

            <Link
              href="/videos"
              onClick={() => setMobileOpen(false)}
              className="block text-gray-800 hover:text-blue-600 text-2xl font-semibold"
            >
              Videos
            </Link>

            <Link
              href="/videos/new"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-full px-4 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-colors"
            >
              + Create
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
