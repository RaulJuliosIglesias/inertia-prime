# Inertia Prime – VISION.md

This file documents the **original vision**, the proposed **monorepo structure**
for Inertia Prime and a **roadmap of next steps** to complete the
library.

---

## 1. Instructions / Original Vision (Summary)

### 1.1. Project Overview

> Inertia Prime — Laravel Inertia Component Library  
> Inertia Prime is a production-grade React component library,
> designed specifically for the **Laravel + Inertia.js** stack.

- **Goal**: Solve the classic pain points of Laravel + Inertia + React projects:
  - Tables with server-side pagination and filtering.
  - Forms that inherently understand Laravel validations.
  - Modals, slide-overs, and navigation that respect browser history.
- **Inspiration**: To be for Laravel + Inertia + React what **shadcn/ui** is for
  Next.js, but with deep knowledge of the Laravel ecosystem.

### 1.2. The Problem It Solves

- **Reinventing the wheel**: Every project recreates tables, filters, forms, and
  UI patterns that have been solved before.
- **Glue code with generic libraries**: Integrating TanStack Table, React Hook Form,
  etc., with Inertia and Laravel requires a lot of glue code.
- **URL state as an afterthought**: Most libraries keep state only in
  React. In Inertia, the URL should be the primary source of truth.
- **React + Inertia in Laravel is underserved**: There are mature ecosystems for
  Livewire and Vue; for React + Inertia there are fewer curated options.

### 1.3. Core Philosophy

- **Zero Config, Full Control**
  - Components must work seamlessly with **zero configuration** for
    80% of use cases.
  - Simultaneously, expose clean and extensible APIs for advanced
    customization.
- **URL as Source of Truth**
  - Filters, sorting, pagination, modal states, tabs... everything must live in
    **query params** by default.
- **Server-First Architecture**
  - The server (Eloquent) is the source of truth for searching, filtering, and
    sorting: no duplicating heavy logic on the client side.
- **Motion with Purpose**
  - Animations with purpose (state changes, loading, success, error), not
    just decorative.
- **Accessibility Built In**
  - ARIA, keyboard navigation, focus management, and screen reader
    support.

### 1.4. Target Audience

- Laravel developers using Inertia.js with React.
- Teams building admin panels, dashboards, and complex CRUDs.
- Developers tired of the "glue code" between generic libraries and the stack
  Laravel + Inertia.

### 1.5. Tech Stack

- **Frontend**
  - React 18+ with TypeScript.
  - Tailwind CSS.
  - Framer Motion for animations.
  - Inertia.js (React adapter).
- **Backend (Optional)**
  - Companion Laravel package in PHP with helpers, traits, resources, and
    Artisan commands.

### 1.6. Component Library (Vision)

**Data Display**
- DataTable, InfiniteList, DescriptionList.

**Forms**
- Form, TextField, TextArea, Select, Combobox, AsyncSelect,
  Checkbox / CheckboxGroup, RadioGroup, Switch, DatePicker, FileUpload.

**Overlays**
- Modal, SlideOver, Dropdown, Popover, Tooltip.

**Navigation**
- Tabs, Breadcrumbs, Pagination, CommandPalette.

**Feedback**
- Toast, Alert, Progress / CircularProgress, Skeletons.

**Layout**
- Card, EmptyState, Divider, DescriptionList.

### 1.7. Hooks Layer (Headless)

- `useInertiaTable` – Core logic for DataTable.
- `useInertiaForm` – Layer on top of Inertia's `useForm`.
- `useUrlState` – Generic state ↔ URL synchronization.
- `useModal` – URL-driven modals and slide-overs.
- `useInfiniteScroll` – Infinite scrolling with IntersectionObserver.

### 1.8. Laravel Integration Package (Vision)

- **Request helpers**
  - Traits/macros to parse table parameters (filters, sort, pagination)
    from `Request` and apply them to Eloquent queries.
- **Response formatting**
  - Consistent response structure for tables, validation errors, and
    toasts.
- **Artisan generators**
  - `php artisan make:inertia-table UsersTable`.
  - Installation/configuration command.

