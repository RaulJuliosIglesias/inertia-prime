<?php

namespace InertiaPrime\Traits;

use Illuminate\Http\Resources\Json\JsonResource;

trait FormatsTableResponse
{
    /**
     * Format a given paginator or collection into a standardized table response.
     *
     * This is a placeholder; the concrete implementation will be added later.
     */
    protected function formatTableResponse($resource, array $meta = []): array
    {
        // TODO: Implement table response formatting.
        return [
            'data' => $resource instanceof JsonResource ? $resource->toArray(request()) : (array) $resource,
            'meta' => $meta,
        ];
    }
}
