'use client';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  variant?: 'page' | 'inline' | 'minimal';
  className?: string;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading content.',
  onRetry,
  retryText = 'Try Again',
  variant = 'page',
  className = '',
}: ErrorStateProps) {
  const baseClasses = 'flex flex-col items-center justify-center';

  const variantClasses = {
    page: 'px-4 py-16',
    inline: 'px-4 py-8',
    minimal: 'px-2 py-4',
  };

  const iconSize = {
    page: 'h-12 w-12',
    inline: 'h-8 w-8',
    minimal: 'h-6 w-6',
  };

  const textSize = {
    page: 'text-xl',
    inline: 'text-lg',
    minimal: 'text-base',
  };

  if (variant === 'minimal') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <p className="text-gray-500">{message}</p>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`mb-4 rounded-full bg-red-100 p-3 ${variant === 'inline' ? 'mb-4' : 'mb-6'}`}>
        <svg className={`${iconSize[variant]} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h3 className={`mb-2 font-semibold text-gray-900 ${textSize[variant]}`}>{title}</h3>

      <p className={`mb-6 text-center text-gray-600 ${variant === 'page' ? 'max-w-md' : 'max-w-sm'}`}>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
