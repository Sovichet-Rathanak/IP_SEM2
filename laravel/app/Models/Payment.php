<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;
    protected $date=['deleted_at'];
    protected $fillable = ['payment_date', 'payment_method', 'amount', 'order_id', 'customer_id'];

    public function customer():BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function order():BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
