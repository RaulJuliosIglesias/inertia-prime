// Laravel-specific shared types (stub).

import type { PaginationLink } from "./inertia";

/**
 * Minimal representation of Laravel's LengthAwarePaginator JSON form.
 *
 * This is intentionally not exhaustive but covers the fields commonly needed
 * by Inertia Prime.
 */
export interface LengthAwarePaginator<TData = unknown> {
  data: TData[];
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
  links?: PaginationLink[];
}
