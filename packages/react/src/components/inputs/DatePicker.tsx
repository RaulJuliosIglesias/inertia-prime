// DatePicker: date selection component with calendar.

import { useState, useRef, forwardRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface DatePickerProps {
  /** Selected date value (ISO string or Date). */
  value?: string | Date;
  /** Change handler. */
  onChange?: (date: Date | null) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Field name. */
  name?: string;
  /** Whether disabled. */
  disabled?: boolean;
  /** Whether has error. */
  hasError?: boolean;
  /** Minimum date. */
  minDate?: Date;
  /** Maximum date. */
  maxDate?: Date;
  /** Date format for display. @default "yyyy-MM-dd" */
  displayFormat?: string;
  /** Additional CSS class. */
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(value: string | Date | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    {
      value,
      onChange,
      placeholder = "Select date",
      name,
      disabled = false,
      hasError = false,
      minDate,
      maxDate,
      className = "",
    },
    ref
  ) {
    const selectedDate = parseDate(value);
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(selectedDate || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setIsOpen(false));

    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const handlePrevMonth = () => {
      setViewDate(new Date(viewYear, viewMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setViewDate(new Date(viewYear, viewMonth + 1, 1));
    };

    const handleSelectDate = (day: number) => {
      const newDate = new Date(viewYear, viewMonth, day);
      onChange?.(newDate);
      setIsOpen(false);
    };

    const isDateDisabled = (day: number): boolean => {
      const date = new Date(viewYear, viewMonth, day);
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isSelected = (day: number): boolean => {
      if (!selectedDate) return false;
      return (
        selectedDate.getFullYear() === viewYear &&
        selectedDate.getMonth() === viewMonth &&
        selectedDate.getDate() === day
      );
    };

    const isToday = (day: number): boolean => {
      const today = new Date();
      return (
        today.getFullYear() === viewYear &&
        today.getMonth() === viewMonth &&
        today.getDate() === day
      );
    };

    // Generate calendar grid
    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    const baseClasses = `
      w-full px-3 py-2 border rounded-md shadow-sm text-left
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:cursor-not-allowed
      ${hasError ? "border-red-500" : "border-gray-300"}
    `;

    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <input
          type="hidden"
          name={name}
          value={selectedDate ? formatDate(selectedDate) : ""}
          ref={ref}
        />
        
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`${baseClasses} flex items-center justify-between`}
        >
          <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-medium">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => (
                <div key={idx} className="aspect-square">
                  {day !== null && (
                    <button
                      type="button"
                      onClick={() => !isDateDisabled(day) && handleSelectDate(day)}
                      disabled={isDateDisabled(day)}
                      className={`
                        w-full h-full flex items-center justify-center text-sm rounded
                        ${isSelected(day) ? "bg-blue-600 text-white" : ""}
                        ${isToday(day) && !isSelected(day) ? "border border-blue-600" : ""}
                        ${isDateDisabled(day) ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                      `}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Today button */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  onChange?.(today);
                  setIsOpen(false);
                }}
                className="w-full text-sm text-blue-600 hover:text-blue-700"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
