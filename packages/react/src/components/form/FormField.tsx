// FormField: a single form field wrapper with label and error.

import { useFormContext } from "./Form";

export interface FormFieldProps {
  /** Field name (key in form data). */
  name: string;
  /** Field label. */
  label?: string;
  /** Help text below the field. */
  helpText?: string;
  /** Whether the field is required. */
  required?: boolean;
  /** Additional CSS class. */
  className?: string;
  /** Field input element. */
  children?: unknown;
}

/**
 * Form field wrapper with label, error display, and help text.
 *
 * @example
 * <FormField name="email" label="Email Address" required>
 *   <TextField name="email" type="email" />
 * </FormField>
 */
export function FormField({
  name,
  label,
  helpText,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  const { form } = useFormContext();
  const error = form.errors[name];

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
