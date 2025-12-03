// useKeyboard: keyboard shortcut and key event handling.

import { useEffect, useCallback, useRef } from "react";

export type KeyboardModifier = "ctrl" | "alt" | "shift" | "meta";
export type KeyboardHandler = (event: KeyboardEvent) => void;

export interface KeyboardShortcut {
  /** The key to listen for (e.g., "Escape", "Enter", "k"). */
  key: string;
  /** Required modifier keys. */
  modifiers?: KeyboardModifier[];
  /** Handler function. */
  handler: KeyboardHandler;
  /** Whether to prevent default behavior. @default true */
  preventDefault?: boolean;
  /** Whether to stop propagation. @default false */
  stopPropagation?: boolean;
}

export interface UseKeyboardOptions {
  /** Whether the listeners are active. */
  enabled?: boolean;
  /** Shortcuts to register. */
  shortcuts?: KeyboardShortcut[];
  /** Global Escape key handler. */
  onEscape?: KeyboardHandler;
  /** Global Enter key handler. */
  onEnter?: KeyboardHandler;
}

/**
 * Hook for handling keyboard shortcuts and key events.
 *
 * @example
 * // Simple escape handler
 * useKeyboard({
 *   onEscape: () => closeModal(),
 * });
 *
 * // Multiple shortcuts
 * useKeyboard({
 *   shortcuts: [
 *     { key: "k", modifiers: ["ctrl"], handler: () => openSearch() },
 *     { key: "Escape", handler: () => closeModal() },
 *   ],
 * });
 */
export function useKeyboard(options: UseKeyboardOptions = {}): void {
  const { enabled = true, shortcuts = [], onEscape, onEnter } = options;
  const optionsRef = useRef(options);

  // Keep options ref up to date
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const checkModifiers = useCallback(
    (event: KeyboardEvent, modifiers?: KeyboardModifier[]): boolean => {
      if (!modifiers || modifiers.length === 0) return true;

      return modifiers.every((mod) => {
        switch (mod) {
          case "ctrl":
            return event.ctrlKey;
          case "alt":
            return event.altKey;
          case "shift":
            return event.shiftKey;
          case "meta":
            return event.metaKey;
          default:
            return false;
        }
      });
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { shortcuts, onEscape, onEnter } = optionsRef.current;

      // Handle Escape
      if (event.key === "Escape" && onEscape) {
        onEscape(event);
        return;
      }

      // Handle Enter
      if (event.key === "Enter" && onEnter) {
        onEnter(event);
        return;
      }

      // Handle custom shortcuts
      if (shortcuts) {
        for (const shortcut of shortcuts) {
          const keyMatches =
            event.key.toLowerCase() === shortcut.key.toLowerCase() ||
            event.key === shortcut.key;

          if (keyMatches && checkModifiers(event, shortcut.modifiers)) {
            if (shortcut.preventDefault !== false) {
              event.preventDefault();
            }
            if (shortcut.stopPropagation) {
              event.stopPropagation();
            }
            shortcut.handler(event);
            return;
          }
        }
      }
    },
    [checkModifiers]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}
