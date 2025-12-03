<?php

namespace InertiaPrime\Console\Commands;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'inertia-prime:install
                            {--force : Overwrite existing files}';

    /**
     * The console command description.
     */
    protected $description = 'Install Inertia Prime Laravel package';

    public function handle(): int
    {
        $this->info('Installing Inertia Prime...');

        // Publish configuration
        $this->call('vendor:publish', [
            '--tag' => 'inertia-prime-config',
            '--force' => $this->option('force'),
        ]);

        $this->newLine();
        $this->info('Inertia Prime installed successfully!');
        $this->newLine();

        $this->line('Next steps:');
        $this->line('  1. Install the React package: npm install @inertia-prime/react');
        $this->line('  2. Wrap your app with InertiaPrimeProvider');
        $this->line('  3. Configure your tables and forms');
        $this->newLine();

        $this->line('Documentation: https://github.com/your-org/inertia-prime');

        return self::SUCCESS;
    }
}
