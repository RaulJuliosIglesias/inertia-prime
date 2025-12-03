import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

// [TODO] Wire Inertia Prime provider and Tailwind styles once ready.

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    return pages[`./Pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    const root = createRoot(el as HTMLElement);

    root.render(<App {...props} />);
  },
});
