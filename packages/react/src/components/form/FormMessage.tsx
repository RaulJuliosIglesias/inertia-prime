// FormMessage: validation message component.

export type FormMessageVariant = "error" | "success" | "warning";

export interface FormMessageProps {
  /** Message text. */
  children?: unknown;
  /** Message variant. @default "error" */
  variant?: FormMessageVariant;
  /** Additional CSS class. */
  className?: string;
}

const variantClasses: Record<FormMessageVariant, string> = {
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

export function FormMessage({
  children,
  variant = "error",
  className = "",
}: FormMessageProps) {
  if (!children) return null;

  return (
    <p className={`mt-1 text-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
}
