<?php

namespace InertiaPrime\Support;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Http\Request;

/**
 * TableBuilder: fluent API for building server-driven table responses.
 *
 * Usage:
 *   $response = TableBuilder::for(User::query())
 *       ->columns(['id', 'name', 'email', 'created_at'])
 *       ->searchable(['name', 'email'])
 *       ->defaultSort('created_at', 'desc')
 *       ->applyRequest($request)
 *       ->toResponse();
 *
 *   return Inertia::render('Users/Index', ['users' => $response]);
 */
class TableBuilder
{
    /** @var EloquentBuilder */
    protected $query;

    /** @var array<string> */
    protected $columns = [];

    /** @var array<string> */
    protected $searchableColumns = [];

    /** @var array{column: string, direction: string}|null */
    protected $defaultSort = null;

    /** @var array{column: string, direction: string}|null */
    protected $currentSort = null;

    /** @var array<string, mixed> */
    protected $filters = [];

    /** @var int */
    protected $perPage = 15;

    /** @var int */
    protected $currentPage = 1;

    public static function for(EloquentBuilder $query): self
    {
        $instance = new self();
        $instance->query = $query;

        return $instance;
    }

    /**
     * Define which columns are available for this table.
     *
     * @param  array<string>  $columns
     */
    public function columns(array $columns): self
    {
        $this->columns = $columns;

        return $this;
    }

    /**
     * Define which columns can be searched via a global search input.
     *
     * @param  array<string>  $columns
     */
    public function searchable(array $columns): self
    {
        $this->searchableColumns = $columns;

        return $this;
    }

    /**
     * Set the default sort when no sort is specified in the request.
     */
    public function defaultSort(string $column, string $direction = 'asc'): self
    {
        $this->defaultSort = [
            'column' => $column,
            'direction' => strtolower($direction) === 'desc' ? 'desc' : 'asc',
        ];

        return $this;
    }

    /**
     * Apply request parameters (filters, sorting, pagination) to the query.
     */
    public function applyRequest(Request $request): self
    {
        // Filters
        $this->filters = FilterParser::fromRequest($request);

        // Global search
        $search = $request->input('search');
        if ($search && count($this->searchableColumns) > 0) {
            $this->query->where(function ($q) use ($search) {
                foreach ($this->searchableColumns as $col) {
                    $q->orWhere($col, 'like', '%' . $search . '%');
                }
            });
        }

        // Sorting
        $sortColumn = $request->input('sort');
        $sortDirection = strtolower($request->input('direction', 'asc'));

        if ($sortColumn && in_array($sortColumn, $this->columns, true)) {
            $this->currentSort = [
                'column' => $sortColumn,
                'direction' => $sortDirection === 'desc' ? 'desc' : 'asc',
            ];
        } elseif ($this->defaultSort) {
            $this->currentSort = $this->defaultSort;
        }

        if ($this->currentSort) {
            $this->query->orderBy($this->currentSort['column'], $this->currentSort['direction']);
        }

        // Pagination
        $this->perPage = (int) $request->input('per_page', $this->perPage);
        $this->currentPage = (int) $request->input('page', 1);

        return $this;
    }

    /**
     * Execute the query with pagination.
     */
    public function paginate(?int $perPage = null): LengthAwarePaginator
    {
        return $this->query->paginate($perPage ?? $this->perPage, ['*'], 'page', $this->currentPage);
    }

    /**
     * Build the final response array matching InertiaTableResponse<TData>.
     *
     * @return array{data: array, meta: array, links: array}
     */
    public function toResponse(): array
    {
        $paginator = $this->paginate();

        // Build numbered page links
        $pageLinks = [];
        foreach ($paginator->linkCollection() as $link) {
            $pageLinks[] = [
                'url' => $link['url'],
                'label' => $link['label'],
                'active' => $link['active'],
            ];
        }

        return [
            'data' => $paginator->items(),
            'meta' => [
                'pagination' => [
                    'current_page' => $paginator->currentPage(),
                    'from' => $paginator->firstItem(),
                    'last_page' => $paginator->lastPage(),
                    'path' => $paginator->path(),
                    'per_page' => $paginator->perPage(),
                    'to' => $paginator->lastItem(),
                    'total' => $paginator->total(),
                ],
                'sort' => $this->currentSort,
                'filters' => $this->filters,
            ],
            'links' => [
                'first' => $paginator->url(1),
                'last' => $paginator->url($paginator->lastPage()),
                'prev' => $paginator->previousPageUrl(),
                'next' => $paginator->nextPageUrl(),
                'pages' => $pageLinks,
            ],
        ];
    }
}
