'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoDropdownMenuProps {
  onEdit: () => void;
}

export default function VideoDropdownMenu({ onEdit }: VideoDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 3-dot button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer rounded-lg bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
        aria-label="Video options"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
            role="menu"
            aria-orientation="vertical"
          >
            <button
              type="button"
              onClick={handleEdit}
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
              role="menuitem"
            >
              Edit Video
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
