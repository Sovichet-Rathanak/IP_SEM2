<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wishlist extends Model
{
    protected $table = "wishlist";
    use SoftDeletes;
    protected $date=['deleted_at'];
    protected $fillable = ['product_id', 'customer_id'];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function customer():BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
