// useInertiaTable: Inertia-aware table state management with URL sync.

import { useCallback, useMemo } from "react";
import { router } from "@inertiajs/react";
import type {
  InertiaTableResponse,
  TableLinks,
  TableMeta,
  TableSort,
  TableFilters,
} from "../types/inertia";

/**
 * Names of query parameters used to represent table state in the URL.
 */
export interface TableQueryParamKeys {
  page: string;
  perPage: string;
  sort: string;
  direction: string;
  search: string;
  filter: string;
}

const DEFAULT_PARAM_KEYS: TableQueryParamKeys = {
  page: "page",
  perPage: "per_page",
  sort: "sort",
  direction: "direction",
  search: "search",
  filter: "filter",
};

export interface UseInertiaTableOptions<TData = unknown> {
  /**
   * Server-provided table response formatted according to InertiaTableResponse.
   */
  response: InertiaTableResponse<TData>;
  /**
   * Route name or URL used when navigating between table states.
   */
  route: string;
  /**
   * Optional override for the query parameter names used for table state.
   */
  paramKeys?: Partial<TableQueryParamKeys>;
}

export interface UseInertiaTableResult<TData = unknown> {
  /** Table rows as returned by the server. */
  rows: TData[];
  /** Table meta information (pagination, sort, filters). */
  meta: TableMeta;
  /** Pagination links, if available. */
  links?: TableLinks;

  /** Current sort configuration. */
  sort: TableSort | null;
  /** Update sort and navigate. */
  setSort: (sort: TableSort | null) => void;

  /** Current page number. */
  page: number;
  /** Navigate to a specific page. */
  setPage: (page: number) => void;

  /** Current items per page. */
  perPage: number;
  /** Change items per page and navigate. */
  setPerPage: (perPage: number) => void;

  /** Current filter values. */
  filters: TableFilters;
  /** Update filters and navigate (resets to page 1). */
  setFilters: (filters: TableFilters) => void;

  /** Current search term. */
  search: string;
  /** Update search term and navigate (resets to page 1). */
  setSearch: (search: string) => void;

  /** Whether the table is currently loading (during navigation). */
  isLoading: boolean;
}

/**
 * Hook for managing server-driven table state with URL synchronization.
 *
 * Reads state from the server response and provides setters that trigger
 * Inertia navigation with updated query parameters.
 *
 * @example
 * const table = useInertiaTable<User>({
 *   response: props.users,
 *   route: '/users',
 * });
 *
 * <DataTable {...table} columns={columns} />
 */
export function useInertiaTable<TData = unknown>(
  options: UseInertiaTableOptions<TData>
): UseInertiaTableResult<TData> {
  const { response, route, paramKeys: customParamKeys } = options;

  const paramKeys = useMemo(
    () => ({ ...DEFAULT_PARAM_KEYS, ...customParamKeys }),
    [customParamKeys]
  );

  // Extract data from response
  const rows = response.data;
  const meta = response.meta;
  const links = response.links;

  // Derive current state from meta
  const sort = meta.sort ?? null;
  const page = meta.pagination?.current_page ?? 1;
  const perPage = meta.pagination?.per_page ?? 15;
  const filters = (meta.filters ?? {}) as TableFilters;
  const search = (filters[paramKeys.search] as string) ?? "";

  // Helper to navigate with new params
  const navigate = useCallback(
    (params: Record<string, unknown>) => {
      const currentParams = new URLSearchParams(window.location.search);

      // Update params
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          currentParams.delete(key);
        } else if (typeof value === "object") {
          // Handle filter objects: filter[status]=active
          Object.entries(value as Record<string, unknown>).forEach(
            ([filterKey, filterValue]) => {
              const paramName = `${key}[${filterKey}]`;
              if (
                filterValue === null ||
                filterValue === undefined ||
                filterValue === ""
              ) {
                currentParams.delete(paramName);
              } else {
                currentParams.set(paramName, String(filterValue));
              }
            }
          );
        } else {
          currentParams.set(key, String(value));
        }
      });

      const search = currentParams.toString();
      const url = search ? `${route}?${search}` : route;

      router.visit(url, {
        preserveState: true,
        preserveScroll: true,
      });
    },
    [route]
  );

  // Setters
  const setSort = useCallback(
    (newSort: TableSort | null) => {
      if (newSort) {
        navigate({
          [paramKeys.sort]: newSort.column,
          [paramKeys.direction]: newSort.direction,
        });
      } else {
        navigate({
          [paramKeys.sort]: null,
          [paramKeys.direction]: null,
        });
      }
    },
    [navigate, paramKeys]
  );

  const setPage = useCallback(
    (newPage: number) => {
      navigate({ [paramKeys.page]: newPage });
    },
    [navigate, paramKeys]
  );

  const setPerPage = useCallback(
    (newPerPage: number) => {
      navigate({
        [paramKeys.perPage]: newPerPage,
        [paramKeys.page]: 1, // Reset to first page
      });
    },
    [navigate, paramKeys]
  );

  const setFilters = useCallback(
    (newFilters: TableFilters) => {
      navigate({
        [paramKeys.filter]: newFilters,
        [paramKeys.page]: 1, // Reset to first page
      });
    },
    [navigate, paramKeys]
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      navigate({
        [paramKeys.search]: newSearch,
        [paramKeys.page]: 1, // Reset to first page
      });
    },
    [navigate, paramKeys]
  );

  return {
    rows,
    meta,
    links,
    sort,
    setSort,
    page,
    setPage,
    perPage,
    setPerPage,
    filters,
    setFilters,
    search,
    setSearch,
    isLoading: false, // Will be enhanced with Inertia's progress tracking
  };
}
