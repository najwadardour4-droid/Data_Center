@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Rack Management</h1>
    </div>

    @foreach($rooms as $room)
        <div class="card" style="margin-bottom: 2rem;">
            <h2>{{ $room->name }} (Floor {{ $room->floor }})</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
                @foreach($room->racks as $rack)
                    <div style="border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius); text-align: center; background: var(--bg-body);">
                        <h3 style="margin-bottom: 0.5rem;">{{ $rack->name }}</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">{{ $rack->height_u }}U | {{ $rack->max_power_watts }}W</p>
                        <a href="{{ route('admin.racks.show', $rack->id) }}" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">View Layout</a>
                    </div>
                @endforeach
            </div>
        </div>
    @endforeach
</div>
@endsection
