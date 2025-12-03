// Checkbox: single checkbox input component.

import { forwardRef } from "react";

export interface CheckboxProps {
  /** Field name (also used as id). */
  name: string;
  /** Whether the checkbox is checked. */
  checked?: boolean;
  /** Default checked state (for uncontrolled). */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text to display next to checkbox. */
  label?: string;
  /** Description text below the label. */
  description?: string;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Whether the field has an error. */
  hasError?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Checkbox input component with optional label.
 *
 * @example
 * <Checkbox
 *   name="terms"
 *   checked={form.data.terms}
 *   onChange={e => form.setData('terms', e.target.checked)}
 *   label="I agree to the terms and conditions"
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      name,
      checked,
      defaultChecked,
      onChange,
      label,
      description,
      disabled = false,
      hasError = false,
      className = "",
    },
    ref
  ) {
    return (
      <div className={`flex items-start ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 mt-1 rounded border-gray-300 text-blue-600
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${hasError ? "border-red-500" : ""}
          `}
        />
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={name}
                className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
