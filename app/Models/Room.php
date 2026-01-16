<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'floor', 'dimensions'];

    protected $casts = [
        'dimensions' => 'array',
    ];

    public function racks()
    {
        return $this->hasMany(Rack::class);
    }
}
