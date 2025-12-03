// CommandPalette: ⌘K style command palette with search.

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useScrollLock } from "../../hooks/useScrollLock";

export interface CommandItemData {
  id: string;
  label: string;
  description?: string;
  icon?: unknown;
  shortcut?: string;
  onSelect: () => void;
  group?: string;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  /** Whether the palette is open. */
  open: boolean;
  /** Close handler. */
  onClose: () => void;
  /** Command items. */
  items: CommandItemData[];
  /** Placeholder text. */
  placeholder?: string;
  /** Empty state message. */
  emptyMessage?: string;
  /** Additional CSS class. */
  className?: string;
}

interface CommandContextValue {
  search: string;
  selectedIndex: number;
  filteredItems: CommandItemData[];
}

const CommandContext = createContext<CommandContextValue | null>(null);

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = "Search commands...",
  emptyMessage = "No commands found",
  className = "",
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusTrap(containerRef, open);
  useScrollLock(open);

  // Filter items by search
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Group items
  const groupedItems = filteredItems.reduce((acc, item) => {
    const group = item.group || "Commands";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, CommandItemData[]>);

  // Keyboard navigation
  useKeyboard({
    key: "Escape",
    handler: onClose,
    enabled: open,
  });

  useKeyboard({
    key: "ArrowDown",
    handler: () => {
      setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    },
    enabled: open,
  });

  useKeyboard({
    key: "ArrowUp",
    handler: () => {
      setSelectedIndex((i) => Math.max(i - 1, 0));
    },
    enabled: open,
  });

  useKeyboard({
    key: "Enter",
    handler: () => {
      const item = filteredItems[selectedIndex];
      if (item && !item.disabled) {
        item.onSelect();
        onClose();
      }
    },
    enabled: open,
  });

  // Reset on open/search change
  useEffect(() => {
    setSelectedIndex(0);
  }, [search, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (open) {
      setSearch("");
    }
  }, [open]);

  if (!open) return null;

  const content = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-start justify-center p-4 pt-[15vh]">
        <div
          ref={containerRef}
          className={`
            relative w-full max-w-xl transform overflow-hidden rounded-xl
            bg-white shadow-2xl transition-all
            ${className}
          `}
        >
          {/* Search input */}
          <div className="flex items-center border-b border-gray-200 px-4">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="w-full border-0 bg-transparent py-4 pl-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
            />
            <kbd className="hidden sm:block rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">ESC</kbd>
          </div>

          {/* Results */}
          <CommandContext.Provider value={{ search, selectedIndex, filteredItems }}>
            <div className="max-h-80 overflow-y-auto py-2">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  {emptyMessage}
                </div>
              ) : (
                Object.entries(groupedItems).map(([group, groupItems]) => (
                  <div key={group}>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {group}
                    </div>
                    {groupItems.map((item) => {
                      const globalIndex = filteredItems.indexOf(item);
                      return (
                        <CommandItemComponent
                          key={item.id}
                          item={item}
                          isSelected={globalIndex === selectedIndex}
                          onSelect={() => {
                            if (!item.disabled) {
                              item.onSelect();
                              onClose();
                            }
                          }}
                          onHover={() => setSelectedIndex(globalIndex)}
                        />
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </CommandContext.Provider>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

// Sub-components
export interface CommandItemComponentProps {
  item: CommandItemData;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

function CommandItemComponent({ item, isSelected, onSelect, onHover }: CommandItemComponentProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      disabled={item.disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-2 text-left
        ${isSelected ? "bg-blue-50" : ""}
        ${item.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
      `}
    >
      {item.icon && (
        <span className="flex-shrink-0 text-gray-400">{item.icon as React.ReactNode}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{item.label}</div>
        {item.description && (
          <div className="text-xs text-gray-500 truncate">{item.description}</div>
        )}
      </div>
      {item.shortcut && (
        <kbd className="flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {item.shortcut}
        </kbd>
      )}
    </button>
  );
}

// Export sub-components
export { CommandItemComponent as CommandItem };
export type { CommandItemData as CommandItemType };

// Hook to use command palette
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyboard({
    key: "k",
    modifiers: ["meta"],
    handler: () => setIsOpen(true),
  });

  useKeyboard({
    key: "k",
    modifiers: ["ctrl"],
    handler: () => setIsOpen(true),
  });

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };
}
