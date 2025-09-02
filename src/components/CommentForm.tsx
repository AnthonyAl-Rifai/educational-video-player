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
        className="row-span-1 h-12 w-12 rounded-full bg-blue-100 self-center flex items-center justify-center text-blue-700 font-bold"
      >
        <motion.span layout>{userId.slice(0, 1).toUpperCase()}</motion.span>
      </motion.div>

      {/* Input */}
      <motion.div layout className="col-start-2 row-start-1">
        <motion.input
          layout
          className="w-full border rounded p-2"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />
      </motion.div>

      {/* Action buttons - only show when input is focused */}
      {isInputFocused && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-start-2 row-start-2 justify-end flex items-center gap-2"
        >
          <motion.input
            className="border rounded p-2 text-sm"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
          <motion.button
            layout
            type="button"
            onClick={handleCancel}
            className="rounded bg-gray-200 text-gray-700 px-3 py-2 text-sm hover:bg-gray-300"
          >
            Cancel
          </motion.button>
          <motion.button
            layout
            type="submit"
            className="rounded bg-black text-white px-3 py-2 text-sm disabled:opacity-50"
            disabled={pending || !content.trim()}
          >
            {pending ? 'Posting…' : 'Comment'}
          </motion.button>
        </motion.div>
      )}
    </motion.form>
  );
}
