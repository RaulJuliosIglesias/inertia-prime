<?php

namespace InertiaPrime\Support;

use Illuminate\Http\Request;

/**
 * FilterParser: parses filter query parameters into a normalized structure.
 *
 * The normalized format aligns with the TypeScript `TableFilters` type:
 *
 *   [
 *     'status' => 'active',                       // shorthand for eq
 *     'created_at' => ['operator' => 'gte', 'value' => '2024-01-01'],
 *     'role' => ['operator' => 'in', 'value' => ['admin', 'editor']],
 *   ]
 *
 * Supported operators (mirrored in TS as TableFilterOperator):
 *   eq, neq, gt, gte, lt, lte, like, in, notIn, between, isNull, isNotNull
 */
class FilterParser
{
    /**
     * List of supported filter operators.
     */
    public const OPERATORS = [
        'eq',
        'neq',
        'gt',
        'gte',
        'lt',
        'lte',
        'like',
        'in',
        'notIn',
        'between',
        'isNull',
        'isNotNull',
    ];

    /**
     * Parse filter input from the request into a normalized array.
     *
     * Expected request format (query string):
     *   ?filter[status]=active
     *   ?filter[created_at][gte]=2024-01-01
     *   ?filter[role][in][]=admin&filter[role][in][]=editor
     *
     * @return array<string, mixed|array{operator: string, value: mixed}>
     */
    public static function fromRequest(Request $request, string $paramName = 'filter'): array
    {
        $raw = $request->input($paramName, []);

        if (! is_array($raw)) {
            return [];
        }

        $filters = [];

        foreach ($raw as $column => $condition) {
            if (! is_string($column)) {
                continue;
            }

            // Shorthand: filter[status]=active  →  eq
            if (is_scalar($condition)) {
                $filters[$column] = $condition;
                continue;
            }

            // Operator form: filter[created_at][gte]=2024-01-01
            if (is_array($condition)) {
                foreach ($condition as $op => $value) {
                    if (in_array($op, self::OPERATORS, true)) {
                        $filters[$column] = [
                            'operator' => $op,
                            'value' => $value,
                        ];
                        break; // one operator per column for now
                    }
                }

                // Fallback: treat as shorthand array value (e.g., multi-select)
                if (! isset($filters[$column])) {
                    $filters[$column] = $condition;
                }
            }
        }

        return $filters;
    }

    /**
     * Convert normalized filters back into query string parameters.
     *
     * Useful for building URLs with active filters.
     *
     * @param  array<string, mixed|array{operator: string, value: mixed}>  $filters
     */
    public static function toQueryParams(array $filters, string $paramName = 'filter'): array
    {
        $params = [];

        foreach ($filters as $column => $condition) {
            if (is_array($condition) && isset($condition['operator'], $condition['value'])) {
                $params[$paramName][$column][$condition['operator']] = $condition['value'];
            } else {
                $params[$paramName][$column] = $condition;
            }
        }

        return $params;
    }
}
