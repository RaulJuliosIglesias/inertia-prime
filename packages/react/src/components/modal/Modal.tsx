// Modal: URL-aware dialog component.

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useKeyboard } from "../../hooks/useKeyboard";
import type { ModalBaseProps } from "./types";

/**
 * Props for the Modal component.
 */
export interface ModalProps extends ModalBaseProps {
  /** Modal title displayed in the header. */
  title?: string;
  /** Optional description below the title. */
  description?: string;
  /** Content to render inside the modal body. */
  children?: unknown;
  /** Footer content (typically action buttons). */
  footer?: unknown;
  /** Whether to show a close button in the header. @default true */
  showCloseButton?: boolean;
  /** Additional CSS class for the modal container. */
  className?: string;
  /** Size of the modal. @default "md" */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Whether clicking overlay closes the modal. @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal. @default true */
  closeOnEscape?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

/**
 * Modal component for displaying dialogs and forms.
 *
 * Works seamlessly with `useModal` for URL-driven state:
 *
 * @example
 * const modal = useModal({ param: "modal", value: "create" });
 *
 * <Modal
 *   isOpen={modal.isOpen}
 *   onClose={modal.close}
 *   title="Create User"
 * >
 *   <Form>...</Form>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className = "",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const { ref: focusTrapRef } = useFocusTrap({ enabled: isOpen });
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useScrollLock(isOpen);

  // Handle Escape key
  useKeyboard({
    enabled: isOpen && closeOnEscape,
    onEscape: onClose,
  });

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        className={`
          w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl
          transform transition-all
          ${className}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render in portal to body
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}
