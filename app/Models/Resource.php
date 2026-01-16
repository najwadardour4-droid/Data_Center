<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use App\Models\User;
use App\Models\Reservation;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'manager_id',
        'name',
        'specifications',
        'status',
        'is_active',
        // Asset Management
        'rack_id',
        'u_position',
        'u_height',
        'model',
        'serial_number',
        'purchase_date',
        'warranty_expiry',
        'lifecycle_status'
    ];

    protected $casts = [
        'specifications' => 'array',
        'is_active' => 'boolean',
        'purchase_date' => 'date',
        'warranty_expiry' => 'date',
    ];

    public function rack()
    {
        return $this->belongsTo(Rack::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
