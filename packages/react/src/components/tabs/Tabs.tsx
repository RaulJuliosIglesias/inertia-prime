// Tabs: tab system with all sub-components.

import { createContext, useContext, useState } from "react";

// Context
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used within Tabs");
  return context;
}

// Main Tabs
export interface TabsProps {
  /** Default active tab value. */
  defaultValue: string;
  /** Controlled active tab value. */
  value?: string;
  /** Tab change handler. */
  onValueChange?: (value: string) => void;
  /** Children (TabsList, TabsContent). */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className = "",
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = (tab: string) => {
    if (value === undefined) setInternalValue(tab);
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// TabsList
export interface TabsListProps {
  children?: unknown;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={`
        inline-flex items-center justify-center rounded-lg bg-gray-100 p-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// TabsTrigger
export interface TabsTriggerProps {
  /** Value that identifies this tab. */
  value: string;
  /** Tab label. */
  children?: unknown;
  /** Whether disabled. */
  disabled?: boolean;
  /** Additional CSS class. */
  className?: string;
}

export function TabsTrigger({
  value,
  children,
  disabled = false,
  className = "",
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md
        px-3 py-1.5 text-sm font-medium transition-all
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:pointer-events-none disabled:opacity-50
        ${isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// TabsContent
export interface TabsContentProps {
  /** Value that identifies which tab shows this content. */
  value: string;
  /** Content to display. */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      className={`mt-2 focus-visible:outline-none ${className}`}
    >
      {children}
    </div>
  );
}
