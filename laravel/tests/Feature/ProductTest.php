<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    // testing to see if we can post product
    public function test_posting_product(): void{
        $response = $this->postJson('/api/products', ['name' => 'Cola', 'category_id' => '1', "pricing" => 1.00]);
        $response->assertStatus(201)->assertJson(['name' => $response['name'], 'category_id' => $response['category_id'], "pricing" => $response['pricing']]);

        $response = $this->postJson('/api/products', ['name' => 'Cheetos', 'category_id' => '2', "pricing" => 2.00]);
        $response->assertStatus(201)->assertJson(['name' => $response['name'], 'category_id' => $response['category_id'], "pricing" => $response['pricing']]);
    }

    //testing if we can get all product
    public function test_getting_all_product(): void
    {
       $response = $this ->get('/api/products');
       $response->assertStatus(200)->assertJsonCount(Product::count());
    }

    //test if we can get product by id
    public function test_gettin_product_by_id():void
    {
        $response = $this->get('/api/products/1');
        $response->assertStatus(200)->assertJson(['id'=>$response['id']]);
    }

    //test if we can update product by id
    public function test_updating_product_by_id():void
    {
        $response = $this->patch('/api/products/2', ['name' => "Carrot"]);
        $response->assertStatus(200)->assertJson(['id'=> $response['id'], 'name' => $response['name'], 'category_id' => $response['category_id'], "pricing" => $response['pricing']]);
    }

    //test if we can delete product by id
    public function test_delete_product_by_id():void
    {
        $response = $this->delete('/api/products/2');
        $response->assertStatus(200)->assertJson(['id'=>$response['id']]);

        $this->get('/api/products/2')->assertStatus(200)->assertDontSee(['id'=>$response['id']]);
    } 
}
