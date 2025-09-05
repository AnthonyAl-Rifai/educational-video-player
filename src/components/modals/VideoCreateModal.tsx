'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCreateVideo, useVideos } from '@/lib/queries';
import { USER_ID } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';

export default function VideoCreateModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const create = useCreateVideo(USER_ID);
  const { refetch: refetchVideos } = useVideos(USER_ID);
  const router = useRouter();
  const { isModalOpen, closeModal } = useModal();

  // URL validation functions
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidVideoUrl = (url: string): boolean => {
    if (!isValidUrl(url)) return false;

    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const urlLower = url.toLowerCase();

    // Check if URL ends with a video extension
    return videoExtensions.some((ext) => urlLower.includes(ext));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVideoUrl(value);

    if (value.trim() === '') {
      setUrlError('');
    } else if (!value.startsWith('http://') && !value.startsWith('https://')) {
      setUrlError('URL must start with http:// or https:// (e.g., https://example.com/video.mp4)');
    } else if (!isValidUrl(value)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com/video.mp4)');
    } else if (!isValidVideoUrl(value)) {
      setUrlError('Please enter a URL to a video file (MP4, WebM, OGG, MOV, AVI, MKV)');
    } else {
      setUrlError('');
    }
  };

  const handleClose = useCallback(() => {
    if (!create.isPending) {
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setUrlError('');
      closeModal();
    }
  }, [create.isPending, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate URL before submission
    if (videoUrl.trim() && !isValidVideoUrl(videoUrl)) {
      setUrlError('Please enter a valid video URL');
      return;
    }

    create.mutate(
      { user_id: USER_ID, title, description, video_url: videoUrl },
      {
        onSuccess: async () => {
          // Refetch videos to get the updated list with the new video
          const { data: updatedVideos } = await refetchVideos();

          if (updatedVideos && updatedVideos.length > 0) {
            // Find the most recently created video (assuming they're sorted by date desc)
            const latestVideo = updatedVideos[0];
            router.push(`/videos/${latestVideo.id}`);
          } else {
            // Fallback to videos page if no videos found
            router.push('/videos');
          }
          handleClose();
        },
      },
    );
  };

  // Handle escape key globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !create.isPending && isModalOpen) {
        handleClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, create.isPending, handleClose]);

  return (
    <AnimatePresence>
      {isModalOpen && (
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
              <motion.div className="rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Video</h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={create.isPending}
                    className={`p-2 text-gray-400 transition-colors disabled:opacity-50 ${
                      create.isPending ? '' : 'cursor-pointer hover:text-gray-600'
                    }`}
                    aria-label="Close modal"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      disabled={create.isPending}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video description"
                      value={description}
                      onChange={handleDescriptionChange}
                      required
                      disabled={create.isPending}
                      data-lenis-prevent
                    />
                  </div>

                  <div>
                    <label htmlFor="videoUrl" className="mb-2 block text-sm font-medium text-gray-700">
                      Video URL
                    </label>
                    <input
                      id="videoUrl"
                      type="url"
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 ${
                        urlError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="https://example.com/video.mp4"
                      value={videoUrl}
                      onChange={handleUrlChange}
                      required
                      disabled={create.isPending}
                    />
                    {urlError ? (
                      <p className="mt-1 text-sm text-red-600">{urlError}</p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">
                        Enter a direct link to a video file (MP4, WebM, OGG, MOV, AVI, MKV)
                      </p>
                    )}
                  </div>

                  {/* Error message */}
                  {create.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <p className="text-sm text-red-600">Failed to create video. Please try again.</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={handleClose}
                      disabled={create.isPending}
                      className={`rounded-lg bg-gray-100 px-6 py-3 text-gray-700 transition-colors disabled:opacity-50 ${
                        create.isPending ? '' : 'cursor-pointer hover:bg-gray-200'
                      }`}
                      whileHover={!create.isPending ? { scale: 1.02 } : {}}
                      whileTap={!create.isPending ? { scale: 0.98 } : {}}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={
                        create.isPending || !title.trim() || !description.trim() || !videoUrl.trim() || !!urlError
                      }
                      className={`rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors disabled:opacity-50 ${
                        create.isPending || !title.trim() || !description.trim() || !videoUrl.trim() || !!urlError
                          ? ''
                          : 'cursor-pointer hover:bg-blue-700'
                      }`}
                      whileHover={
                        !create.isPending && title.trim() && description.trim() && videoUrl.trim() && !urlError
                          ? { scale: 1.02 }
                          : {}
                      }
                      whileTap={
                        !create.isPending && title.trim() && description.trim() && videoUrl.trim() && !urlError
                          ? { scale: 0.98 }
                          : {}
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {create.isPending ? 'Creating...' : 'Create Video'}
                    </motion.button>
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
