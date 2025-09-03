'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function CommentForm({
  onSubmit,
  pending,
}: {
  onSubmit: (content: string, user_id: string) => void;
  pending?: boolean;
}) {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('demo_student_1');
  const [isInputFocused, setIsInputFocused] = useState(false);

  function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim(), userId);
    setContent('');
    setIsInputFocused(false);
  }

  function handleCancel() {
    setContent('');
    setUserId('demo_student_1');
    setIsInputFocused(false);
  }

  return (
    <motion.form
      onSubmit={handle}
      layout
      className={`grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2 ${
        isInputFocused ? 'grid-rows-2' : 'grid-rows-1'
      }`}
    >
      {/* Avatar */}
      <motion.div
        layout
        className="row-span-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-blue-100 font-bold text-blue-700"
      >
        <motion.span layout>{userId.slice(0, 1).toUpperCase()}</motion.span>
      </motion.div>

      {/* Input */}
      <motion.div layout className="col-start-2 row-start-1">
        <motion.div layout className="relative">
          <motion.input
            layout
            className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 focus:outline-none"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: isInputFocused ? '100%' : '0%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Action buttons - only show when input is focused */}
      {isInputFocused && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-start-2 row-start-2 flex items-center justify-end gap-2"
        >
          <motion.input
            className="rounded border p-2 text-sm"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
          <motion.button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded bg-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className={`cursor-pointer rounded bg-blue-600 px-3 py-2 text-sm text-white transition-colors duration-200 disabled:cursor-auto disabled:opacity-50 ${
              !pending && content.trim() && userId.trim()
                ? 'hover:bg-blue-700'
                : ''
            }`}
            disabled={pending || !content.trim() || !userId.trim()}
            whileHover={
              pending || !content.trim() || !userId.trim()
                ? {}
                : { scale: 1.02 }
            }
            whileTap={
              pending || !content.trim() || !userId.trim()
                ? {}
                : { scale: 0.98 }
            }
          >
            {pending ? 'Posting…' : 'Comment'}
          </motion.button>
        </motion.div>
      )}
    </motion.form>
  );
}
