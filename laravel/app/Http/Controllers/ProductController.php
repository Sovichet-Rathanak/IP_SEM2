<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // --- Get /api/products
    public function getProducts(){
        return Product::all();
    }

    // --- Post /api/products
    public function createProduct(Request $request) {
        $product = new Product;
        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->pricing = $request->pricing;
        $product->save();
        return $product;    
    }

    // --- Get /api/products/{productId}
    public function getProduct($productId) {
        $product = Product::find($productId);
        return $product;   
    }    
    
    // --- Patch /api/products/{productId}
    public function updateProduct(Request $request, $productId) {
        $product = Product::find($productId);
        $product->name = $request->name;
        $product->save();
        return $product;
    }
    
    // --- Delete /api/products/{productId}
    public function deleteProduct($productId) {
        $product = Product::find($productId);
        $product->delete();
        return $product;
    }
}
