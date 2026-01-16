<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CloudInstance;
use App\Models\Rack;
use App\Models\SensorReading;

class CloudController extends Controller
{
    /**
     * Display the Hybrid Dashboard.
     */
    public function index()
    {
        // Cloud Data
        $instances = CloudInstance::all();
        $awsCount = $instances->where('provider', 'AWS')->count();
        $azureCount = $instances->where('provider', 'Azure')->count();
        $gcpCount = $instances->where('provider', 'GCP')->count();
        
        $totalCloudCostPerHour = $instances->where('status', 'Running')->sum('cost_per_hour');
        $estimatedMonthlyCloudCost = $totalCloudCostPerHour * 24 * 30;

        // On-Premise Data Summary
        $totalRacks = Rack::count();
        $totalPowerUsage = SensorReading::whereHas('sensor', function($q) {
            $q->where('type', 'power');
        })->latest()->take(10)->avg('value'); // Simplified average of recent readings
        
        // If no readings, simulate a value
        if (!$totalPowerUsage) {
            $totalPowerUsage = 4500; 
        }

        return view('admin.hybrid.index', compact(
            'instances', 
            'awsCount', 'azureCount', 'gcpCount', 
            'estimatedMonthlyCloudCost',
            'totalRacks', 'totalPowerUsage'
        ));
    }

    /**
     * Simulate a Sync with Cloud APIs.
     * Randomly toggles status of an instance to demonstrate dynamism.
     */
    public function sync()
    {
        // Simulation: Pick a random instance and toggle its status
        $instance = CloudInstance::inRandomOrder()->first();
        if ($instance) {
            $instance->status = $instance->status === 'Running' ? 'Stopped' : 'Running';
            $instance->save();
        }

        return redirect()->route('admin.hybrid.index')->with('success', 'Cloud Resources Synced Successfully. Updates applied.');
    }
}
