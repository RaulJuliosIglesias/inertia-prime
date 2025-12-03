// PropsTable: placeholder for auto-generated props documentation.
// [TODO] Connect to a docgen step once the library is implemented.

interface PropsTableProps {
  props: Array<{
    name: string;
    type: string;
    description?: string;
    defaultValue?: string;
    required?: boolean;
  }>;
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props?.length) {
    return <p className="text-sm text-zinc-500">[TODO] Props table will appear here once documented.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-md border text-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
          <tr>
            <th className="px-3 py-2 text-left font-semibold">Prop</th>
            <th className="px-3 py-2 text-left font-semibold">Type</th>
            <th className="px-3 py-2 text-left font-semibold">Default</th>
            <th className="px-3 py-2 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-t">
              <td className="px-3 py-2 font-mono text-xs">{prop.name}{prop.required ? " *" : ""}</td>
              <td className="px-3 py-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">{prop.type}</td>
              <td className="px-3 py-2 font-mono text-xs text-zinc-500">{prop.defaultValue ?? "—"}</td>
              <td className="px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
