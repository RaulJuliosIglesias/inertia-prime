<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Inertia Prime Configuration
    |--------------------------------------------------------------------------
    |
    | This file is the central place to configure Inertia Prime's Laravel
    | integration.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Table Settings
    |--------------------------------------------------------------------------
    */
    'tables' => [
        // Default number of items per page
        'per_page' => 15,

        // Allowed per page options
        'per_page_options' => [10, 25, 50, 100],

        // Default sort direction
        'default_direction' => 'asc',

        // Query parameter names
        'params' => [
            'page' => 'page',
            'per_page' => 'per_page',
            'sort' => 'sort',
            'direction' => 'direction',
            'search' => 'search',
            'filters' => 'filters',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Toast Notifications
    |--------------------------------------------------------------------------
    */
    'toasts' => [
        // Default toast duration in milliseconds
        'duration' => 5000,

        // Maximum number of toasts to show at once
        'max_toasts' => 5,

        // Default position
        'position' => 'top-right',

        // Inertia shared data key for toasts
        'key' => 'toast',
    ],

];
