// ModalFooter: modal footer with actions.

export interface ModalFooterProps {
  children?: unknown;
  className?: string;
}

export function ModalFooter({ children, className = "" }: ModalFooterProps) {
  return (
    <div className={`flex items-center justify-end gap-2 p-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
