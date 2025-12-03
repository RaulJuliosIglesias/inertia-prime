// Divider: visual separator component.

export interface DividerProps {
  /** Orientation of the divider. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Text or content to display in the middle of the divider. */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Divider component for visual separation.
 *
 * @example
 * <Divider />
 *
 * <Divider>OR</Divider>
 *
 * <Divider orientation="vertical" />
 */
export function Divider({
  orientation = "horizontal",
  children,
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`inline-block w-px bg-gray-200 self-stretch ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (children) {
    return (
      <div className={`flex items-center ${className}`} role="separator">
        <div className="flex-1 border-t border-gray-200" />
        <span className="px-3 text-sm text-gray-500">{children}</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>
    );
  }

  return (
    <hr
      className={`border-t border-gray-200 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
