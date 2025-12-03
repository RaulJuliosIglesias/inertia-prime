import { Head } from '@inertiajs/react';
// [TODO] Switch to real imports once @inertia-prime/react is implemented.
// import { Form } from '@inertia-prime/react/form';
// import { TextField } from '@inertia-prime/react/inputs';
// import { useInertiaForm } from '@inertia-prime/react/hooks';

export default function FormDemo() {
  // const form = useInertiaForm({ name: '', email: '' });

  return (
    <>
      <Head title="Inertia Prime – Form Demo" />
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Form Demo</h1>
        <p className="text-sm text-zinc-600 mb-4">
          This page will demonstrate the Inertia Prime Form components once implemented.
        </p>
        <div className="rounded-lg border border-dashed p-6 text-sm text-zinc-500">
          [TODO] Wire `Form`, `TextField`, and `useInertiaForm` here.
        </div>
      </div>
    </>
  );
}
