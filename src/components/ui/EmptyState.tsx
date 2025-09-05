'use client';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  variant?: 'page' | 'inline' | 'minimal';
  className?: string;
}

export default function EmptyState({
  title = 'No content available',
  message = 'There are no items to display at the moment.',
  actionText,
  onAction,
  icon,
  variant = 'page',
  className = '',
}: EmptyStateProps) {
  const baseClasses = 'flex flex-col items-center justify-center';

  const variantClasses = {
    page: 'px-4 py-16',
    inline: 'px-4 py-8',
    minimal: 'px-2 py-4',
  };

  const iconSize = {
    page: 'h-16 w-16',
    inline: 'h-12 w-12',
    minimal: 'h-8 w-8',
  };

  const textSize = {
    page: 'text-xl',
    inline: 'text-lg',
    minimal: 'text-base',
  };

  const defaultIcon = (
    <svg className={`${iconSize[variant]} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );

  if (variant === 'minimal') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <p className="text-gray-500">{message}</p>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`mb-6 rounded-full bg-gray-100 p-4 ${variant === 'inline' ? 'mb-4' : 'mb-6'}`}>
        {icon || defaultIcon}
      </div>

      <h3 className={`mb-2 font-semibold text-gray-900 ${textSize[variant]}`}>{title}</h3>

      <p className={`mb-6 text-center text-gray-600 ${variant === 'page' ? 'max-w-md' : 'max-w-sm'}`}>{message}</p>

      {onAction && actionText && (
        <button
          onClick={onAction}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
