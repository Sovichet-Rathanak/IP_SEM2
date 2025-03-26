<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    public $timestamps = false;
    use SoftDeletes;
    protected $date=['deleted_at'];
    protected $fillable = ['name', 'email', 'address', 'phone'];

    public function carts():HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function wishlists():HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function orders():HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function payments():HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function products():HasManyThrough
    {
        return $this->hasManyThrough(Product::class, Cart::class);
    }
}
