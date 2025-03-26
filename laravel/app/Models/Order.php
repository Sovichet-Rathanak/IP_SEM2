<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    protected $date=['deleted_at'];
    protected $fillable = ['order_date', 'total_price', 'customer_id'];
    
    public function payments():HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function order_product():HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

    protected function orderDate():Attribute
    {
        return Attribute::make(
            //Setter
            set:fn($value) => Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('Y-m-d H:i:s'),

            //Getter
            get:fn($value) => Carbon::parse($value)->format('d/m/Y H:i:s')
        );
    }
}