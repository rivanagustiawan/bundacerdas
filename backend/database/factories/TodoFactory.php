<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "title"      => $this->faker->sentence,
      "body"       => $this->faker->paragraph,
      "completed"  => rand(0, 1),
      "created_by" => rand(1, 10)
    ];
  }
}
