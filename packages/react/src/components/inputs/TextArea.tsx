// Textarea: multi-line text input component.

import { forwardRef } from "react";

export interface TextareaProps {
  /** Field name (also used as id). */
  name: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Current value. */
  value?: string;
  /** Default value (for uncontrolled). */
  defaultValue?: string;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Blur handler. */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Number of rows. @default 4 */
  rows?: number;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is read-only. */
  readOnly?: boolean;
  /** Whether the field has an error. */
  hasError?: boolean;
  /** Whether to allow resize. @default "vertical" */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Additional CSS class. */
  className?: string;
}

const resizeClasses = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

/**
 * Textarea component for multi-line text input.
 *
 * @example
 * <Textarea
 *   name="message"
 *   value={form.data.message}
 *   onChange={e => form.setData('message', e.target.value)}
 *   rows={5}
 *   placeholder="Enter your message..."
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      name,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      rows = 4,
      disabled = false,
      readOnly = false,
      hasError = false,
      resize = "vertical",
      className = "",
    },
    ref
  ) {
    return (
      <textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${resizeClasses[resize]}
          ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
      />
    );
  }
);

// Also export as TextArea for backwards compatibility
export { Textarea as TextArea };
