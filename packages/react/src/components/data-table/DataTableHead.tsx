// DataTableHead: table header with sortable columns.

import { useDataTableContext } from "./context";
import type { DataTableCommonProps } from "./types";

export interface DataTableHeadProps extends DataTableCommonProps {
  /** Whether to show selection checkbox. @default false */
  selectable?: boolean;
}

/**
 * Table header component with sortable column headers.
 * Uses context from parent DataTable.
 */
export function DataTableHead({ className = "", selectable = false }: DataTableHeadProps) {
  const { columns, sort, setSort, selection, toggleAllSelection } = useDataTableContext();

  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return;

    if (sort?.column === columnKey) {
      // Toggle direction or clear sort
      if (sort.direction === "asc") {
        setSort({ column: columnKey, direction: "desc" });
      } else {
        setSort(null);
      }
    } else {
      setSort({ column: columnKey, direction: "asc" });
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sort?.column !== columnKey) return "↕";
    return sort.direction === "asc" ? "↑" : "↓";
  };

  return (
    <thead className={`bg-gray-50 ${className}`}>
      <tr>
        {selectable && (
          <th className="w-12 px-4 py-3">
            <input
              type="checkbox"
              checked={selection.allSelected}
              onChange={toggleAllSelection}
              className="h-4 w-4 rounded border-gray-300"
            />
          </th>
        )}
        {columns
          .filter((col) => col.visible !== false)
          .map((column) => (
            <th
              key={column.key}
              className={`
                px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                ${column.sortable ? "cursor-pointer hover:bg-gray-100 select-none" : ""}
                ${column.align === "center" ? "text-center" : ""}
                ${column.align === "right" ? "text-right" : ""}
                ${column.className || ""}
              `}
              style={{ width: column.width }}
              onClick={() => handleSort(column.key, column.sortable)}
            >
              <span className="flex items-center gap-1">
                {column.headerRender ? column.headerRender() : column.label}
                {column.sortable && (
                  <span className="text-gray-400">{getSortIcon(column.key)}</span>
                )}
              </span>
            </th>
          ))}
      </tr>
    </thead>
  );
}
