# Changelog

All notable changes to **Inertia Prime** will be documented in this file.

The project follows [Semantic Versioning](https://semver.org/).

> This file is managed manually and/or via [Changesets](https://github.com/changesets/changesets).
> For unreleased work, see the open pull requests and the `.changeset` folder (once added).

## [Unreleased]

_No unreleased changes._

## [0.1.0] - 2025-12-03

### Added

#### React Package (`@inertia-prime/react`)

**Hooks (12):**
- `useDebounce` - Debounce values with configurable delay
- `useUrlState` - Sync React state with URL query params
- `useModal` - URL-driven modal state management
- `useInertiaTable` - Complete table state with sorting, filtering, pagination
- `useInertiaForm` - Enhanced Inertia form with validation helpers
- `useToast` - Toast notification management
- `useFocusTrap` - Trap focus within containers
- `useClickOutside` - Detect clicks outside elements
- `useKeyboard` - Keyboard shortcuts with modifiers
- `useScrollLock` - Lock body scroll
- `useMediaQuery` - CSS media query listener
- `useInfiniteScroll` - IntersectionObserver-based loading

**Data Display Components:**
- `DataTable` - Server-driven table with Head, Body, Pagination, Search
- `Card` - Container with Header, Title, Body, Footer
- `Alert` - Info/success/warning/error banners with icons
- `Skeleton` - Loading placeholders (text, avatar, card patterns)
- `EmptyState` - No data display with icon and action
- `Progress` - Linear progress bar with variants
- `CircularProgress` - Circular/spinner progress indicator
- `Divider` - Visual separator (horizontal/vertical)
- `DescriptionList` - Key-value display for detail views

**Form Components:**
- `Form` - Inertia-integrated form with context
- `FormField` - Form field wrapper with label and error
- `FormLabel` - Accessible form labels
- `FormDescription` - Help text for fields
- `FormMessage` - Validation error/success messages
- `TextField` - Text input with variants
- `Select` - Native select dropdown
- `Checkbox` - Checkbox with label/description
- `Textarea` - Multi-line text input
- `Switch` - Toggle switch component
- `RadioGroup` - Radio button group
- `CheckboxGroup` - Multiple checkbox selection
- `Combobox` - Searchable select with filtering
- `AsyncSelect` - Async option loading with debounce
- `DatePicker` - Calendar date selection
- `FileUpload` - Drag & drop file upload
- `Button` - 5 variants, 3 sizes, loading state

**Overlay Components:**
- `Modal` - Portal-based modal with focus trap
- `SlideOver` - Slide-in panel from left/right
- `Dropdown` - Dropdown menu with items
- `Popover` - Floating content panel
- `Tooltip` - Hover/focus tooltips
- `ToastProvider` - Toast notification system

**Navigation Components:**
- `Tabs` - Tab navigation with URL support
- `Breadcrumbs` - Breadcrumb navigation
- `Pagination` - Standalone pagination
- `InfiniteList` - Infinite scrolling list
- `CommandPalette` - ⌘K style command palette with search

#### Laravel Package (`inertia-prime/laravel`)

- `InertiaPrimeServiceProvider` - Auto-registration with config
- `TableBuilder` - Eloquent query builder for DataTable responses
- `FilterParser` - Request parameter parsing
- `SendsToastNotifications` - Controller trait for toasts
- `php artisan inertia-prime:install` - Installation command
- `php artisan make:inertia-table` - Table class generator
- Configuration file for tables and toasts
