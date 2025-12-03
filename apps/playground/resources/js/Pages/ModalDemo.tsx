import { Head } from '@inertiajs/react';
// [TODO] Switch to real imports once @inertia-prime/react is implemented.
// import { Modal } from '@inertia-prime/react/modal';
// import { useModal } from '@inertia-prime/react/hooks';

export default function ModalDemo() {
  // const modal = useModal({ param: 'example' });

  return (
    <>
      <Head title="Inertia Prime – Modal Demo" />
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Modal Demo</h1>
        <p className="text-sm text-zinc-600 mb-4">
          This page will demonstrate URL-aware modals once implemented.
        </p>
        <div className="rounded-lg border border-dashed p-6 text-sm text-zinc-500">
          [TODO] Wire `Modal` and `useModal` here.
        </div>
      </div>
    </>
  );
}