---

## 2. Preliminary Repository Structure

At ESTRUCTURE.md captures the preliminary structure defined for
**Inertia Prime** (monorepo format):


## 3. Roadmap – Next Steps to Build the Library

This section proposes a **phased plan** to complete Inertia Prime, without
breaking the current rule of “not implementing real component logic yet”.

### Phase 1 – API Design (No Implementation)

- **DataTable / useInertiaTable**
  - Define TypeScript types for:
    - Table response from Laravel (`rows`, `meta`, `links`, `filters`).
    - `useInertiaTable` options (route, query params mapping, keys).
    - Events/handlers (onSortChange, onFilterChange, onPageChange, etc.).
- **useInertiaForm**
  - Define interface over Inertia's `useForm`:
    - `useInertiaForm(options)` signature.
    - Support for error bags, dirty state, transforms.
- **URL state / useUrlState**
  - Design how the schema is described (`string | number | boolean | array`),
    defaults, and URL encoding.
- **Laravel TableBuilder / Helpers**
  - Propose the contract for `TableBuilder` and `FilterParser`.
  - Specify how they combine with `HandlesTableRequests`.

> Expected result: Clear types and contracts in `packages/react` and
> `packages/laravel` (still no logic), and updated documentation in `apps/docs`.

### Phase 2 – DX Infrastructure

- Add and configure **ESLint + Prettier** for TypeScript and React.
- Define **Tailwind** configuration (basic tokens, colors, spacing).
- Choose test runner (**Vitest** or similar) and test structure.
- Reinforce `turbo.json` with package/app-specific tasks.

### Phase 3 – Implement Headless Hooks

- Start with the **hooks layer**, without UI:
  - `useUrlState` (read/write query params via Inertia router).
  - `useInertiaTable` using `useUrlState` + `@inertiajs/react`.
  - `useInertiaForm` wrapping `useForm`.
  - `useModal` with URL state.
- Add unit tests for these hooks.

### Phase 4 – Implement Styled + Headless Components

- Implement UI wrappers on top of the hooks:
  - `DataTable` and subcomponents (`Head`, `Body`, `Row`, `Cell`, `Filters`, etc.).
  - `Form` + `FormField` + inputs (`TextField`, `Select`, etc.).
  - `Modal`, `SlideOver`, `Dropdown`, `Tabs`, `Toast`, etc.
- Maintain two usage modes:
  - **Styled** (with Tailwind by default).
  - **Headless** (behavior + a11y only, external styling).

### Phase 5 – Implement Laravel Companion Package

- Complete traits and helpers:
  - `HandlesTableRequests`, `FormatsTableResponse`, `SendsToastNotifications`.
  - `TableBuilder`, `FilterParser`, `TableResource`.
- Implement Artisan commands:
  - `inertia-prime:install` (publish config, assets if applicable).
  - `make:inertia-table` for table scaffolding.
- Add integration tests in Laravel (Pest/PHPUnit).

### Phase 6 – Docs and Real Examples

- Replace `[TODO]` blocks in `apps/docs` with real examples:
  - Complete CRUD tables.
  - Multi-step forms.
  - Dashboard with multiple UI pieces.
- Connect `ComponentPreview`, `PropsTable`, and `Playground` to real examples.
- Add a **"Recipes"** section (common patterns in Laravel + Inertia).

### Phase 7 – Stabilization and Release

- **Accessibility** (a11y) audit on key components.
- Measure and optimize performance (render time, bundle size).
- Define **semantic versioning** policy and version support.
- Publish `0.1.0` (preview) and prepare the roadmap towards `1.0.0`.

---

## 4. How to Use This File

- As a **quick reference** for:
  - The original project vision.
  - The agreed-upon monorepo structure.
  - The phased plan for building the library.
- As an alignment document for contributors:
  - You can link `STRUCTURE.md` from `CONTRIBUTING.md` or design issues.

> Whenever a major architectural decision is made, review if it fits this vision. If
> it doesn't fit, or if the vision has changed, update this file to keep it aligned
> with the project's reality.