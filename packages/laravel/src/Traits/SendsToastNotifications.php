<?php

namespace InertiaPrime\Traits;

use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

/**
 * SendsToastNotifications: attach toast messages to Inertia responses.
 *
 * The toast payload matches the TypeScript ToastOptions interface:
 *   {
 *     id?: string,
 *     title: string,
 *     description?: string,
 *     variant?: 'default' | 'success' | 'error' | 'warning' | 'info',
 *     duration?: number,
 *     dismissible?: boolean,
 *     action?: { label: string, onClick: string }  // onClick is a route name or URL
 *   }
 *
 * The ToastProvider on the frontend reads the `toast` shared prop and displays it.
 */
trait SendsToastNotifications
{
    /**
     * Attach a toast notification to an Inertia response.
     */
    protected function withToast(InertiaResponse $response, array $toast): InertiaResponse
    {
        return $response->with('toast', $this->normalizeToast($toast));
    }

    /**
     * Flash a toast notification for the next request (useful with redirects).
     */
    protected function flashToast(array $toast): void
    {
        session()->flash('toast', $this->normalizeToast($toast));
    }

    /**
     * Convenience method: success toast.
     */
    protected function successToast(string $title, ?string $description = null): array
    {
        return $this->normalizeToast([
            'title' => $title,
            'description' => $description,
            'variant' => 'success',
        ]);
    }

    /**
     * Convenience method: error toast.
     */
    protected function errorToast(string $title, ?string $description = null): array
    {
        return $this->normalizeToast([
            'title' => $title,
            'description' => $description,
            'variant' => 'error',
        ]);
    }

    /**
     * Convenience method: warning toast.
     */
    protected function warningToast(string $title, ?string $description = null): array
    {
        return $this->normalizeToast([
            'title' => $title,
            'description' => $description,
            'variant' => 'warning',
        ]);
    }

    /**
     * Convenience method: info toast.
     */
    protected function infoToast(string $title, ?string $description = null): array
    {
        return $this->normalizeToast([
            'title' => $title,
            'description' => $description,
            'variant' => 'info',
        ]);
    }

    /**
     * Normalize toast payload with defaults.
     */
    protected function normalizeToast(array $toast): array
    {
        return array_filter([
            'id' => $toast['id'] ?? uniqid('toast_'),
            'title' => $toast['title'] ?? '',
            'description' => $toast['description'] ?? null,
            'variant' => $toast['variant'] ?? 'default',
            'duration' => $toast['duration'] ?? 5000,
            'dismissible' => $toast['dismissible'] ?? true,
            'action' => $toast['action'] ?? null,
        ], fn ($value) => $value !== null);
    }
}
