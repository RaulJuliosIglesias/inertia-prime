// SlideOverBody: slide-over body content area.

export interface SlideOverBodyProps {
  children?: unknown;
  className?: string;
}

export function SlideOverBody({ children, className = "" }: SlideOverBodyProps) {
  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      {children}
    </div>
  );
}
