<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sensor;

class MonitoringController extends Controller
{
    public function index()
    {
        // 1. Fetch Sensors
        $sensors = Sensor::with(['rack', 'readings' => function($q) {
            $q->latest()->limit(1); // Latest reading
        }])->get();

        // 2. Calculate Stats
        $totalPower = 0;
        $avgTemp = 0;
        $tempCount = 0;
        $activeAlerts = 0;

        foreach ($sensors as $sensor) {
            if ($sensor->status !== 'normal') {
                $activeAlerts++;
            }
            
            if ($sensor->current_value) {
                if ($sensor->type === 'power') {
                    $totalPower += $sensor->current_value;
                } elseif ($sensor->type === 'temperature') {
                    $avgTemp += $sensor->current_value;
                    $tempCount++;
                }
            }
        }

        if ($tempCount > 0) {
            $avgTemp = round($avgTemp / $tempCount, 1);
        }

        return view('admin.monitoring.index', compact('sensors', 'totalPower', 'avgTemp', 'activeAlerts'));
    }
}
