'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useModal } from '@/hooks/useModal';

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <motion.section
      className="flex min-h-[calc(100dvh-5rem)] items-center lg:min-h-[calc(85vh)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mb-10 w-full">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1.1fr] lg:grid-rows-2 lg:items-center">
          {/* Main Heading */}
          <div className="text-left lg:col-start-1 lg:row-start-1">
            <h1 className="text-[clamp(3rem,6vw+1rem,6rem)] leading-[1.15] font-bold tracking-tight text-gray-900 lg:leading-[1.06]">
              Press Play.
              <span className="block text-blue-600">Start Learning.</span>
            </h1>
          </div>

          {/* Hero Image - Mobile: between heading and subtext, Desktop: right column */}
          <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src="/assets/images/hero-image.svg"
                alt="Educational Video Learning"
                width={1000}
                height={900}
                className="h-auto w-full max-w-7xl scale-110"
                priority
              />
            </div>
          </div>

          {/* Subtext and Buttons */}
          <div className="text-left lg:col-start-1 lg:row-start-2">
            <p className="mb-8 text-xl text-gray-600 sm:text-3xl">
              Discover, create, and share knowledge through engaging video content. Join our community of learners and
              educators.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="/videos"
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
                className="rounded-lg bg-blue-600 px-8 py-4 text-center text-lg font-semibold text-white"
              >
                Start Learning
              </motion.a>
              <motion.button
                type="button"
                onClick={openModal}
                className="cursor-pointer rounded-lg border-2 border-blue-600 px-8 py-4 text-center text-lg font-semibold text-blue-600"
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
                Create Video
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
