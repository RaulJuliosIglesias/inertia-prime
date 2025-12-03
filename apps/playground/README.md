# Inertia Prime Playground

This directory contains a **Laravel + Inertia.js + React** playground used to
try Inertia Prime components in realistic flows.

> The playground is intentionally minimal and may not be a fully-initialized
> Laravel app yet. Run the usual Laravel installation steps as needed.

## Setup

1. Install PHP dependencies:

   ```bash
   cd apps/playground
   composer install
   cp .env.example .env # if present
   php artisan key:generate
   ```

2. Run database migrations and seeders (optional):

   ```bash
   php artisan migrate --seed
   ```

3. Install frontend dependencies from the monorepo root and run the dev server:

   ```bash
   pnpm install
   pnpm dev:playground
   ```

[TODO] Add Vite and Laravel configuration details once the playground is fully
wired to Inertia Prime.
