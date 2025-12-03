// Shared form-related types.

import type { UseInertiaFormReturn } from "../../hooks/useInertiaForm";

/**
 * HTTP methods supported by forms.
 */
export type FormMethod = "get" | "post" | "put" | "patch" | "delete";

/**
 * Form state as provided by useInertiaForm.
 */
export type FormState<TForm = Record<string, unknown>> = UseInertiaFormReturn<TForm>;

/**
 * Context value for form components.
 */
export interface FormContextValue<TForm = Record<string, unknown>> {
  /** Form state from useInertiaForm. */
  form: FormState<TForm>;
  /** Whether the form is currently disabled (e.g., during submission). */
  disabled: boolean;
}

/**
 * Field registration info used by FormField components.
 */
export interface FieldRegistration {
  /** Field name (matches key in form data). */
  name: string;
  /** Error message for this field, if any. */
  error?: string;
  /** Whether the field is required. */
  required?: boolean;
}
