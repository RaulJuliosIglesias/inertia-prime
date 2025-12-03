// Inertia-specific shared types for table responses.

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

/**
 * Direction for table sorting.
 */
export type TableSortDirection = "asc" | "desc";

/**
 * Sorting configuration for a table.
 */
export interface TableSort {
  column: string;
  direction: TableSortDirection;
}

/**
 * Pagination metadata as seen by the frontend.
 * Mirrors common Laravel paginator fields.
 */
export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

/**
 * Single pagination link (often used for the numbered page links).
 */
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

/**
 * Supported filter operators.
 * These map to common query operators in Laravel.
 */
export type TableFilterOperator =
  | "eq"      // equals
  | "neq"     // not equals
  | "gt"      // greater than
  | "gte"     // greater than or equal
  | "lt"      // less than
  | "lte"     // less than or equal
  | "like"    // LIKE %value%
  | "in"      // whereIn
  | "notIn"   // whereNotIn
  | "between" // whereBetween
  | "isNull"  // whereNull
  | "isNotNull"; // whereNotNull

/**
 * Single filter condition with operator and value.
 */
export interface TableFilterCondition {
  operator: TableFilterOperator;
  value: unknown;
}

/**
 * Normalized filter structure.
 * Keys are column/field names; values are either:
 * - A primitive (shorthand for `eq`), or
 * - A TableFilterCondition object.
 */
export type TableFilters = Record<string, unknown | TableFilterCondition>;

/**
 * Definition of a single filter input used by the UI.
 */
export interface TableFilterDefinition {
  /** Column/field key this filter applies to. */
  key: string;
  /** Human-friendly label for the filter UI. */
  label: string;
  /** Type of filter input. */
  type: "text" | "select" | "multi-select" | "date" | "date-range" | "number" | "boolean";
  /** Placeholder text for text-like inputs. */
  placeholder?: string;
  /** Options for select/multi-select filters. */
  options?: Array<{ label: string; value: string | number }>;
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

/**
 * Meta information returned alongside table rows.
 */
export interface TableMeta {
  pagination?: PaginationMeta;
  sort?: TableSort | null;
  /**
   * Normalized filter payload as returned from the backend.
   * Can be consumed directly or refined into typed filters per table.
   */
  filters?: TableFilters;
}

/**
 * Pagination link collection compatible with Laravel's JSON paginator format.
 */
export interface TableLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
  /** Optional list of numbered page links. */
  pages?: PaginationLink[];
}

/**
 * Canonical Inertia response shape used by Inertia Prime tables.
 *
 * The Laravel companion package should format table responses to match this
 * interface so that `useInertiaTable` can consume them directly.
 */
export interface InertiaTableResponse<TData = unknown> {
  data: TData[];
  meta: TableMeta;
  links?: TableLinks;
}
