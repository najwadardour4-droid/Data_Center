<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resource;
use App\Models\MaintenanceTicket;
use App\Models\SensorReading;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        // 1. Power Usage Trends (Simulated for last 6 months)
        $powerUsage = [
            'July' => 4500,
            'Aug' => 4700,
            'Sep' => 4600,
            'Oct' => 5100,
            'Nov' => 5300,
            'Dec' => 5500,
        ];
        $maxPower = 6000; // For Chart scaling

        // 2. Incident/Maintenance Stats
        $totalTickets = MaintenanceTicket::count();
        $completedTickets = MaintenanceTicket::where('status', 'completed')->count();
        $openTickets = MaintenanceTicket::where('status', '!=', 'completed')->count();
        $completionRate = $totalTickets > 0 ? round(($completedTickets / $totalTickets) * 100, 1) : 0;

        // 3. Asset ROI / Growth (Simulated cost accumulation)
        $assetGrowth = [
            'Q1' => 120000,
            'Q2' => 145000,
            'Q3' => 180000,
            'Q4' => 210000,
        ];
        $maxAssetVal = 250000;

        // 4. PUE Calculation (Simulated: Total Facility Power / IT Equipment Power)
        // Assuming simulated facility overhead
        $itLoad = 11000; // Watts (from Capacity)
        $coolingLoad = 4500; // Watts (Simulated)
        $lightingLoad = 500; // Watts (Simulated)
        $totalFacilityLoad = $itLoad + $coolingLoad + $lightingLoad;
        $pue = round($totalFacilityLoad / $itLoad, 2);

        return view('admin.reports.index', compact(
            'powerUsage', 'maxPower',
            'totalTickets', 'completedTickets', 'openTickets', 'completionRate',
            'assetGrowth', 'maxAssetVal',
            'pue'
        ));
    }
}
