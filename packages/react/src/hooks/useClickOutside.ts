// useClickOutside: detect clicks outside an element (for dropdowns, modals).

import { useEffect, useRef, useCallback } from "react";

export interface UseClickOutsideOptions {
  /** Whether the listener is active. */
  enabled?: boolean;
  /** Events to listen for. @default ["mousedown", "touchstart"] */
  events?: Array<"mousedown" | "touchstart" | "click">;
}

/**
 * Hook that calls a handler when clicking outside of an element.
 *
 * Useful for closing dropdowns, modals, and popovers when clicking outside.
 *
 * @param handler - Function to call when clicking outside
 * @param options - Configuration options
 * @returns Ref to attach to the container element
 *
 * @example
 * const ref = useClickOutside(() => setIsOpen(false));
 * 
 * <div ref={ref}>
 *   <Dropdown />
 * </div>
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  options: UseClickOutsideOptions = {}
): React.RefObject<T> {
  const { enabled = true, events = ["mousedown", "touchstart"] } = options;
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  // Keep handler ref up to date
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const handleEvent = useCallback(
    (event: Event) => {
      const target = event.target as Node;
      
      // Check if click was outside the ref element
      if (ref.current && !ref.current.contains(target)) {
        handlerRef.current();
      }
    },
    []
  );

  useEffect(() => {
    if (!enabled) return;

    // Add listeners for all specified events
    events.forEach((eventName) => {
      document.addEventListener(eventName, handleEvent, true);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleEvent, true);
      });
    };
  }, [enabled, events, handleEvent]);

  return ref;
}
