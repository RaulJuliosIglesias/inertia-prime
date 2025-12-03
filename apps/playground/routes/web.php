<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/data-table', function () {
    // [TODO] Replace with a real controller and DataTable integration.
    return Inertia::render('DataTableDemo');
})->name('playground.data-table');

Route::get('/form', function () {
    return Inertia::render('FormDemo');
})->name('playground.form');

Route::get('/modal', function () {
    return Inertia::render('ModalDemo');
})->name('playground.modal');
