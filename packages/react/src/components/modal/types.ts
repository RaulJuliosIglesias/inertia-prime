// Shared modal-related types.

import type { UseModalResult } from "../../hooks/useModal";

/**
 * Size variants for Modal/SlideOver components.
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props common to Modal and SlideOver components.
 */
export interface ModalBaseProps {
  /** Whether the modal is open. Can be controlled via useModal or directly. */
  isOpen: boolean;
  /** Callback when the modal requests to close (e.g., overlay click, Escape). */
  onClose: () => void;
  /** Size of the modal. @default "md" */
  size?: ModalSize;
  /** Whether clicking the overlay closes the modal. @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal. @default true */
  closeOnEscape?: boolean;
  /** Initial element to focus when the modal opens (ref object). */
  initialFocus?: { current: HTMLElement | null };
}

/**
 * State shape used internally by modal context.
 */
export interface ModalState<TData = unknown> extends UseModalResult<TData> {
  /** Unique identifier for this modal instance. */
  id: string;
}
