'use client';

import { motion } from 'motion/react';
import type { SortOption } from '@/types';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  isLoading?: boolean;
}

export default function FilterBar({ sortBy, onSortChange, isLoading = false }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="flex rounded-lg bg-gray-100 p-1 ring-1 ring-gray-200">
          <motion.button
            type="button"
            aria-pressed={sortBy === 'date'}
            onClick={() => onSortChange('date')}
            disabled={isLoading}
            className={`relative cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              sortBy === 'date' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            whileHover={!isLoading ? { scale: 1.04 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {sortBy === 'date' && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-md bg-white shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">Date</span>
          </motion.button>

          <motion.button
            type="button"
            aria-pressed={sortBy === 'comments'}
            onClick={() => onSortChange('comments')}
            disabled={isLoading}
            className={`relative cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              sortBy === 'comments' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            whileHover={!isLoading ? { scale: 1.04 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {sortBy === 'comments' && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-md bg-white shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">Comments</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
