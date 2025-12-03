// useModal: URL-driven modal state management.

import { useState, useCallback, useEffect, useMemo } from "react";
import { router } from "@inertiajs/react";

/**
 * Options for configuring the useModal hook.
 */
export interface UseModalOptions<TData = unknown> {
  /**
   * Query parameter name used to represent open state in the URL.
   * @default "modal"
   */
  param?: string;
  /**
   * The value to match in the URL param when this modal should be open.
   * Useful when multiple modals share the same param name.
   * @example "create" → ?modal=create
   */
  value?: string;
  /**
   * Initial data to pass to the modal (e.g., for edit forms).
   */
  initialData?: TData;
  /**
   * Callback when the modal opens.
   */
  onOpen?: (data?: TData) => void;
  /**
   * Callback when the modal closes.
   */
  onClose?: () => void;
}

/**
 * Result returned by useModal.
 */
export interface UseModalResult<TData = unknown> {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Open the modal, optionally with data. */
  open: (data?: TData) => void;
  /** Close the modal. */
  close: () => void;
  /** Toggle the modal state. */
  toggle: () => void;
  /** Data passed when opening the modal. */
  data: TData | undefined;
}

/**
 * Hook for managing modal state via URL query parameters.
 *
 * This enables shareable and bookmark-able modal states (e.g., ?modal=edit&id=5).
 *
 * @example
 * const createModal = useModal({ param: "modal", value: "create" });
 * const editModal = useModal<{ id: number }>({ param: "modal", value: "edit" });
 *
 * <button onClick={() => createModal.open()}>New</button>
 * <button onClick={() => editModal.open({ id: user.id })}>Edit</button>
 *
 * <Modal isOpen={createModal.isOpen} onClose={createModal.close}>...</Modal>
 */
export function useModal<TData = unknown>(
  options: UseModalOptions<TData> = {}
): UseModalResult<TData> {
  const {
    param = "modal",
    value,
    initialData,
    onOpen,
    onClose,
  } = options;

  const [data, setData] = useState<TData | undefined>(initialData);

  // Determine if modal is open based on URL
  const isOpen = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(param);
    
    if (value) {
      return paramValue === value;
    }
    return paramValue !== null && paramValue !== "";
  }, [param, value]);

  // Re-check URL on popstate
  const [, forceUpdate] = useState({});
  useEffect(() => {
    const handlePopState = () => forceUpdate({});
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Open the modal
  const open = useCallback(
    (openData?: TData) => {
      const params = new URLSearchParams(window.location.search);
      params.set(param, value || "true");
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      
      setData(openData);
      onOpen?.(openData);
      
      router.visit(newUrl, {
        preserveState: true,
        preserveScroll: true,
      });
    },
    [param, value, onOpen]
  );

  // Close the modal
  const close = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete(param);
    
    const search = params.toString();
    const newUrl = search
      ? `${window.location.pathname}?${search}`
      : window.location.pathname;
    
    setData(undefined);
    onClose?.();
    
    router.visit(newUrl, {
      preserveState: true,
      preserveScroll: true,
    });
  }, [param, onClose]);

  // Toggle the modal
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    data,
  };
}
