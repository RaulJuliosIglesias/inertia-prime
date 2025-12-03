// SlideOverHeader: slide-over header with title and close button.

export interface SlideOverHeaderProps {
  children?: unknown;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export function SlideOverHeader({
  children,
  onClose,
  showCloseButton = true,
  className = "",
}: SlideOverHeaderProps) {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${className}`}>
      <div className="text-lg font-semibold text-gray-900">{children}</div>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
