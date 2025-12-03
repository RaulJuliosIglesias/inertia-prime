// AsyncSelect: select with async option loading.

import { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDebounce } from "../../hooks/useDebounce";

export interface AsyncSelectOption {
  value: string;
  label: string;
}

export interface AsyncSelectProps {
  /** Function to load options. Receives search query. */
  loadOptions: (query: string) => Promise<AsyncSelectOption[]>;
  /** Selected value. */
  value?: string;
  /** Selected option (for display). */
  selectedOption?: AsyncSelectOption;
  /** Change handler. */
  onChange?: (value: string, option: AsyncSelectOption | null) => void;
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
  /** Debounce delay in ms. @default 300 */
  debounceMs?: number;
  /** Minimum characters to search. @default 0 */
  minChars?: number;
  /** Loading message. */
  loadingMessage?: string;
  /** Empty message. */
  emptyMessage?: string;
  /** Additional CSS class. */
  className?: string;
}

export const AsyncSelect = forwardRef<HTMLInputElement, AsyncSelectProps>(
  function AsyncSelect(
    {
      loadOptions,
      value,
      selectedOption,
      onChange,
      placeholder = "Select...",
      searchPlaceholder = "Type to search...",
      name,
      disabled = false,
      hasError = false,
      debounceMs = 300,
      minChars = 0,
      loadingMessage = "Loading...",
      emptyMessage = "No results found",
      className = "",
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState<AsyncSelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedSearch = useDebounce(search, debounceMs);

    useClickOutside(containerRef, () => setIsOpen(false));

    const fetchOptions = useCallback(async (query: string) => {
      if (query.length < minChars) {
        setOptions([]);
        return;
      }
      setIsLoading(true);
      try {
        const results = await loadOptions(query);
        setOptions(results);
      } catch {
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, [loadOptions, minChars]);

    useEffect(() => {
      if (isOpen) {
        fetchOptions(debouncedSearch);
      }
    }, [debouncedSearch, isOpen, fetchOptions]);

    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);

    const handleSelect = (opt: AsyncSelectOption) => {
      onChange?.(opt.value, opt);
      setIsOpen(false);
      setSearch("");
    };

    const displayValue = selectedOption?.label || options.find(o => o.value === value)?.label;

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
          <span className={displayValue ? "text-gray-900" : "text-gray-500"}>
            {displayValue || placeholder}
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
              {isLoading ? (
                <li className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent" />
                  {loadingMessage}
                </li>
              ) : options.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">{emptyMessage}</li>
              ) : (
                options.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={`
                        w-full px-3 py-2 text-left text-sm hover:bg-gray-100
                        ${opt.value === value ? "bg-blue-50 text-blue-700" : "text-gray-900"}
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
