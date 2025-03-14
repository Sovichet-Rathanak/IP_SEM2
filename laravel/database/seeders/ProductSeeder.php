<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => "Coca Cola",
            'category_id' => 1,
            'pricing' => 1,
        ]);

        Product::create([
            'name' => "Meiji",
            'category_id' => 2,
            'pricing' => 1,
        ]);
    }
}
