// ToastContext: context for managing toast notifications.

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Toast, ToastOptions, ToastVariant, UseToastResult } from "./useToast";

interface ToastContextValue extends UseToastResult {
  /** Maximum number of toasts to show at once. */
  maxToasts: number;
  /** Default duration for toasts. */
  defaultDuration: number;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderContextProps {
  children?: unknown;
  maxToasts?: number;
  defaultDuration?: number;
}

let toastIdCounter = 0;
function generateToastId(): string {
  return `toast_${++toastIdCounter}_${Date.now()}`;
}

export function ToastContextProvider({
  children,
  maxToasts = 5,
  defaultDuration = 5000,
}: ToastProviderContextProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add a new toast
  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || generateToastId();
      const toast: Toast = {
        id,
        title: options.title,
        description: options.description ?? "",
        variant: options.variant ?? "default",
        duration: options.duration ?? defaultDuration,
        dismissible: options.dismissible ?? true,
        action: options.action,
        createdAt: Date.now(),
      };

      setToasts((prev: Toast[]) => {
        const next = [toast, ...prev];
        // Limit to maxToasts
        return next.slice(0, maxToasts);
      });

      // Auto-dismiss after duration
      if (toast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, toast.duration);
      }

      return id;
    },
    [defaultDuration, maxToasts]
  );

  // Dismiss a specific toast
  const dismiss = useCallback((id: string) => {
    setToasts((prev: Toast[]) => prev.filter((t: Toast) => t.id !== id));
  }, []);

  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const toast = useCallback(
    (options: ToastOptions) => addToast(options),
    [addToast]
  );

  const success = useCallback(
    (title: string, options?: Omit<ToastOptions, "title" | "variant">) =>
      addToast({ ...options, title, variant: "success" }),
    [addToast]
  );

  const error = useCallback(
    (title: string, options?: Omit<ToastOptions, "title" | "variant">) =>
      addToast({ ...options, title, variant: "error" }),
    [addToast]
  );

  const warning = useCallback(
    (title: string, options?: Omit<ToastOptions, "title" | "variant">) =>
      addToast({ ...options, title, variant: "warning" }),
    [addToast]
  );

  const info = useCallback(
    (title: string, options?: Omit<ToastOptions, "title" | "variant">) =>
      addToast({ ...options, title, variant: "info" }),
    [addToast]
  );

  const value: ToastContextValue = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    maxToasts,
    defaultDuration,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { ToastContext };
