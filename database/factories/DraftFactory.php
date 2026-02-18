<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Draft>
 */
class DraftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'token' => Str::random(),
            'pokemonNb' => fake()->numberBetween(9, 12),
            'pointsNb' => fake()->numberBetween(110, 140)
        ];
    }
}
