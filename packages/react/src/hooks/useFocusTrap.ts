// useFocusTrap: trap focus within an element (for modals, dialogs).

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active. */
  enabled?: boolean;
  /** Element to focus when trap activates. If not provided, focuses first focusable. */
  initialFocus?: HTMLElement | null;
  /** Element to focus when trap deactivates. If not provided, focuses previously focused. */
  returnFocus?: boolean;
}

export interface UseFocusTrapReturn {
  /** Ref to attach to the container element. */
  ref: React.RefObject<HTMLElement>;
}

/**
 * Hook that traps focus within a container element.
 * 
 * Useful for modals, dialogs, and other overlay components to ensure
 * keyboard navigation stays within the component.
 *
 * @example
 * const { ref } = useFocusTrap({ enabled: isOpen });
 * 
 * <div ref={ref}>
 *   <input />
 *   <button>Close</button>
 * </div>
 */
export function useFocusTrap(
  options: UseFocusTrapOptions = {}
): UseFocusTrapReturn {
  const { enabled = true, initialFocus, returnFocus = true } = options;
  const containerRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter((el) => el.offsetParent !== null); // Filter out hidden elements
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: moving backwards
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [enabled, getFocusableElements]
  );

  // Set up focus trap
  useEffect(() => {
    if (!enabled) return;

    // Store currently focused element
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    // Focus initial element or first focusable
    const focusInitial = () => {
      if (initialFocus) {
        initialFocus.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(focusInitial, 0);

    // Add keydown listener
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyDown);

      // Return focus to previously focused element
      if (returnFocus && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [enabled, initialFocus, returnFocus, getFocusableElements, handleKeyDown]);

  return {
    ref: containerRef as React.RefObject<HTMLElement>,
  };
}
