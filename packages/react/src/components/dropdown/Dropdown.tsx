// Dropdown: dropdown menu component with all sub-components.

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

// Context
interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown components must be used within Dropdown");
  return context;
}

// Main Dropdown
export interface DropdownProps {
  children?: unknown;
  className?: string;
}

export function Dropdown({ children, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div ref={dropdownRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Trigger
export interface DropdownTriggerProps {
  children?: unknown;
  className?: string;
  asChild?: boolean;
}

export function DropdownTrigger({ children, className = "" }: DropdownTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = useDropdownContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={className}
    >
      {children}
    </button>
  );
}

// Content
export interface DropdownContentProps {
  children?: unknown;
  align?: "start" | "center" | "end";
  className?: string;
}

export function DropdownContent({ children, align = "start", className = "" }: DropdownContentProps) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      role="menu"
      className={`
        absolute z-50 mt-2 min-w-[8rem] rounded-md border border-gray-200
        bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Item
export interface DropdownItemProps {
  children?: unknown;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

export function DropdownItem({
  children,
  onClick,
  disabled = false,
  destructive = false,
  className = "",
}: DropdownItemProps) {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={`
        w-full text-left px-4 py-2 text-sm
        ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}
        ${destructive && !disabled ? "text-red-600 hover:bg-red-50" : "text-gray-700"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Separator
export interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className = "" }: DropdownSeparatorProps) {
  return <div className={`my-1 h-px bg-gray-200 ${className}`} role="separator" />;
}
