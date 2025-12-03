// ModalBody: modal body content area.

export interface ModalBodyProps {
  children?: unknown;
  className?: string;
}

export function ModalBody({ children, className = "" }: ModalBodyProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
