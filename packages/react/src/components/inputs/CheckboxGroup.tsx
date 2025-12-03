// CheckboxGroup: grouped checkboxes component.

export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Field name. */
  name: string;
  /** Options to display. */
  options: CheckboxOption[];
  /** Current values (array of selected values). */
  value?: string[];
  /** Default values. */
  defaultValue?: string[];
  /** Change handler. */
  onChange?: (values: string[]) => void;
  /** Label for the group. */
  label?: string;
  /** Layout direction. @default "vertical" */
  orientation?: "horizontal" | "vertical";
  /** Whether disabled. */
  disabled?: boolean;
  /** Whether has error. */
  hasError?: boolean;
  /** Additional CSS class. */
  className?: string;
}

export function CheckboxGroup({
  name,
  options,
  value = [],
  defaultValue = [],
  onChange,
  label,
  orientation = "vertical",
  disabled = false,
  hasError = false,
  className = "",
}: CheckboxGroupProps) {
  const currentValues = value.length > 0 ? value : defaultValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return;
    const newValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);
    onChange?.(newValues);
  };

  return (
    <fieldset className={className}>
      {label && (
        <legend className="text-sm font-medium text-gray-900 mb-3">
          {label}
        </legend>
      )}
      <div
        className={`
          ${orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3"}
        `}
      >
        {options.map((option) => {
          const isChecked = currentValues.includes(option.value);
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`
                flex items-start cursor-pointer
                ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
              `}
            >
              <input
                type="checkbox"
                name={`${name}[]`}
                value={option.value}
                checked={isChecked}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={isDisabled}
                className={`
                  h-4 w-4 mt-1 rounded border-gray-300 text-blue-600
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${hasError ? "border-red-500" : ""}
                `}
              />
              <div className="ml-3">
                <span className={`text-sm font-medium ${isDisabled ? "text-gray-400" : "text-gray-700"}`}>
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-sm text-gray-500">{option.description}</p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
