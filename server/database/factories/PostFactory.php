<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'title'=>fake()->title(),
           'description' => fake()->text(),
           'km'=> fake()->numberBetween(60000,180000),
           'mark'=>fake()->title(),
           'model'=>fake()->title(),
           'motor'=>fake()->randomElement(['manual','automatic']),
           'year' => fake()->year(),
           'location' => fake()->locale(),
           'color'=>fake()->colorName(),
           'price'=>fake()->randomDigit()
        ];
    }
}
