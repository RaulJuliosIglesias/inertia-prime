// Playground: placeholder interactive playground for components.
// [TODO] Implement knobs/controls for live component editing.

import type { ReactNode } from "react";

interface PlaygroundProps {
  children: ReactNode;
}

export function Playground({ children }: PlaygroundProps) {
  return (
    <div className="my-6 rounded-lg border bg-zinc-950 text-zinc-50 p-4">
      {children}
    </div>
  );
}
