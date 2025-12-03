// useToast: hook for showing toast notifications.

/**
 * Toast notification variant.
 */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

/**
 * Options for creating a toast notification.
 */
export interface ToastOptions {
  /** Unique ID for the toast. Auto-generated if not provided. */
  id?: string;
  /** Title text for the toast. */
  title: string;
  /** Optional description/body text. */
  description?: string;
  /** Visual variant. @default "default" */
  variant?: ToastVariant;
  /** Duration in milliseconds before auto-dismiss. 0 = no auto-dismiss. @default 5000 */
  duration?: number;
  /** Whether the toast can be dismissed by the user. @default true */
  dismissible?: boolean;
  /** Optional action button. */
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Represents a toast currently in the queue.
 */
export interface Toast extends Required<Omit<ToastOptions, "action">> {
  action?: ToastOptions["action"];
  /** Timestamp when the toast was created. */
  createdAt: number;
}

/**
 * Result returned by useToast.
 */
export interface UseToastResult {
  /** All active toasts. */
  toasts: Toast[];
  /** Show a new toast. Returns the toast ID. */
  toast: (options: ToastOptions) => string;
  /** Convenience method for success toasts. */
  success: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
  /** Convenience method for error toasts. */
  error: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
  /** Convenience method for warning toasts. */
  warning: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
  /** Convenience method for info toasts. */
  info: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => string;
  /** Dismiss a specific toast by ID. */
  dismiss: (id: string) => void;
  /** Dismiss all toasts. */
  dismissAll: () => void;
}

/**
 * Hook for managing toast notifications.
 *
 * Toasts can be triggered from:
 * 1. Client-side via useToast().toast({ title: "Saved!" })
 * 2. Server-side via Laravel's SendsToastNotifications trait, which adds a
 *    `toast` prop to Inertia responses. The ToastProvider listens for this
 *    and auto-displays server-sent toasts.
 *
 * @example
 * const { toast, success, error } = useToast();
 *
 * // After successful save
 * success("User created successfully");
 *
 * // After an error
 * error("Failed to save", { description: "Please try again." });
 */
// Re-export from context for use in components
export { useToastContext as useToast } from "./ToastContext";
