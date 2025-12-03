// FormLabel: form field label component.

export interface FormLabelProps {
  /** Label text. */
  children?: unknown;
  /** Associated field ID. */
  htmlFor?: string;
  /** Whether field is required. */
  required?: boolean;
  /** Additional CSS class. */
  className?: string;
}

export function FormLabel({
  children,
  htmlFor,
  required = false,
  className = "",
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
