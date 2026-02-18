<?php

namespace Database\Seeders;

use App\Models\Draft;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(5)->create();
        Draft::factory(15)->create([
            'user_id' => fn() => $users->random()->id,
        ]);
    }
}
