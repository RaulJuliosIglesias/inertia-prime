// DescriptionList: key-value display component.

export interface DescriptionItemData {
  term: string;
  description: string | unknown;
}

export interface DescriptionListProps {
  /** Items to display. */
  items: DescriptionItemData[];
  /** Layout direction. @default "vertical" */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS class. */
  className?: string;
}

export function DescriptionList({
  items,
  orientation = "vertical",
  className = "",
}: DescriptionListProps) {
  if (orientation === "horizontal") {
    return (
      <dl className={`grid grid-cols-2 gap-4 ${className}`}>
        {items.map((item, idx) => (
          <div key={idx} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">{item.term}</dt>
            <dd className="mt-1 text-sm text-gray-900">{item.description}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">{item.term}</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Individual item component
export interface DescriptionItemProps {
  /** Term/label. */
  term: string;
  /** Description/value. */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
}

export function DescriptionItem({ term, children, className = "" }: DescriptionItemProps) {
  return (
    <div className={`py-4 sm:grid sm:grid-cols-3 sm:gap-4 ${className}`}>
      <dt className="text-sm font-medium text-gray-500">{term}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{children}</dd>
    </div>
  );
}
