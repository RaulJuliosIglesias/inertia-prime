<?php

namespace InertiaPrime\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TableResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * This is a placeholder; the final shape is aligned with the
     * `InertiaTableResponse<TData>` interface from the @inertia-prime/react
     * package (data, meta.pagination/sort/filters, links).
     */
    public function toArray($request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'pagination' => [
                    // 'current_page' => 1,
                    // 'from' => null,
                    // 'last_page' => 1,
                    // 'path' => url()->current(),
                    // 'per_page' => 15,
                    // 'to' => null,
                    // 'total' => 0,
                ],
                'sort' => [
                    // 'column' => null,
                    // 'direction' => null,
                ],
                'filters' => [
                    // 'search' => null,
                    // 'status' => null,
                ],
            ],
            'links' => [
                // 'first' => null,
                // 'last' => null,
                // 'prev' => null,
                // 'next' => null,
                // 'pages' => [], // optional numbered page links
            ],
        ];
    }
}
