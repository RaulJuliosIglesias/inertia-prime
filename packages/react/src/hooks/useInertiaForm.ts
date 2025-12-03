// useInertiaForm: enhanced wrapper around Inertia's useForm.

import { useForm } from "@inertiajs/react";
import { useCallback, useMemo } from "react";

export interface UseInertiaFormOptions<TForm extends Record<string, unknown>> {
  /**
   * Initial form values.
   */
  initialValues: TForm;
  /**
   * Optional error bag name when using multiple forms on a page.
   */
  errorBag?: string;
  /**
   * Transform data before submission.
   */
  transform?: (data: TForm) => Record<string, unknown>;
}

export interface UseInertiaFormReturn<TForm extends Record<string, unknown>> {
  /** Current form data. */
  data: TForm;
  /** Update a single field or multiple fields. */
  setData: {
    (field: keyof TForm, value: TForm[keyof TForm]): void;
    (values: Partial<TForm>): void;
    (callback: (data: TForm) => TForm): void;
  };

  /** Validation errors keyed by field name. */
  errors: Partial<Record<keyof TForm | string, string>>;
  /** Whether any errors exist. */
  hasErrors: boolean;

  /** Whether form is currently submitting. */
  processing: boolean;
  /** Whether last submission was successful. */
  wasSuccessful: boolean;
  /** Whether form has been modified. */
  isDirty: boolean;

  /** Reset form to initial values (optionally specific fields). */
  reset: (...fields: Array<keyof TForm>) => void;
  /** Clear errors (optionally specific fields). */
  clearErrors: (...fields: Array<keyof TForm | string>) => void;
  /** Set specific errors programmatically. */
  setError: (field: keyof TForm | string, message: string) => void;

  /** Submit form with POST method. */
  post: (url: string, options?: SubmitOptions) => void;
  /** Submit form with PUT method. */
  put: (url: string, options?: SubmitOptions) => void;
  /** Submit form with PATCH method. */
  patch: (url: string, options?: SubmitOptions) => void;
  /** Submit form with DELETE method. */
  delete: (url: string, options?: SubmitOptions) => void;
  /** Generic submit with any method. */
  submit: (method: string, url: string, options?: SubmitOptions) => void;
}

export interface SubmitOptions {
  preserveScroll?: boolean;
  preserveState?: boolean;
  onSuccess?: () => void;
  onError?: (errors: Record<string, string>) => void;
  onFinish?: () => void;
}

/**
 * Enhanced form hook wrapping Inertia's useForm.
 *
 * Provides a cleaner API and additional helpers for form management.
 *
 * @example
 * const form = useInertiaForm({
 *   initialValues: { name: '', email: '' },
 * });
 *
 * <form onSubmit={e => { e.preventDefault(); form.post('/users'); }}>
 *   <input
 *     value={form.data.name}
 *     onChange={e => form.setData('name', e.target.value)}
 *   />
 *   {form.errors.name && <span>{form.errors.name}</span>}
 *   <button disabled={form.processing}>Submit</button>
 * </form>
 */
export function useInertiaForm<TForm extends Record<string, unknown>>(
  options: UseInertiaFormOptions<TForm>
): UseInertiaFormReturn<TForm> {
  const { initialValues, transform } = options;

  // Use Inertia's useForm
  const inertiaForm = useForm<TForm>(initialValues);

  // Apply transform if provided
  if (transform) {
    inertiaForm.transform(transform);
  }

  // Enhanced setData that accepts object or callback
  const setData = useCallback(
    (
      fieldOrValuesOrCallback: keyof TForm | Partial<TForm> | ((data: TForm) => TForm),
      value?: TForm[keyof TForm]
    ) => {
      if (typeof fieldOrValuesOrCallback === "function") {
        // Callback form
        inertiaForm.setData(fieldOrValuesOrCallback as (data: TForm) => TForm);
      } else if (typeof fieldOrValuesOrCallback === "object") {
        // Object form - merge with existing data
        inertiaForm.setData((prev: TForm) => ({
          ...prev,
          ...fieldOrValuesOrCallback,
        }));
      } else {
        // Field/value form
        inertiaForm.setData(fieldOrValuesOrCallback, value as TForm[keyof TForm]);
      }
    },
    [inertiaForm]
  ) as UseInertiaFormReturn<TForm>["setData"];

  // Convenience submit methods
  const post = useCallback(
    (url: string, opts?: SubmitOptions) => {
      inertiaForm.post(url, opts);
    },
    [inertiaForm]
  );

  const put = useCallback(
    (url: string, opts?: SubmitOptions) => {
      inertiaForm.put(url, opts);
    },
    [inertiaForm]
  );

  const patch = useCallback(
    (url: string, opts?: SubmitOptions) => {
      inertiaForm.patch(url, opts);
    },
    [inertiaForm]
  );

  const deleteMethod = useCallback(
    (url: string, opts?: SubmitOptions) => {
      inertiaForm.delete(url, opts);
    },
    [inertiaForm]
  );

  const submit = useCallback(
    (method: string, url: string, opts?: SubmitOptions) => {
      const m = method.toLowerCase();
      switch (m) {
        case "post":
          inertiaForm.post(url, opts);
          break;
        case "put":
          inertiaForm.put(url, opts);
          break;
        case "patch":
          inertiaForm.patch(url, opts);
          break;
        case "delete":
          inertiaForm.delete(url, opts);
          break;
        default:
          inertiaForm.post(url, opts);
      }
    },
    [inertiaForm]
  );

  // Computed hasErrors
  const hasErrors = useMemo(
    () => Object.keys(inertiaForm.errors).length > 0,
    [inertiaForm.errors]
  );

  return {
    data: inertiaForm.data,
    setData,
    errors: inertiaForm.errors as Partial<Record<keyof TForm | string, string>>,
    hasErrors,
    processing: inertiaForm.processing,
    wasSuccessful: inertiaForm.wasSuccessful,
    isDirty: inertiaForm.isDirty,
    reset: inertiaForm.reset as UseInertiaFormReturn<TForm>["reset"],
    clearErrors: inertiaForm.clearErrors as UseInertiaFormReturn<TForm>["clearErrors"],
    setError: inertiaForm.setError as UseInertiaFormReturn<TForm>["setError"],
    post,
    put,
    patch,
    delete: deleteMethod,
    submit,
  };
}
