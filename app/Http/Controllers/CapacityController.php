<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rack;
use App\Models\Category;

class CapacityController extends Controller
{
    public function index()
    {
        $racks = Rack::with(['resources', 'sensors'])->get();
        $categories = Category::withCount('resources')->get();

        // 1. Space Capacity
        $totalU = 0;
        $usedU = 0;

        // 2. Power Capacity
        $totalPowerCap = 0;
        $usedPowerReal = 0; // From sensors

        foreach ($racks as $rack) {
            $totalU += $rack->height_u;
            $totalPowerCap += $rack->max_power_watts;

            // Space Used
            foreach ($rack->resources as $resource) {
                if ($resource->u_height) {
                    $usedU += $resource->u_height;
                }
            }

            // Power Used (Real via Sensor)
            $powerSensor = $rack->sensors->where('type', 'power')->first();
            if ($powerSensor && $powerSensor->current_value) {
                $usedPowerReal += $powerSensor->current_value;
            }
        }

        $spaceUtilization = $totalU > 0 ? round(($usedU / $totalU) * 100, 1) : 0;
        $powerUtilization = $totalPowerCap > 0 ? round(($usedPowerReal / $totalPowerCap) * 100, 1) : 0;

        return view('admin.capacity.index', compact(
            'totalU', 'usedU', 'spaceUtilization',
            'totalPowerCap', 'usedPowerReal', 'powerUtilization',
            'categories'
        ));
    }
}
