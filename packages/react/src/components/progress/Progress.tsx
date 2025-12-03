// Progress: linear progress bar component.

export type ProgressVariant = "default" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  /** Progress value (0-100). */
  value: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Color variant. @default "default" */
  variant?: ProgressVariant;
  /** Size of the progress bar. @default "md" */
  size?: ProgressSize;
  /** Whether to show the percentage label. @default false */
  showLabel?: boolean;
  /** Whether the progress is indeterminate (animated). @default false */
  indeterminate?: boolean;
  /** Additional CSS class. */
  className?: string;
}

const variantClasses: Record<ProgressVariant, string> = {
  default: "bg-blue-600",
  success: "bg-green-600",
  warning: "bg-yellow-500",
  error: "bg-red-600",
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

/**
 * Progress bar component.
 *
 * @example
 * <Progress value={75} showLabel />
 *
 * <Progress value={100} variant="success" />
 *
 * <Progress indeterminate />
 */
export function Progress({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  indeterminate = false,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`
            ${sizeClasses[size]} ${variantClasses[variant]} rounded-full
            transition-all duration-300 ease-out
            ${indeterminate ? "animate-progress-indeterminate w-1/3" : ""}
          `}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
      {showLabel && !indeterminate && (
        <div className="mt-1 text-sm text-gray-600 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
