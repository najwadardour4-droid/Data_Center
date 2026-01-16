<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Resource;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'resource_id',
        'start_time',
        'end_time',
        'status',
        'justification',
        'rejection_reason'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}
