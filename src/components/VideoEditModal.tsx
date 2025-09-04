'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEditVideo, useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import { useRouter } from 'next/navigation';
import type { Video } from '@/types';

interface VideoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export default function VideoEditModal({
  isOpen,
  onClose,
  video,
}: VideoEditModalProps) {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState(video?.description || '');
  const edit = useEditVideo();
  const { refetch: refetchVideos } = useVideos(USER_ID);
  const router = useRouter();

  // Update form when video prop changes
  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
    }
  }, [video?.title, video?.description]);

  const handleClose = useCallback(() => {
    if (!edit.isPending) {
      if (video) {
        setTitle(video.title);
        setDescription(video.description);
      }
      onClose();
    }
  }, [edit.isPending, video?.title, video?.description, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video) return;
    
    edit.mutate(
      { video_id: video.id, title, description },
      {
        onSuccess: async () => {
          // Refetch videos to get the updated list
          await refetchVideos();
          handleClose();
        },
      },
    );
  };

  // Handle escape key globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !edit.isPending && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, edit.isPending, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && video && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-xl">
              <motion.div
                className="rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Video
                  </h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={edit.isPending}
                    className={`p-2 text-gray-400 transition-colors disabled:opacity-50 ${
                      edit.isPending ? '' : 'cursor-pointer hover:text-gray-600'
                    }`}
                    aria-label="Close modal"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      disabled={edit.isPending}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled={edit.isPending}
                      data-lenis-prevent
                    />
                  </div>

                  {/* Error message */}
                  {edit.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <p className="text-sm text-red-600">
                        Failed to update video. Please try again.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={edit.isPending}
                      className={`rounded-lg bg-gray-100 px-6 py-3 text-gray-700 transition-colors disabled:opacity-50 ${
                        edit.isPending ? '' : 'cursor-pointer hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        edit.isPending ||
                        !title.trim() ||
                        !description.trim() ||
                        (video && title === video.title &&
                          description === video.description)
                      }
                      className={`rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors disabled:opacity-50 ${
                        edit.isPending ||
                        !title.trim() ||
                        !description.trim() ||
                        (video && title === video.title &&
                          description === video.description)
                          ? ''
                          : 'cursor-pointer hover:bg-blue-700'
                      }`}
                    >
                      {edit.isPending ? 'Updating...' : 'Update Video'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
