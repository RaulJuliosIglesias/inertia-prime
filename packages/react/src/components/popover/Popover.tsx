// Popover: popover component with all sub-components.

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

// Context
interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("Popover components must be used within Popover");
  return context;
}

// Main Popover
export interface PopoverProps {
  children?: unknown;
  className?: string;
}

export function Popover({ children, className = "" }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => setIsOpen(false));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div ref={popoverRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

// Trigger
export interface PopoverTriggerProps {
  children?: unknown;
  className?: string;
  asChild?: boolean;
}

export function PopoverTrigger({ children, className = "" }: PopoverTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopoverContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={className}
    >
      {children}
    </button>
  );
}

// Content
export interface PopoverContentProps {
  children?: unknown;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  className?: string;
}

export function PopoverContent({
  children,
  align = "center",
  side = "bottom",
  className = "",
}: PopoverContentProps) {
  const { isOpen } = usePopoverContext();

  if (!isOpen) return null;

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const sideClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  return (
    <div
      role="dialog"
      className={`
        absolute z-50 min-w-[8rem] rounded-md border border-gray-200
        bg-white p-4 shadow-md outline-none
        ${alignClasses[align]} ${sideClasses[side]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
