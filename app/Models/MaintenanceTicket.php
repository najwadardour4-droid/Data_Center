<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'resource_id', 'title', 'description', 'scheduled_date', 'status', 'assigned_to'
    ];

    protected $casts = [
        'scheduled_date' => 'date',
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
    
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
