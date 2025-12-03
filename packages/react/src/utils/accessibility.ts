// Accessibility helpers (stub).

export function mergeAriaProps<T extends object, U extends object>(
  base: T,
  overrides: U
): T & U {
  // TODO: implement ARIA props merge.
  return { ...(base as any), ...(overrides as any) };
}
