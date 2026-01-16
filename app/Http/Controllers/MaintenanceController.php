<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaintenanceTicket;
use App\Models\Resource;
use Illuminate\Support\Facades\Auth;

class MaintenanceController extends Controller
{
    public function index()
    {
        $tickets = MaintenanceTicket::with(['resource', 'assignee'])->orderBy('scheduled_date', 'asc')->get();
        return view('admin.maintenance.index', compact('tickets'));
    }

    public function create(Request $request)
    {
        $resources = Resource::all();
        $selectedResource = $request->has('resource_id') ? $resources->find($request->resource_id) : null;
        return view('admin.maintenance.create', compact('resources', 'selectedResource'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'title' => 'required|string|max:255',
            'scheduled_date' => 'required|date',
        ]);

        MaintenanceTicket::create([
            'resource_id' => $request->resource_id,
            'title' => $request->title,
            'description' => $request->description,
            'scheduled_date' => $request->scheduled_date,
            'status' => 'scheduled',
            'assigned_to' => Auth::id(), // Assign to self by default
        ]);

        return redirect()->route('admin.maintenance.index')->with('success', 'Maintenance scheduled successfully.');
    }
    
    public function update(Request $request, MaintenanceTicket $ticket)
    {
        $ticket->update($request->only('status'));
        return back()->with('success', 'Ticket status updated.');
    }
}
