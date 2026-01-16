<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloudInstance extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'provider',
        'instance_type',
        'region',
        'status',
        'cost_per_hour'
    ];
}
