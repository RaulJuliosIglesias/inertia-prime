// Shared DataTable types.

import type { TableMeta, TableSort, TableFilters } from "../../types/inertia";

/**
 * Column definition used by the DataTable component.
 */
export interface DataTableColumn<TData = unknown> {
  /** Server-side column key or field name used for sorting/filtering. */
  key: string;
  /** Human-friendly column label. */
  label: string;
  /** Whether the column can be sorted server-side. @default false */
  sortable?: boolean;
  /** Whether the column is visible by default. @default true */
  visible?: boolean;
  /** Optional fixed width (px or CSS value). */
  width?: string | number;
  /** Text alignment. @default "left" */
  align?: "left" | "center" | "right";
  /** Custom cell renderer. */
  render?: (value: unknown, row: TData, index: number) => React.ReactNode;
  /** Custom header renderer. */
  headerRender?: () => React.ReactNode;
  /** CSS class for the column cells. */
  className?: string;
}

/**
 * Alias around the shared TableMeta type.
 */
export type DataTableMeta = TableMeta;

/**
 * Selection state for row selection.
 */
export interface DataTableSelection {
  /** Currently selected row IDs. */
  selectedIds: Set<string | number>;
  /** Whether all rows are selected. */
  allSelected: boolean;
}

/**
 * Props common to all DataTable sub-components.
 */
export interface DataTableCommonProps {
  /** Additional CSS class. */
  className?: string;
}

export type { TableSort, TableFilters };
