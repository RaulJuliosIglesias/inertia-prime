// Combobox: searchable select with filtering.

import { useState, useRef, useEffect, forwardRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Options to display. */
  options: ComboboxOption[];
  /** Selected value. */
  value?: string;
  /** Change handler. */
  onChange?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Search placeholder. */
  searchPlaceholder?: string;
  /** Field name. */
  name?: string;
  /** Whether disabled. */
  disabled?: boolean;
  /** Whether has error. */
  hasError?: boolean;
  /** Empty state message. */
  emptyMessage?: string;
  /** Additional CSS class. */
  className?: string;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      name,
      disabled = false,
      hasError = false,
      emptyMessage = "No results found",
      className = "",
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false));

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optValue: string) => {
      onChange?.(optValue);
      setIsOpen(false);
      setSearch("");
    };

    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);

    const baseClasses = `
      w-full px-3 py-2 border rounded-md shadow-sm text-left
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:cursor-not-allowed
      ${hasError ? "border-red-500" : "border-gray-300"}
    `;

    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <input type="hidden" name={name} value={value || ""} ref={ref} />
        
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`${baseClasses} flex items-center justify-between`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption?.label || placeholder}
          </span>
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="p-2 border-b border-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <ul className="max-h-60 overflow-auto py-1">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">{emptyMessage}</li>
              ) : (
                filteredOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                      disabled={opt.disabled}
                      className={`
                        w-full px-3 py-2 text-left text-sm
                        ${opt.value === value ? "bg-blue-50 text-blue-700" : "text-gray-900"}
                        ${opt.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
                      `}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
