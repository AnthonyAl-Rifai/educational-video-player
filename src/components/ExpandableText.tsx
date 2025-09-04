'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

type Props = { text: string; collapsedHeightPx?: number };

export default function ExpandableText({
  text,
  collapsedHeightPx = 48,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeightPx, setExpandedHeightPx] = useState<number | null>(null);
  const [showToggle, setShowToggle] = useState(false);

  // Only for showing the toggle
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setShowToggle(el.scrollHeight > collapsedHeightPx + 1);
  }, [text, collapsedHeightPx]);

  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (!isExpanded) {
      // measure once right before expanding
      setExpandedHeightPx(el.scrollHeight);
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  if (!text) return null;

  return (
    <div className="relative">
      <motion.div
        initial={{ maxHeight: collapsedHeightPx }}
        animate={{
          maxHeight: isExpanded
            ? (expandedHeightPx ?? collapsedHeightPx)
            : collapsedHeightPx,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="overflow-hidden"
        aria-expanded={isExpanded}
      >
        <div ref={contentRef} className="leading-6 text-gray-600">
          {text}
        </div>
      </motion.div>

      {!isExpanded && showToggle && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 h-6 bg-gradient-to-b from-transparent to-white" />
      )}

      {showToggle && (
        <button
          type="button"
          onClick={toggle}
          className="mt-2 cursor-pointer text-sm text-blue-600 transition-colors hover:text-blue-700"
        >
          {isExpanded ? '...hide' : '...show'}
        </button>
      )}
    </div>
  );
}
