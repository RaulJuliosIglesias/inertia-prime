// useScrollLock: lock body scroll (for modals, overlays).

import { useEffect, useRef } from "react";

/**
 * Hook that locks body scroll when active.
 *
 * Useful for modals, slide-overs, and other overlay components
 * to prevent background scrolling.
 *
 * @param locked - Whether to lock the scroll
 *
 * @example
 * useScrollLock(isModalOpen);
 */
export function useScrollLock(locked: boolean): void {
  const originalStyleRef = useRef<string>("");

  useEffect(() => {
    if (!locked) return;

    // Store original overflow style
    originalStyleRef.current = document.body.style.overflow;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      // Restore original style
      document.body.style.overflow = originalStyleRef.current;
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}
