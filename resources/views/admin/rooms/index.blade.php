@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Server Rooms</h1>
        <a href="{{ route('admin.rooms.create') }}" class="btn btn-primary">Add New Room</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
        @foreach($rooms as $room)
            <div class="card">
                <h3>{{ $room->name }}</h3>
                <p><strong>Floor:</strong> {{ $room->floor ?? 'N/A' }}</p>
                @if($room->dimensions)
                    <p><strong>Dimensions:</strong> {{ $room->dimensions['length'] }}x{{ $room->dimensions['width'] }} units</p>
                @endif
                <p><strong>Racks:</strong> {{ $room->racks_count }}</p>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <a href="{{ route('admin.rooms.show', $room->id) }}" class="btn btn-primary" style="flex: 1; text-align: center;">View Map</a>
                    <a href="{{ route('admin.rooms.edit', $room->id) }}" class="btn btn-secondary">Edit</a>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
