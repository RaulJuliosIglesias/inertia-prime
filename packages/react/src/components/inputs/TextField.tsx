// TextField: text input component with form integration.

import { forwardRef } from "react";

export interface TextFieldProps {
  /** Field name (also used as id). */
  name: string;
  /** Input type. @default "text" */
  type?: "text" | "email" | "password" | "url" | "tel" | "number";
  /** Placeholder text. */
  placeholder?: string;
  /** Current value. */
  value?: string | number;
  /** Default value (for uncontrolled). */
  defaultValue?: string | number;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler. */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is read-only. */
  readOnly?: boolean;
  /** Whether the field has an error. */
  hasError?: boolean;
  /** Additional CSS class. */
  className?: string;
  /** Auto-complete attribute. */
  autoComplete?: string;
  /** Auto-focus on mount. */
  autoFocus?: boolean;
}

/**
 * Text input field component.
 *
 * @example
 * <TextField
 *   name="email"
 *   type="email"
 *   value={form.data.email}
 *   onChange={e => form.setData('email', e.target.value)}
 *   hasError={!!form.errors.email}
 * />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      name,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      disabled = false,
      readOnly = false,
      hasError = false,
      className = "",
      autoComplete,
      autoFocus = false,
    },
    ref
  ) {
    return (
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
      />
    );
  }
);
