// Switch: toggle switch component.

import { forwardRef } from "react";

export interface SwitchProps {
  /** Field name. */
  name: string;
  /** Whether the switch is checked. */
  checked?: boolean;
  /** Default checked state. */
  defaultChecked?: boolean;
  /** Change handler. */
  onChange?: (checked: boolean) => void;
  /** Label text. */
  label?: string;
  /** Description text. */
  description?: string;
  /** Whether disabled. */
  disabled?: boolean;
  /** Size variant. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class. */
  className?: string;
}

const sizeClasses = {
  sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
  md: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
  lg: { track: "h-7 w-14", thumb: "h-6 w-6", translate: "translate-x-7" },
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      name,
      checked,
      defaultChecked = false,
      onChange,
      label,
      description,
      disabled = false,
      size = "md",
      className = "",
    },
    ref
  ) {
    const isControlled = checked !== undefined;
    const sizes = sizeClasses[size];

    const handleClick = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    return (
      <div className={`flex items-start ${className}`}>
        <button
          ref={ref}
          type="button"
          role="switch"
          id={name}
          aria-checked={isControlled ? checked : defaultChecked}
          disabled={disabled}
          onClick={handleClick}
          className={`
            relative inline-flex flex-shrink-0 cursor-pointer rounded-full
            border-2 border-transparent transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${sizes.track}
            ${(isControlled ? checked : defaultChecked) ? "bg-blue-600" : "bg-gray-200"}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block rounded-full bg-white shadow
              transform ring-0 transition duration-200 ease-in-out
              ${sizes.thumb}
              ${(isControlled ? checked : defaultChecked) ? sizes.translate : "translate-x-0"}
            `}
          />
        </button>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={name}
                className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-900"}`}
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
