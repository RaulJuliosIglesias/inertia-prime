<?php

namespace InertiaPrime\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MakeTableCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'make:inertia-table 
                            {name : The name of the table class}
                            {--model= : The model to use for the table}
                            {--force : Overwrite existing files}';

    /**
     * The console command description.
     */
    protected $description = 'Create a new Inertia Prime table class';

    public function handle(): int
    {
        $name = $this->argument('name');
        $modelOption = $this->option('model');

        // Generate class name
        $className = Str::studly($name);
        if (!Str::endsWith($className, 'Table')) {
            $className .= 'Table';
        }

        // Generate model name
        $modelName = $modelOption 
            ? Str::studly($modelOption) 
            : Str::singular(Str::replaceLast('Table', '', $className));

        // Generate file path
        $path = app_path("Tables/{$className}.php");

        // Check if file exists
        if (file_exists($path) && !$this->option('force')) {
            $this->error("Table class already exists: {$path}");
            return self::FAILURE;
        }

        // Create directory if needed
        $directory = dirname($path);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        // Generate stub content
        $stub = $this->getStub($className, $modelName);

        // Write file
        file_put_contents($path, $stub);

        $this->info("Table class created successfully: {$path}");
        $this->newLine();
        $this->line("Usage in your controller:");
        $this->line("  use App\\Tables\\{$className};");
        $this->line("  ");
        $this->line("  public function index()");
        $this->line("  {");
        $this->line("      \$table = {$className}::for({$modelName}::query())");
        $this->line("          ->applyRequest(request())");
        $this->line("          ->toResponse();");
        $this->line("      ");
        $this->line("      return Inertia::render('YourPage', ['table' => \$table]);");
        $this->line("  }");

        return self::SUCCESS;
    }

    protected function getStub(string $className, string $modelName): string
    {
        return <<<PHP
<?php

namespace App\Tables;

use App\Models\\{$modelName};
use InertiaPrime\Support\TableBuilder;

class {$className} extends TableBuilder
{
    /**
     * Define the columns for this table.
     */
    protected function columns(): array
    {
        return [
            'id' => [
                'label' => 'ID',
                'sortable' => true,
            ],
            'name' => [
                'label' => 'Name',
                'sortable' => true,
                'searchable' => true,
            ],
            'created_at' => [
                'label' => 'Created At',
                'sortable' => true,
            ],
        ];
    }

    /**
     * Define the default sort column and direction.
     */
    protected function defaultSort(): array
    {
        return ['created_at', 'desc'];
    }

    /**
     * Define the searchable columns.
     */
    protected function searchable(): array
    {
        return ['name'];
    }

    /**
     * Define the filterable columns and their types.
     */
    protected function filters(): array
    {
        return [
            // 'status' => 'exact',
            // 'category_id' => 'exact',
        ];
    }
}

PHP;
    }
}
