<?php

namespace InertiaPrime;

use Illuminate\Support\ServiceProvider;
use InertiaPrime\Console\Commands\InstallCommand;
use InertiaPrime\Console\Commands\MakeTableCommand;

class InertiaPrimeServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Merge default configuration
        $this->mergeConfigFrom(
            __DIR__ . '/../config/inertia-prime.php',
            'inertia-prime'
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Publish configuration
        $this->publishes([
            __DIR__ . '/../config/inertia-prime.php' => config_path('inertia-prime.php'),
        ], 'inertia-prime-config');

        // Register commands
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallCommand::class,
                MakeTableCommand::class,
            ]);
        }
    }
}
