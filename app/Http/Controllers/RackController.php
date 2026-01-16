<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rack;
use App\Models\Room;

class RackController extends Controller
{
    public function index()
    {
        $rooms = Room::with('racks')->get();
        return view('admin.racks.index', compact('rooms'));
    }

    public function show(Rack $rack)
    {
        // Load resources with asset info
        $rack->load(['resources' => function($q) {
            $q->whereNotNull('u_position')->orderBy('u_position', 'desc');
        }]);

        // Build a map of U-position -> Resource
        $slots = [];
        for ($i = 1; $i <= $rack->height_u; $i++) {
            $slots[$i] = null;
        }

        foreach ($rack->resources as $resource) {
            // Mark all slots covered by this resource (e.g. 2U server at pos 12 covers 12 and 13)
            for ($k = 0; $k < $resource->u_height; $k++) {
                $pos = $resource->u_position + $k;
                if ($pos <= $rack->height_u) {
                    $slots[$pos] = [
                        'resource' => $resource,
                        'is_start' => ($k === 0) // Only render the block content at the start position
                    ];
                }
            }
        }
        
        // Reverse slots for display (Top (42) to Bottom (1))
        krsort($slots);

        return view('admin.racks.show', compact('rack', 'slots'));
    }
}
