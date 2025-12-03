// DataTablePagination: pagination controls.

import { useDataTableContext } from "./context";
import type { DataTableCommonProps } from "./types";

export interface DataTablePaginationProps extends DataTableCommonProps {
  /** Page size options. @default [10, 25, 50, 100] */
  pageSizeOptions?: number[];
  /** Whether to show page size selector. @default true */
  showPageSize?: boolean;
  /** Whether to show page info. @default true */
  showInfo?: boolean;
}

/**
 * Pagination controls component.
 * Uses context from parent DataTable.
 */
export function DataTablePagination({
  className = "",
  pageSizeOptions = [10, 25, 50, 100],
  showPageSize = true,
  showInfo = true,
}: DataTablePaginationProps) {
  const { page, setPage, perPage, setPerPage, total, totalPages } = useDataTableContext();

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-white border-t ${className}`}>
      {/* Left: Page info */}
      {showInfo && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{from}</span> to{" "}
          <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </div>
      )}

      {/* Center: Page size selector */}
      {showPageSize && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Show</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: Page navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(1)}
          disabled={!canGoPrev}
          className="px-2 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="First page"
        >
          ««
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={!canGoPrev}
          className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Previous page"
        >
          Previous
        </button>

        <span className="px-3 py-1 text-sm text-gray-700">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={!canGoNext}
          className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Next page"
        >
          Next
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={!canGoNext}
          className="px-2 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Last page"
        >
          »»
        </button>
      </div>
    </div>
  );
}
