// InertiaPrimeProvider: global provider for Inertia Prime.

/**
 * Theme configuration for Inertia Prime components.
 */
export interface InertiaPrimeTheme {
  /** Color mode. @default "system" */
  colorMode?: "light" | "dark" | "system";
  /** Primary brand color (CSS variable or hex). */
  primaryColor?: string;
  /** Border radius scale. @default "md" */
  radius?: "none" | "sm" | "md" | "lg" | "full";
}

/**
 * Props for the InertiaPrimeProvider component.
 */
export interface InertiaPrimeProviderProps {
  /** Application content. */
  children?: unknown;
  /** Theme configuration. */
  theme?: InertiaPrimeTheme;
  /** Default route used by useInertiaTable when not specified. */
  defaultTableRoute?: string;
  /** Default query param names for tables. */
  tableParamKeys?: {
    page?: string;
    perPage?: string;
    sort?: string;
    direction?: string;
    search?: string;
    filter?: string;
  };
}

/**
 * Global provider for Inertia Prime components.
 *
 * Provides:
 * - Theme context for consistent styling
 * - Default configuration for tables, forms, and modals
 * - Integration point for server-sent data (toasts, flash messages)
 *
 * @example
 * // In your app entry point (e.g., app.tsx)
 * import { InertiaPrimeProvider, ToastProvider } from "@inertia-prime/react";
 *
 * createInertiaApp({
 *   // ...
 *   setup({ el, App, props }) {
 *     createRoot(el).render(
 *       <InertiaPrimeProvider
 *         theme={{ colorMode: "system", radius: "md" }}
 *       >
 *         <ToastProvider position="bottom-right">
 *           <App {...props} />
 *         </ToastProvider>
 *       </InertiaPrimeProvider>
 *     );
 *   },
 * });
 */
export function InertiaPrimeProvider(_props: InertiaPrimeProviderProps) {
  // Implementation will be provided in a later phase.
  return null;
}
