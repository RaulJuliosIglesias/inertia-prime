// Skeleton: loading placeholder component.

export interface SkeletonProps {
  /** Width of the skeleton. Can be number (px) or string (%, rem, etc). */
  width?: number | string;
  /** Height of the skeleton. Can be number (px) or string. */
  height?: number | string;
  /** Shape variant. @default "rect" */
  variant?: "rect" | "circle" | "text";
  /** Whether to animate the skeleton. @default true */
  animate?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Skeleton loading placeholder.
 *
 * @example
 * // Text placeholder
 * <Skeleton variant="text" width="60%" />
 *
 * // Avatar placeholder
 * <Skeleton variant="circle" width={40} height={40} />
 *
 * // Card placeholder
 * <Skeleton width="100%" height={200} />
 */
export function Skeleton({
  width,
  height,
  variant = "rect",
  animate = true,
  className = "",
}: SkeletonProps) {
  const style: Record<string, unknown> = {};

  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height !== undefined) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  const variantClasses = {
    rect: "rounded",
    circle: "rounded-full",
    text: "rounded h-4",
  };

  return (
    <div
      className={`
        bg-gray-200
        ${animate ? "animate-pulse" : ""}
        ${variantClasses[variant]}
        ${className}
      `}
      style={style}
    />
  );
}

// Common skeleton patterns
export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Skeleton variant="circle" width={size} height={size} className={className} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Skeleton width="100%" height={200} />
      <div className="space-y-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
}
