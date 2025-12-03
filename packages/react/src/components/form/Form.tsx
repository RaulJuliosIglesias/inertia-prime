// Form: Inertia-aware form wrapper component.

import { createContext, useContext, useCallback } from "react";
import type { UseInertiaFormReturn } from "../../hooks/useInertiaForm";

/** Supported HTTP method keywords. */
export type FormMethod = "post" | "put" | "patch" | "delete";

/** Form context value. */
export interface FormContextValue<TForm extends Record<string, unknown> = Record<string, unknown>> {
  form: UseInertiaFormReturn<TForm>;
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

/** Hook to access form context. */
export function useFormContext<TForm extends Record<string, unknown> = Record<string, unknown>>(): FormContextValue<TForm> {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("Form components must be used within a Form");
  }
  return ctx as FormContextValue<TForm>;
}

export interface FormProps<TForm extends Record<string, unknown> = Record<string, unknown>> {
  /** Form state from useInertiaForm. */
  form: UseInertiaFormReturn<TForm>;
  /** The route to submit to. */
  action: string;
  /** HTTP method. @default "post" */
  method?: FormMethod;
  /** Form contents. */
  children?: unknown;
  /** Called before submission. Return false to cancel. */
  onBeforeSubmit?: () => boolean | void;
  /** Called after a successful submission. */
  onSuccess?: () => void;
  /** Called after an error response. */
  onError?: (errors: Record<string, string>) => void;
  /** Whether to preserve scroll position after submit. */
  preserveScroll?: boolean;
  /** Whether to preserve component state after submit. */
  preserveState?: boolean;
  /** Additional CSS class for the form element. */
  className?: string;
}

/**
 * Form wrapper that connects with useInertiaForm and handles submission.
 *
 * Automatically handles Inertia form submission with proper method spoofing
 * and error handling.
 *
 * @example
 * const form = useInertiaForm({ initialValues: { name: '', email: '' } });
 *
 * <Form form={form} action="/users" method="post">
 *   <FormField name="name" label="Name" />
 *   <FormField name="email" label="Email" />
 *   <button type="submit">Create</button>
 * </Form>
 */
export function Form<TForm extends Record<string, unknown> = Record<string, unknown>>({
  form,
  action,
  method = "post",
  children,
  onBeforeSubmit,
  onSuccess,
  onError,
  preserveScroll = true,
  preserveState = false,
  className = "",
}: FormProps<TForm>) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Check before submit callback
      if (onBeforeSubmit && onBeforeSubmit() === false) {
        return;
      }

      // Submit via Inertia
      form.submit(method, action, {
        preserveScroll,
        preserveState,
        onSuccess,
        onError,
      });
    },
    [form, method, action, onBeforeSubmit, onSuccess, onError, preserveScroll, preserveState]
  );

  const contextValue: FormContextValue<TForm> = {
    form,
    isSubmitting: form.processing,
  };

  return (
    <FormContext.Provider value={contextValue as FormContextValue}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export { FormContext };
