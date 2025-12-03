// ToastProvider: context provider for toast notifications.

import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { ToastContextProvider, useToastContext } from "./ToastContext";
import type { ToastOptions, ToastVariant } from "./useToast";

/**
 * Position where toasts appear on screen.
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Props for the ToastProvider component.
 */
export interface ToastProviderProps {
  /** Application content. */
  children?: unknown;
  /** Default position for toasts. @default "bottom-right" */
  position?: ToastPosition;
  /** Default duration for toasts in ms. @default 5000 */
  defaultDuration?: number;
  /** Maximum number of toasts visible at once. @default 5 */
  maxToasts?: number;
  /** Gap between toasts in px. @default 8 */
  gap?: number;
}

/**
 * Internal component that listens for server-sent toasts.
 */
function ServerToastListener() {
  const page = usePage<{ toast?: ToastOptions }>();
  const { toast } = useToastContext();

  useEffect(() => {
    const serverToast = page.props.toast;
    if (serverToast && serverToast.title) {
      toast(serverToast);
    }
  }, [page.props.toast, toast]);

  return null;
}

/**
 * Provider component for toast notifications.
 *
 * Wrap your app with ToastProvider to enable useToast() and server-sent toasts.
 *
 * Server-sent toasts: The provider automatically listens for a `toast` prop
 * in Inertia page props (set via Laravel's SendsToastNotifications trait)
 * and displays it.
 *
 * @example
 * // In your app root (e.g., app.tsx)
 * <InertiaPrimeProvider>
 *   <ToastProvider position="top-right">
 *     {children}
 *   </ToastProvider>
 * </InertiaPrimeProvider>
 *
 * // In any component
 * const { success } = useToast();
 * success("Changes saved!");
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 5000,
  maxToasts = 5,
  gap = 8,
}: ToastProviderProps) {
  return (
    <ToastContextProvider
      maxToasts={maxToasts}
      defaultDuration={defaultDuration}
    >
      <ServerToastListener />
      {children}
      <ToastViewport position={position} gap={gap} />
    </ToastContextProvider>
  );
}

/**
 * Viewport component that renders the toast container.
 */
function ToastViewport({
  position,
  gap,
}: {
  position: ToastPosition;
  gap: number;
}) {
  const { toasts, dismiss } = useToastContext();

  // Position styles
  const positionStyles: Record<ToastPosition, string> = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-0 right-0",
  };

  // Variant styles
  const variantStyles: Record<ToastVariant, string> = {
    default: "bg-white border-gray-200 text-gray-900",
    success: "bg-green-50 border-green-200 text-green-900",
    error: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 p-4 flex flex-col ${positionStyles[position]}`}
      style={{ gap: `${gap}px` }}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            min-w-[300px] max-w-[400px] p-4 rounded-lg border shadow-lg
            ${variantStyles[t.variant]}
          `}
          role="alert"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-medium">{t.title}</p>
              {t.description && (
                <p className="mt-1 text-sm opacity-80">{t.description}</p>
              )}
              {t.action && (
                <button
                  onClick={t.action.onClick}
                  className="mt-2 text-sm font-medium underline"
                >
                  {t.action.label}
                </button>
              )}
            </div>
            {t.dismissible && (
              <button
                onClick={() => dismiss(t.id)}
                className="opacity-50 hover:opacity-100"
                aria-label="Dismiss"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
