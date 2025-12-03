import { Head } from '@inertiajs/react';
// [TODO] Switch to real imports once @inertia-prime/react is implemented.
// import { DataTable } from '@inertia-prime/react';
// import { useInertiaTable } from '@inertia-prime/react/hooks';

export default function DataTableDemo(props: unknown) {
  // const table = useInertiaTable({ resource: props.table, route: route('playground.data-table') });

  return (
    <>
      <Head title="Inertia Prime – DataTable Demo" />
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">DataTable Demo</h1>
        <p className="text-sm text-zinc-600 mb-4">
          This page will demonstrate the Inertia Prime DataTable once implemented.
        </p>
        {/* <DataTable {...table} /> */}
        <div className="rounded-lg border border-dashed p-6 text-sm text-zinc-500">
          [TODO] Wire `DataTable` and `useInertiaTable` here.
        </div>
      </div>
    </>
  );
}
