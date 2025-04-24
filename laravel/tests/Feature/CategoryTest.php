<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    //testing if we can post category
    public function test_posting_category(): void
    {
        $response = $this->postJson('/api/categories', ['name' => 'Soda']);
        $response->assertStatus(201)->assertJsonFragment(['name' => $response['name']]);

        $response = $this->postJson('/api/categories', ['name' => 'Snack']);
        $response->assertStatus(201)->assertJsonFragment(['name' => $response['name']]);
    }

    //testing if we can get all category
    public function test_getting_all_category(): void
    {
       $response = $this ->get('/api/categories');
       $response->assertStatus(200)->assertJsonCount(Category::count());
    }

    //test if we can get category by id
    public function test_gettin_category_by_id():void
    {
        $response = $this->get('/api/categories/1');
        $response->assertStatus(200)->assertJson(['id'=>$response['id']]);
    }

    //test if we can update category by id
    public function test_updating_category_by_id():void
    {
        $response = $this->patch('/api/categories/2', ['name' => "Vegetable"]);
        $response->assertStatus(200)->assertJson(['id'=> $response['id'], 'name' => $response['name']]);
    }

    //test if we can delete category by id
    public function test_delete_category_by_id():void
    {
        $response = $this->delete('/api/categories/2');
        $response->assertStatus(200)->assertJson(['id'=>$response['id']]);

        $this->get('/api/categories/2')->assertStatus(200)->assertDontSee(['id'=>$response['id']]);
    }  
}
