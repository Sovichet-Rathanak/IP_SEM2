<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $date=['deleted_at'];
    use HasFactory;
    
    protected $fillable = ['name', 'category_id', 'pricing'];

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function carts():HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function wishlists():HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function order_products():HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }
}
