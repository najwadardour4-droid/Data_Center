<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::withCount('racks')->get();
        return view('admin.rooms.index', compact('rooms'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.rooms.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'floor' => 'nullable|string|max:255',
            'length' => 'required|integer|min:1',
            'width' => 'required|integer|min:1',
        ]);

        $room = new Room();
        $room->name = $validated['name'];
        $room->floor = $validated['floor'];
        $room->dimensions = ['length' => $validated['length'], 'width' => $validated['width']];
        $room->save();

        return redirect()->route('admin.rooms.index')->with('success', 'Room created successfully.');
    }

    /**
     * Display the specified resource (Map View).
     */
    public function show(Room $room)
    {
        $room->load(['racks' => function($q) {
            $q->with('sensors'); // Load sensors for status status checks if needed
        }]);

        return view('admin.rooms.show', compact('room'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return view('admin.rooms.edit', compact('room'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'floor' => 'nullable|string|max:255',
            'length' => 'required|integer|min:1',
            'width' => 'required|integer|min:1',
        ]);

        $room->name = $validated['name'];
        $room->floor = $validated['floor'];
        $room->dimensions = ['length' => $validated['length'], 'width' => $validated['width']];
        $room->save();

        return redirect()->route('admin.rooms.index')->with('success', 'Room updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('admin.rooms.index')->with('success', 'Room deleted successfully.');
    }
}
