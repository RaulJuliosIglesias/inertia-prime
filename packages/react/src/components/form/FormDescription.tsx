// FormDescription: form field help text component.

export interface FormDescriptionProps {
  /** Description text. */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
}

export function FormDescription({
  children,
  className = "",
}: FormDescriptionProps) {
  return (
    <p className={`mt-1 text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
