// Tooltip: tooltip component with all sub-components.

import { createContext, useContext, useState, useRef } from "react";

// Context
interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("Tooltip components must be used within Tooltip");
  return context;
}

// Main Tooltip
export interface TooltipProps {
  children?: unknown;
  /** Delay before showing tooltip in ms. @default 300 */
  delayDuration?: number;
}

export function Tooltip({ children, delayDuration = 300 }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number>();

  const handleOpen = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(true), delayDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <span
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        className="inline-block"
      >
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

// Trigger
export interface TooltipTriggerProps {
  children?: unknown;
  asChild?: boolean;
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <span className="inline-block">{children}</span>;
}

// Content
export interface TooltipContentProps {
  children?: unknown;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function TooltipContent({
  children,
  side = "top",
  className = "",
}: TooltipContentProps) {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      role="tooltip"
      className={`
        absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md
        shadow-md animate-in fade-in-0 zoom-in-95
        ${sideClasses[side]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
