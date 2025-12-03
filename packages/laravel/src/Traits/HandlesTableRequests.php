<?php

namespace InertiaPrime\Traits;

use Illuminate\Http\Request;

trait HandlesTableRequests
{
    /**
     * Extract table-related parameters (filters, sorts, pagination) from the
     * given request. This is a placeholder; actual logic will be implemented
     * in a later iteration.
     */
    protected function extractTableParameters(Request $request): array
    {
        // [TODO] Parse filters, sort, direction, page, per_page, etc.
        return [];
    }
}
