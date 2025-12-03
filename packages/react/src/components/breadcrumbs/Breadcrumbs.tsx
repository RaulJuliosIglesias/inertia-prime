// Breadcrumbs: breadcrumb navigation component.

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  /** Breadcrumb items. */
  items: BreadcrumbItem[];
  /** Separator between items. @default "/" */
  separator?: string | unknown;
  /** Additional CSS class. */
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = "/",
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href && !item.current ? (
              <a
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`text-sm font-medium ${
                  item.current ? "text-gray-900" : "text-gray-500"
                }`}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Also export BreadcrumbItem component for flexible usage
export interface BreadcrumbItemProps {
  children?: unknown;
  href?: string;
  current?: boolean;
  className?: string;
}

export function BreadcrumbItemComponent({
  children,
  href,
  current = false,
  className = "",
}: BreadcrumbItemProps) {
  if (href && !current) {
    return (
      <a
        href={href}
        className={`text-sm font-medium text-gray-500 hover:text-gray-700 ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      className={`text-sm font-medium ${current ? "text-gray-900" : "text-gray-500"} ${className}`}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </span>
  );
}
