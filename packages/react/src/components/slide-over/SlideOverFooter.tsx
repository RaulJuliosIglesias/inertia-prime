// SlideOverFooter: slide-over footer with actions.

export interface SlideOverFooterProps {
  children?: unknown;
  className?: string;
}

export function SlideOverFooter({ children, className = "" }: SlideOverFooterProps) {
  return (
    <div className={`flex items-center justify-end gap-2 p-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
