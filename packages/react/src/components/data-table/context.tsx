// DataTable context for sharing state between sub-components.

import { createContext, useContext } from "react";
import type { DataTableColumn, DataTableSelection, TableSort, TableFilters } from "./types";

/**
 * Context value shared between DataTable sub-components.
 */
export interface DataTableContextValue<TData = unknown> {
  /** Row data. */
  rows: TData[];
  /** Column definitions. */
  columns: DataTableColumn<TData>[];
  /** Current sort state. */
  sort: TableSort | null;
  /** Set sort column and direction. */
  setSort: (sort: TableSort | null) => void;
  /** Current page. */
  page: number;
  /** Set current page. */
  setPage: (page: number) => void;
  /** Items per page. */
  perPage: number;
  /** Set items per page. */
  setPerPage: (perPage: number) => void;
  /** Total number of items. */
  total: number;
  /** Total number of pages. */
  totalPages: number;
  /** Current filters. */
  filters: TableFilters;
  /** Set filters. */
  setFilters: (filters: TableFilters) => void;
  /** Current search term. */
  search: string;
  /** Set search term. */
  setSearch: (search: string) => void;
  /** Whether data is loading. */
  isLoading: boolean;
  /** Selection state. */
  selection: DataTableSelection;
  /** Toggle row selection. */
  toggleRowSelection: (id: string | number) => void;
  /** Toggle all rows selection. */
  toggleAllSelection: () => void;
  /** Clear selection. */
  clearSelection: () => void;
  /** Get row ID from row data. */
  getRowId: (row: TData) => string | number;
  /** Empty state message. */
  emptyMessage: string;
}

const DataTableContext = createContext<DataTableContextValue<unknown> | null>(null);

/**
 * Hook to access DataTable context.
 * Must be used within a DataTable component.
 */
export function useDataTableContext<TData = unknown>(): DataTableContextValue<TData> {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("DataTable sub-components must be used within a DataTable");
  }
  return context as DataTableContextValue<TData>;
}

export { DataTableContext };
