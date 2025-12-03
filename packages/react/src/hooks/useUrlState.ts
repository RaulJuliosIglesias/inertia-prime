// useUrlState: sync React state with URL query parameters via Inertia.

import { useState, useCallback, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";

export interface UseUrlStateSerializer<TState> {
  /** Serialize state into query parameters. */
  toQuery: (state: TState) => Record<string, string | number | boolean | null | undefined>;
  /** Parse query parameters back into state. */
  fromQuery: (params: URLSearchParams) => TState;
}

export interface UseUrlStateOptions<TState> {
  /** Optional logical key used to namespace this piece of state in the URL. */
  key?: string;
  /** Initial value when the URL does not contain any state. */
  initialState: TState;
  /** Whether to push or replace history entries when updating the URL. */
  history?: "push" | "replace";
  /** Optional custom serializer for mapping state <-> query string. */
  serializer?: UseUrlStateSerializer<TState>;
}

/**
 * Default serializer for primitive values (string, number, boolean).
 */
function defaultSerializer<TState>(
  key: string
): UseUrlStateSerializer<TState> {
  return {
    toQuery: (state) => ({ [key]: state as unknown as string }),
    fromQuery: (params) => {
      const value = params.get(key);
      if (value === null) return undefined as unknown as TState;
      // Try to parse as number or boolean
      if (value === "true") return true as unknown as TState;
      if (value === "false") return false as unknown as TState;
      const num = Number(value);
      if (!isNaN(num) && value !== "") return num as unknown as TState;
      return value as unknown as TState;
    },
  };
}

/**
 * Hook for syncing React state with URL query parameters.
 *
 * Uses Inertia's router for navigation to maintain SPA behavior and
 * ensure the server receives the updated query params.
 *
 * @example
 * // Simple string state
 * const [search, setSearch] = useUrlState({
 *   key: 'search',
 *   initialState: '',
 * });
 *
 * // Complex state with custom serializer
 * const [filters, setFilters] = useUrlState({
 *   initialState: { status: 'all', page: 1 },
 *   serializer: {
 *     toQuery: (state) => ({ status: state.status, page: state.page }),
 *     fromQuery: (params) => ({
 *       status: params.get('status') || 'all',
 *       page: Number(params.get('page')) || 1,
 *     }),
 *   },
 * });
 */
export function useUrlState<TState>(
  options: UseUrlStateOptions<TState>
): [TState, (value: TState | ((previous: TState) => TState)) => void] {
  const {
    key = "state",
    initialState,
    history = "push",
    serializer = defaultSerializer<TState>(key),
  } = options;

  // Read initial state from URL
  const getStateFromUrl = useCallback((): TState => {
    if (typeof window === "undefined") return initialState;
    const params = new URLSearchParams(window.location.search);
    const parsed = serializer.fromQuery(params);
    return parsed !== undefined ? parsed : initialState;
  }, [initialState, serializer]);

  const [state, setStateInternal] = useState<TState>(getStateFromUrl);
  const isNavigating = useRef(false);

  // Sync state from URL on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      if (!isNavigating.current) {
        setStateInternal(getStateFromUrl());
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getStateFromUrl]);

  // Update URL and state
  const setState = useCallback(
    (value: TState | ((previous: TState) => TState)) => {
      setStateInternal((prevState: TState) => {
        const nextState =
          typeof value === "function"
            ? (value as (previous: TState) => TState)(prevState)
            : value;

        // Build new query params
        const currentParams = new URLSearchParams(window.location.search);
        const newParams = serializer.toQuery(nextState);

        // Update params
        Object.entries(newParams).forEach(([k, v]) => {
          if (v === null || v === undefined || v === "") {
            currentParams.delete(k);
          } else {
            currentParams.set(k, String(v));
          }
        });

        // Navigate via Inertia
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
        isNavigating.current = true;

        router.visit(newUrl, {
          preserveState: true,
          preserveScroll: true,
          replace: history === "replace",
          onFinish: () => {
            isNavigating.current = false;
          },
        });

        return nextState;
      });
    },
    [serializer, history]
  );

  return [state, setState];
}
