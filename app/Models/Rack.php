<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rack extends Model
{
    use HasFactory;

    protected $fillable = ['room_id', 'name', 'height_u', 'max_power_watts', 'layout_x', 'layout_y'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function sensors()
    {
        return $this->hasMany(Sensor::class);
    }
}
