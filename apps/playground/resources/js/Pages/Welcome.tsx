import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
  return (
    <>
      <Head title="Inertia Prime Playground" />
      <main className="p-8 space-y-4">
        <h1 className="text-3xl font-bold">Inertia Prime Playground</h1>
        <p className="text-sm text-zinc-600">
          This Laravel app is a sandbox for trying Inertia Prime components in real
          Laravel + Inertia flows.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            <Link href={route('playground.data-table')} className="text-emerald-600 hover:underline">
              DataTable Demo
            </Link>
          </li>
          <li>
            <Link href={route('playground.form')} className="text-emerald-600 hover:underline">
              Form Demo
            </Link>
          </li>
          <li>
            <Link href={route('playground.modal')} className="text-emerald-600 hover:underline">
              Modal Demo
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
