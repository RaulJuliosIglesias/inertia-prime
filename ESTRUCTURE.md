# Inertia Prime – STRUCTURE.md

inertia-prime/
├── packages/
│   ├── react/                          # Main React component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── data-table/
│   │   │   │   │   ├── DataTable.tsx
│   │   │   │   │   ├── DataTableHead.tsx
│   │   │   │   │   ├── DataTableBody.tsx
│   │   │   │   │   ├── DataTableRow.tsx
│   │   │   │   │   ├── DataTableCell.tsx
│   │   │   │   │   ├── DataTablePagination.tsx
│   │   │   │   │   ├── DataTableFilters.tsx
│   │   │   │   │   ├── DataTableSearch.tsx
│   │   │   │   │   ├── DataTableActions.tsx
│   │   │   │   │   ├── DataTableSkeleton.tsx
│   │   │   │   │   ├── DataTableEmpty.tsx
│   │   │   │   │   ├── context.tsx
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── form/
│   │   │   │   │   ├── Form.tsx
│   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   ├── FormLabel.tsx
│   │   │   │   │   ├── FormMessage.tsx
│   │   │   │   │   ├── FormDescription.tsx
│   │   │   │   │   ├── context.tsx
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── inputs/
│   │   │   │   │   ├── TextField.tsx
│   │   │   │   │   ├── TextArea.tsx
│   │   │   │   │   ├── Select.tsx
│   │   │   │   │   ├── Combobox.tsx
│   │   │   │   │   ├── AsyncSelect.tsx
│   │   │   │   │   ├── Checkbox.tsx
│   │   │   │   │   ├── CheckboxGroup.tsx
│   │   │   │   │   ├── RadioGroup.tsx
│   │   │   │   │   ├── Switch.tsx
│   │   │   │   │   ├── DatePicker.tsx
│   │   │   │   │   ├── FileUpload.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── modal/
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── ModalHeader.tsx
│   │   │   │   │   ├── ModalBody.tsx
│   │   │   │   │   ├── ModalFooter.tsx
│   │   │   │   │   ├── ModalOverlay.tsx
│   │   │   │   │   ├── context.tsx
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── slide-over/
│   │   │   │   │   ├── SlideOver.tsx
│   │   │   │   │   ├── SlideOverHeader.tsx
│   │   │   │   │   ├── SlideOverBody.tsx
│   │   │   │   │   ├── SlideOverFooter.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dropdown/
│   │   │   │   │   ├── Dropdown.tsx
│   │   │   │   │   ├── DropdownTrigger.tsx
│   │   │   │   │   ├── DropdownContent.tsx
│   │   │   │   │   ├── DropdownItem.tsx
│   │   │   │   │   ├── DropdownSeparator.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── popover/
│   │   │   │   │   ├── Popover.tsx
│   │   │   │   │   ├── PopoverTrigger.tsx
│   │   │   │   │   ├── PopoverContent.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tooltip/
│   │   │   │   │   ├── Tooltip.tsx
│   │   │   │   │   ├── TooltipTrigger.tsx
│   │   │   │   │   ├── TooltipContent.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tabs/
│   │   │   │   │   ├── Tabs.tsx
│   │   │   │   │   ├── TabsList.tsx
│   │   │   │   │   ├── TabsTrigger.tsx
│   │   │   │   │   ├── TabsContent.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── infinite-list/
│   │   │   │   │   ├── InfiniteList.tsx
│   │   │   │   │   ├── InfiniteListItem.tsx
│   │   │   │   │   ├── InfiniteListLoader.tsx
│   │   │   │   │   ├── InfiniteListEnd.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── toast/
│   │   │   │   │   ├── Toast.tsx
│   │   │   │   │   ├── ToastProvider.tsx
│   │   │   │   │   ├── ToastViewport.tsx
│   │   │   │   │   ├── useToast.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── alert/
│   │   │   │   │   ├── Alert.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── progress/
│   │   │   │   │   ├── Progress.tsx
│   │   │   │   │   ├── CircularProgress.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── skeleton/
│   │   │   │   │   ├── Skeleton.tsx
│   │   │   │   │   ├── SkeletonText.tsx
│   │   │   │   │   ├── SkeletonAvatar.tsx
│   │   │   │   │   ├── SkeletonCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── breadcrumbs/
│   │   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   │   ├── BreadcrumbItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── pagination/
│   │   │   │   │   ├── Pagination.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── command-palette/
│   │   │   │   │   ├── CommandPalette.tsx
│   │   │   │   │   ├── CommandInput.tsx
│   │   │   │   │   ├── CommandList.tsx
│   │   │   │   │   ├── CommandItem.tsx
│   │   │   │   │   ├── CommandGroup.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── CardHeader.tsx
│   │   │   │   │   ├── CardBody.tsx
│   │   │   │   │   ├── CardFooter.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── empty-state/
│   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── description-list/
│   │   │   │   │   ├── DescriptionList.tsx
│   │   │   │   │   ├── DescriptionItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── divider/
│   │   │   │       ├── Divider.tsx
│   │   │   │       └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useInertiaTable.ts
│   │   │   │   ├── useInertiaForm.ts
│   │   │   │   ├── useUrlState.ts
│   │   │   │   ├── useModal.ts
│   │   │   │   ├── useInfiniteScroll.ts
│   │   │   │   ├── useDebounce.ts
│   │   │   │   ├── useFocusTrap.ts
│   │   │   │   ├── useClickOutside.ts
│   │   │   │   ├── useKeyboard.ts
│   │   │   │   ├── useScrollLock.ts
│   │   │   │   ├── useMediaQuery.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts                    # className merge utility
│   │   │   │   ├── url.ts                   # URL manipulation helpers
│   │   │   │   ├── laravel.ts               # Laravel response parsing
│   │   │   │   ├── animations.ts            # Framer Motion presets
│   │   │   │   ├── accessibility.ts         # A11y helpers
│   │   │   │   └── index.ts
│   │   │   ├── theme/
│   │   │   │   ├── tokens.ts                # Design tokens
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   ├── spacing.ts
│   │   │   │   ├── animations.ts
│   │   │   │   └── index.ts
│   │   │   ├── providers/
│   │   │   │   ├── InertiaPrimeProvider.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── inertia.ts               # Inertia-specific types
│   │   │   │   ├── laravel.ts               # Laravel response types
│   │   │   │   ├── components.ts            # Shared component types
│   │   │   │   └── index.ts
│   │   │   └── index.ts                     # Main entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts                   # Build configuration
│   │   ├── tailwind.config.js
│   │   └── README.md
│   │
│   └── laravel/                             # Laravel companion package
│       ├── src/
│       │   ├── Traits/
│       │   │   ├── HandlesTableRequests.php
│       │   │   ├── FormatsTableResponse.php
│       │   │   └── SendsToastNotifications.php
│       │   ├── Http/
│       │   │   └── Resources/
│       │   │       └── TableResource.php
│       │   ├── Console/
│       │   │   └── Commands/
│       │   │       ├── MakeTableCommand.php
│       │   │       └── InstallCommand.php
│       │   ├── Support/
│       │   │   ├── TableBuilder.php
│       │   │   └── FilterParser.php
│       │   └── InertiaPrimeServiceProvider.php
│       ├── config/
│       │   └── inertia-prime.php
│       ├── composer.json
│       └── README.md
│
├── apps/
│   ├── docs/                                # Documentation site
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.mdx
│   │   │   │   ├── getting-started/
│   │   │   │   │   ├── installation.mdx
│   │   │   │   │   ├── quick-start.mdx
│   │   │   │   │   └── theming.mdx
│   │   │   │   ├── components/
│   │   │   │   │   ├── data-table.mdx
│   │   │   │   │   ├── form.mdx
│   │   │   │   │   ├── modal.mdx
│   │   │   │   │   └── [component].mdx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── use-inertia-table.mdx
│   │   │   │   │   ├── use-url-state.mdx
│   │   │   │   │   └── [hook].mdx
│   │   │   │   ├── examples/
│   │   │   │   │   ├── crud-table.mdx
│   │   │   │   │   ├── multi-step-form.mdx
│   │   │   │   │   └── dashboard.mdx
│   │   │   │   └── laravel/
│   │   │   │       ├── installation.mdx
│   │   │   │       ├── table-requests.mdx
│   │   │   │       └── generators.mdx
│   │   │   ├── components/
│   │   │   │   ├── ComponentPreview.tsx
│   │   │   │   ├── PropsTable.tsx
│   │   │   │   ├── CodeBlock.tsx
│   │   │   │   └── Playground.tsx
│   │   │   └── styles/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── playground/                          # Development playground
│       ├── app/                             # Laravel application
│       │   ├── Http/Controllers/
│       │   ├── Models/
│       │   └── ...
│       ├── resources/
│       │   └── js/
│       │       ├── Pages/
│       │       │   ├── DataTableDemo.tsx
│       │       │   ├── FormDemo.tsx
│       │       │   ├── ModalDemo.tsx
│       │       │   └── ...
│       │       └── app.tsx
│       ├── routes/
│       │   └── web.php
│       ├── database/
│       │   ├── factories/
│       │   ├── migrations/
│       │   └── seeders/
│       ├── composer.json
│       └── package.json
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                           # Tests and linting
│   │   ├── release.yml                      # Automated releases
│   │   └── docs.yml                         # Documentation deployment
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── config.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── FUNDING.yml
│
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── llms.txt                                 # AI assistant context file
├── package.json                             # Monorepo root
├── pnpm-workspace.yaml
├── turbo.json                               # Turborepo configuration
├── tsconfig.base.json
└── .gitignore
```

> Note: Part of this structure is already created in the repository; other paths
> remain a **plan** to be implemented later.