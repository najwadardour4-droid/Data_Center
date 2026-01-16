<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory;

    protected $fillable = ['resource_id', 'rack_id', 'type', 'name', 'unit', 'current_value', 'status'];

    public function readings()
    {
        return $this->hasMany(SensorReading::class);
    }
    
    public function rack()
    {
        return $this->belongsTo(Rack::class);
    }
}
