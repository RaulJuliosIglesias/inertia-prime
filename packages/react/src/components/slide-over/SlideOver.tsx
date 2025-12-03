// SlideOver: URL-aware slide-out panel component.

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useKeyboard } from "../../hooks/useKeyboard";
import type { ModalBaseProps } from "../modal/types";

export type SlideOverPosition = "left" | "right";
export type SlideOverSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for the SlideOver component.
 */
export interface SlideOverProps extends ModalBaseProps {
  /** Position of the slide-over panel. @default "right" */
  position?: SlideOverPosition;
  /** Size/width of the panel. @default "md" */
  size?: SlideOverSize;
  /** Panel title displayed in the header. */
  title?: string;
  /** Optional description below the title. */
  description?: string;
  /** Content to render inside the panel body. */
  children?: unknown;
  /** Footer content (typically action buttons). */
  footer?: unknown;
  /** Whether to show a close button in the header. @default true */
  showCloseButton?: boolean;
  /** Additional CSS class for the panel container. */
  className?: string;
  /** Whether clicking overlay closes the panel. @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the panel. @default true */
  closeOnEscape?: boolean;
}

const sizeClasses: Record<SlideOverSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

/**
 * Slide-over panel component.
 *
 * Similar to Modal but slides in from the side. Works with `useModal` hook.
 *
 * @example
 * const slideOver = useModal({ param: "panel", value: "details" });
 *
 * <SlideOver
 *   isOpen={slideOver.isOpen}
 *   onClose={slideOver.close}
 *   position="right"
 *   title="User Details"
 * >
 *   <UserDetails />
 * </SlideOver>
 */
export function SlideOver({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: SlideOverProps) {
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
  const handleOverlayClick = (e: MouseEvent | React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const positionClasses = position === "left"
    ? "left-0"
    : "right-0";

  const slideOverContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={handleOverlayClick as React.MouseEventHandler}
    >
      <div
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        className={`
          fixed inset-y-0 ${positionClasses} w-full ${sizeClasses[size]}
          bg-white shadow-xl flex flex-col
          transform transition-transform duration-300
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "slideover-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              {title && (
                <h2 id="slideover-title" className="text-lg font-semibold text-gray-900">
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
                aria-label="Close panel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer - fixed at bottom */}
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
    return createPortal(slideOverContent, document.body);
  }

  return null;
}
