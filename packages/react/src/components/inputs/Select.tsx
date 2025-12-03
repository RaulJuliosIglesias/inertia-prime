// Select: styled select input component.

import { forwardRef } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Field name (also used as id). */
  name: string;
  /** Options to display. */
  options: SelectOption[];
  /** Current value. */
  value?: string | number;
  /** Default value (for uncontrolled). */
  defaultValue?: string | number;
  /** Placeholder option text. */
  placeholder?: string;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field has an error. */
  hasError?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/**
 * Select dropdown component.
 *
 * @example
 * <Select
 *   name="country"
 *   value={form.data.country}
 *   onChange={e => form.setData('country', e.target.value)}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 *   placeholder="Select a country"
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      name,
      options,
      value,
      defaultValue,
      placeholder,
      onChange,
      disabled = false,
      hasError = false,
      className = "",
    },
    ref
  ) {
    return (
      <select
        ref={ref}
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
