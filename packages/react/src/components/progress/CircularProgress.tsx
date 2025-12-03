// CircularProgress: circular progress indicator.

export type CircularProgressSize = "sm" | "md" | "lg";

export interface CircularProgressProps {
  /** Progress value (0-100). */
  value?: number;
  /** Whether indeterminate (spinning). @default false */
  indeterminate?: boolean;
  /** Size variant. @default "md" */
  size?: CircularProgressSize;
  /** Stroke width. @default 4 */
  strokeWidth?: number;
  /** Whether to show value label. @default false */
  showLabel?: boolean;
  /** Additional CSS class. */
  className?: string;
}

const sizeMap: Record<CircularProgressSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export function CircularProgress({
  value = 0,
  indeterminate = false,
  size = "md",
  strokeWidth = 4,
  showLabel = false,
  className = "",
}: CircularProgressProps) {
  const dimension = sizeMap[size];
  const radius = (dimension - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={`relative inline-flex ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className={indeterminate ? "animate-spin" : ""}
      >
        {/* Background circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
          className="text-blue-600 transition-all duration-300"
          transform={`rotate(-90 ${dimension / 2} ${dimension / 2})`}
        />
      </svg>
      {showLabel && !indeterminate && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700">
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
}
