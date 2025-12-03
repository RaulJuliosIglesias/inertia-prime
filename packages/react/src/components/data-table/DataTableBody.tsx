// DataTableBody: table body with rows.

import { useDataTableContext } from "./context";
import type { DataTableCommonProps } from "./types";

export interface DataTableBodyProps extends DataTableCommonProps {
  /** Whether to show selection checkbox. @default false */
  selectable?: boolean;
  /** Whether to show striped rows. @default false */
  striped?: boolean;
  /** Whether rows are hoverable. @default true */
  hoverable?: boolean;
}

/**
 * Table body component that renders rows.
 * Uses context from parent DataTable.
 */
export function DataTableBody({
  className = "",
  selectable = false,
  striped = false,
  hoverable = true,
}: DataTableBodyProps) {
  const {
    rows,
    columns,
    selection,
    toggleRowSelection,
    getRowId,
    isLoading,
    emptyMessage,
  } = useDataTableContext();

  if (isLoading) {
    return (
      <tbody className={className}>
        <tr>
          <td
            colSpan={columns.filter((c) => c.visible !== false).length + (selectable ? 1 : 0)}
            className="px-4 py-8 text-center text-gray-500"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading...
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (rows.length === 0) {
    return (
      <tbody className={className}>
        <tr>
          <td
            colSpan={columns.filter((c) => c.visible !== false).length + (selectable ? 1 : 0)}
            className="px-4 py-8 text-center text-gray-500"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {rows.map((row, rowIndex) => {
        const rowId = getRowId(row);
        const isSelected = selection.selectedIds.has(rowId);

        return (
          <tr
            key={rowId}
            className={`
              ${striped && rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"}
              ${hoverable ? "hover:bg-gray-50" : ""}
              ${isSelected ? "bg-blue-50" : ""}
            `}
          >
            {selectable && (
              <td className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleRowSelection(rowId)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </td>
            )}
            {columns
              .filter((col) => col.visible !== false)
              .map((column) => {
                const value = (row as Record<string, unknown>)[column.key];
                return (
                  <td
                    key={column.key}
                    className={`
                      px-4 py-3 text-sm text-gray-900
                      ${column.align === "center" ? "text-center" : ""}
                      ${column.align === "right" ? "text-right" : ""}
                      ${column.className || ""}
                    `}
                    style={{ width: column.width }}
                  >
                    {column.render
                      ? column.render(value, row, rowIndex)
                      : String(value ?? "")}
                  </td>
                );
              })}
          </tr>
        );
      })}
    </tbody>
  );
}
