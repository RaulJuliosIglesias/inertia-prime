<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PlaygroundController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}
