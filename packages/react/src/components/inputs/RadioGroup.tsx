// RadioGroup: radio button group component.

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Field name. */
  name: string;
  /** Options to display. */
  options: RadioOption[];
  /** Current value. */
  value?: string;
  /** Default value. */
  defaultValue?: string;
  /** Change handler. */
  onChange?: (value: string) => void;
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

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  orientation = "vertical",
  disabled = false,
  hasError = false,
  className = "",
}: RadioGroupProps) {
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    onChange?.(optionValue);
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
        role="radiogroup"
      >
        {options.map((option) => {
          const isChecked = value !== undefined 
            ? value === option.value 
            : defaultValue === option.value;
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
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                className={`
                  h-4 w-4 mt-1 border-gray-300 text-blue-600
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
