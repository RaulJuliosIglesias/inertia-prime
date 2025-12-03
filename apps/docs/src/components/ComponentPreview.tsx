// ComponentPreview: simple wrapper used in docs to showcase components.
// [TODO] Enhance with live previews and code toggles.

import type { ReactNode } from "react";

interface ComponentPreviewProps {
  title?: string;
  children: ReactNode;
}

export function ComponentPreview({ title, children }: ComponentPreviewProps) {
  return (
    <section className="my-8 border rounded-lg p-4 bg-white/50 dark:bg-zinc-900/50">
      {title ? <h2 className="mb-2 text-sm font-semibold text-zinc-500 uppercase tracking-wide">{title}</h2> : null}
      <div className="mt-2">{children}</div>
    </section>
  );
}
