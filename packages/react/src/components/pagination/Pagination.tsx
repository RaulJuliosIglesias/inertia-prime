// Pagination: standalone pagination component.

export interface PaginationProps {
  /** Current page (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Page change handler. */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show around current. @default 2 */
  siblingCount?: number;
  /** Whether to show first/last buttons. @default true */
  showFirstLast?: boolean;
  /** Additional CSS class. */
  className?: string;
}

function generatePages(current: number, total: number, siblings: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const start = Math.max(1, current - siblings);
  const end = Math.min(total, current + siblings);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  showFirstLast = true,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePages(currentPage, totalPages, siblingCount);

  const buttonBase = `
    px-3 py-2 text-sm font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <nav aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${buttonBase} text-gray-500 hover:bg-gray-100`}
          aria-label="First page"
        >
          ««
        </button>
      )}
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} text-gray-500 hover:bg-gray-100`}
        aria-label="Previous page"
      >
        «
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`
              ${buttonBase}
              ${currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBase} text-gray-500 hover:bg-gray-100`}
        aria-label="Next page"
      >
        »
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${buttonBase} text-gray-500 hover:bg-gray-100`}
          aria-label="Last page"
        >
          »»
        </button>
      )}
    </nav>
  );
}
