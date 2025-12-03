# Contributing to Inertia Prime

Thank you for considering contributing to **Inertia Prime**! 🎉

This project aims to be the go-to React component library for **Laravel + Inertia.js** applications. Clear APIs, strong defaults, and great docs are just as important as the code itself.

> If something feels hard to do with Laravel + Inertia + React, please open an issue – it might be a feature waiting to be designed.

---

## Project Structure

This repository is a **pnpm + Turborepo** monorepo:

- **`packages/react`** – `@inertia-prime/react`: main React component + hooks library.
- **`packages/laravel`** – `inertia-prime/laravel`: Laravel integration helpers.
- **`apps/docs`** – Documentation site (MDX-based).
- **`apps/playground`** – Laravel + Inertia + React playground app.
- **`.github`** – Workflows, issue templates, and PR templates.

> [TODO] The implementation of the components and hooks will come later. Right now we focus on API design, docs, and scaffolding.

---

## Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 8
- **PHP** ≥ 8.1
- **Composer** ≥ 2
- **Laravel** ≥ 10 (playground app)

Install pnpm:

```bash
npm install -g pnpm
```

---

## Getting Started (Frontend Monorepo)

From the repository root:

```bash
# Install dependencies
pnpm install

# Run all dev servers via Turborepo (docs + others)
pnpm dev

# Or run a specific app
pnpm dev:docs
pnpm dev:playground  # Uses the Laravel playground's Vite/React frontend
```

Key scripts (see `package.json` in each package/app for details):

- **`pnpm build`** – Build all packages/apps.
- **`pnpm lint`** – Run ESLint/Prettier checks.
- **`pnpm test`** – Run unit tests.
- **`pnpm typecheck`** – Run TypeScript type checking.

> [TODO] Exact commands may evolve as we wire up the tooling. Check package-level `package.json` for the latest scripts.

---

## Getting Started (Laravel Playground)

The playground lives in **`apps/playground`**.

1. Install PHP dependencies:

   ```bash
   cd apps/playground
   composer install
   cp .env.example .env   # configure DB
   php artisan key:generate
   ```

2. Run migrations and seed sample data:

   ```bash
   php artisan migrate --seed   # [TODO] Add seeders for demo data
   ```

3. Start the Laravel server and frontend dev server:

   ```bash
   php artisan serve
   pnpm dev:playground   # from the repo root
   ```

> [TODO] Wire up Vite/Inertia config for the playground once components are implemented.

---

## Code Style & Tooling

We aim for consistent, automated formatting:

- **JavaScript/TypeScript**
  - **ESLint** – Linting
  - **Prettier** – Formatting
  - **TypeScript** – Types
- **PHP**
  - **Laravel Pint** – Code style

Common scripts (run from the repo root):

```bash
pnpm lint
pnpm test
pnpm typecheck

# PHP style (from apps/playground or when Laravel package is extracted)
./vendor/bin/pint
```

> [TODO] Add concrete ESLint, Prettier, and Pint configs as the implementation solidifies.

---

## Component Creation Checklist

When adding or evolving a component in `@inertia-prime/react`, please:

- **API Design**
  - [ ] Align with Laravel and Inertia naming (e.g. `errors`, `data`, `meta`, `per_page`).
  - [ ] Keep **Zero Config, Full Control** in mind: great defaults, but everything overridable.
  - [ ] Prefer **headless hooks** (`useInertiaTable`, `useInertiaForm`) with a styled wrapper.

- **Accessibility (A11y)**
  - [ ] Use appropriate ARIA attributes.
  - [ ] Ensure full keyboard navigation.
  - [ ] Manage focus correctly for overlays/modals.

- **URL & Server Integration**
  - [ ] Use `useUrlState` for filter/sort/pagination state.
  - [ ] Ensure server is the source of truth (no duplicating filtering in JS and SQL).
  - [ ] Play nicely with Inertia’s navigation and history.

- **Styling**
  - [ ] Provide a **Tailwind-styled** default.
  - [ ] Offer a **headless** variant or API for custom styling.

- **Docs & Examples**
  - [ ] Add/Update the MDX page under `apps/docs/src/pages/components`.
  - [ ] Include a realistic Laravel + Inertia example.
  - [ ] Document props, defaults, and common recipes.

- **Tests & DX**
  - [ ] Add tests (unit or integration) where appropriate.
  - [ ] Add stories or playground examples (if we add Storybook or similar).

---

## Pull Request Process

1. **Discuss first** for bigger changes
   - Open a GitHub issue or start a discussion for large API changes.
2. **Fork & branch**
   - Branch name suggestion: `feature/data-table-filters`, `fix/modal-focus`, etc.
3. **Keep PRs focused**
   - Small, self-contained PRs are easier to review.
4. **Run checks** before opening a PR

   ```bash
   pnpm lint
   pnpm test
   pnpm typecheck
   ```

5. **Update docs**
   - For user-facing changes, update the relevant MDX docs.

6. **Fill out the PR template**
   - Describe the problem, solution, and any breaking changes.

---

## Testing

Testing strategy (high level):

- **React package**
  - Unit tests for hooks (e.g. `useInertiaTable`, `useUrlState`).
  - Component tests for interactive pieces (forms, modals, etc.).
- **Laravel package**
  - Feature tests for request helpers (e.g. table filters, sorting, pagination).
  - Tests around response formatting and toast notifications.
- **Playground**
  - Manual end-to-end testing of realistic CRUD flows.

> [TODO] Add concrete testing setup (Vitest/Jest, PHPunit/Pest) as implementation evolves.

---

## Communication

- **Issues** – Bug reports, feature requests, questions.
- **Discussions** – Design ideas, API proposals, general feedback. [TODO: enable GitHub Discussions]

We want Inertia Prime to feel like a **natural extension of Laravel and Inertia**, and your feedback is critical.
