// DataTable: flagship server-driven table component.

import { useState, useCallback, useMemo } from "react";
import { DataTableContext, type DataTableContextValue } from "./context";
import { DataTableHead } from "./DataTableHead";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";
import type { DataTableColumn, DataTableSelection, TableSort, TableFilters } from "./types";
import type { UseInertiaTableResult } from "../../hooks/useInertiaTable";

export interface DataTableProps<TData = unknown> {
  /** Data from useInertiaTable hook or direct props. */
  data: TData[];
  /** Column definitions. */
  columns: DataTableColumn<TData>[];
  /** Current page (1-indexed). */
  page?: number;
  /** Items per page. */
  perPage?: number;
  /** Total number of items. */
  total?: number;
  /** Current sort state. */
  sort?: TableSort | null;
  /** Current filters. */
  filters?: TableFilters;
  /** Current search term. */
  search?: string;
  /** Callback when page changes. */
  onPageChange?: (page: number) => void;
  /** Callback when per page changes. */
  onPerPageChange?: (perPage: number) => void;
  /** Callback when sort changes. */
  onSortChange?: (sort: TableSort | null) => void;
  /** Callback when filters change. */
  onFiltersChange?: (filters: TableFilters) => void;
  /** Callback when search changes. */
  onSearchChange?: (search: string) => void;
  /** Whether data is loading. */
  isLoading?: boolean;
  /** Message when table is empty. @default "No results found." */
  emptyMessage?: string;
  /** Whether rows are selectable. @default false */
  selectable?: boolean;
  /** Callback when selection changes. */
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  /** Function to get row ID. @default (row) => row.id */
  getRowId?: (row: TData) => string | number;
  /** Whether to show pagination. @default true */
  showPagination?: boolean;
  /** Additional CSS class. */
  className?: string;
  /** Children (for custom composition). */
  children?: React.ReactNode;
}

/**
 * Create DataTable props from useInertiaTable result.
 */
export function fromInertiaTable<TData>(
  result: UseInertiaTableResult<TData>,
  columns: DataTableColumn<TData>[]
): DataTableProps<TData> {
  const total = result.meta.pagination?.total ?? result.rows.length;

  return {
    data: result.rows,
    columns,
    page: result.page,
    perPage: result.perPage,
    total,
    sort: result.sort,
    filters: result.filters,
    search: result.search,
    onPageChange: result.setPage,
    onPerPageChange: result.setPerPage,
    onSortChange: result.setSort,
    onFiltersChange: result.setFilters,
    onSearchChange: result.setSearch,
    isLoading: result.isLoading,
  };
}

/**
 * Server-driven DataTable component.
 *
 * @example
 * const table = useInertiaTable({ response: users });
 * const columns = [
 *   { key: 'name', label: 'Name', sortable: true },
 *   { key: 'email', label: 'Email' },
 * ];
 *
 * <DataTable {...fromInertiaTable(table, columns)} />
 */
export function DataTable<TData = unknown>({
  data,
  columns,
  page = 1,
  perPage = 10,
  total = 0,
  sort = null,
  filters = {},
  search = "",
  onPageChange,
  onPerPageChange,
  onSortChange,
  onFiltersChange,
  onSearchChange,
  isLoading = false,
  emptyMessage = "No results found.",
  selectable = false,
  onSelectionChange,
  getRowId = (row: TData) => (row as Record<string, unknown>).id as string | number,
  showPagination = true,
  className = "",
  children,
}: DataTableProps<TData>) {
  // Selection state
  const [selection, setSelection] = useState<DataTableSelection>({
    selectedIds: new Set(),
    allSelected: false,
  });

  const totalPages = Math.ceil(total / perPage);

  // Selection handlers
  const toggleRowSelection = useCallback(
    (id: string | number) => {
      setSelection((prev) => {
        const newIds = new Set(prev.selectedIds);
        if (newIds.has(id)) {
          newIds.delete(id);
        } else {
          newIds.add(id);
        }
        const allSelected = newIds.size === data.length && data.length > 0;
        onSelectionChange?.(newIds);
        return { selectedIds: newIds, allSelected };
      });
    },
    [data.length, onSelectionChange]
  );

  const toggleAllSelection = useCallback(() => {
    setSelection((prev) => {
      if (prev.allSelected) {
        onSelectionChange?.(new Set());
        return { selectedIds: new Set(), allSelected: false };
      } else {
        const allIds = new Set(data.map(getRowId));
        onSelectionChange?.(allIds);
        return { selectedIds: allIds, allSelected: true };
      }
    });
  }, [data, getRowId, onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelection({ selectedIds: new Set(), allSelected: false });
    onSelectionChange?.(new Set());
  }, [onSelectionChange]);

  // Context value
  const contextValue = useMemo<DataTableContextValue<TData>>(
    () => ({
      rows: data,
      columns,
      sort,
      setSort: onSortChange || (() => {}),
      page,
      setPage: onPageChange || (() => {}),
      perPage,
      setPerPage: onPerPageChange || (() => {}),
      total,
      totalPages,
      filters,
      setFilters: onFiltersChange || (() => {}),
      search,
      setSearch: onSearchChange || (() => {}),
      isLoading,
      selection,
      toggleRowSelection,
      toggleAllSelection,
      clearSelection,
      getRowId,
      emptyMessage,
    }),
    [
      data, columns, sort, onSortChange, page, onPageChange, perPage,
      onPerPageChange, total, totalPages, filters, onFiltersChange,
      search, onSearchChange, isLoading, selection, toggleRowSelection,
      toggleAllSelection, clearSelection, getRowId, emptyMessage,
    ]
  );

  return (
    <DataTableContext.Provider value={contextValue as DataTableContextValue<unknown>}>
      <div className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}>
        {children || (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <DataTableHead selectable={selectable} />
                <DataTableBody selectable={selectable} />
              </table>
            </div>
            {showPagination && total > 0 && <DataTablePagination />}
          </>
        )}
      </div>
    </DataTableContext.Provider>
  );
}

// Re-export sub-components for custom composition
export { DataTableHead } from "./DataTableHead";
export { DataTableBody } from "./DataTableBody";
export { DataTablePagination } from "./DataTablePagination";
export { DataTableSearch } from "./DataTableSearch";
