import { motion } from 'motion/react';
import dayjs from '@/lib/dayjs';
import type { Comment } from '@/types';

interface VideoCommentProps {
  comment: Comment;
}

export default function VideoComment({ comment }: VideoCommentProps) {
  return (
    <motion.li
      layout
      className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] items-start gap-x-3 gap-y-1"
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className="row-span-2 flex h-12 w-12 items-center justify-center self-start rounded-full bg-blue-100 font-bold text-blue-700">
        {comment.user_id.slice(0, 1).toUpperCase()}
      </div>
      <div className="col-start-2 row-start-1 flex flex-wrap items-center gap-x-2 self-center text-sm text-gray-500">
        <span className="font-bold">{comment.user_id}</span>
        <span>• {dayjs(comment.created_at).fromNow()}</span>
      </div>
      <div className="col-start-2 row-start-2 self-center leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
        {comment.content}
      </div>
    </motion.li>
  );
}
