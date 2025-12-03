// CodeBlock: simple code block wrapper for MDX.
// [TODO] Integrate syntax highlighting.

import type { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="my-4 overflow-x-auto rounded-md bg-zinc-950 text-zinc-50 p-4 text-xs">
      <code>{children}</code>
    </pre>
  );
}
