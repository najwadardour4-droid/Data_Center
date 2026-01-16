@extends('layouts.app')

@section('content')
<div class="container" style="max-width: 600px;">
    <h1>Edit Room: {{ $room->name }}</h1>

    <div class="card">
        <form action="{{ route('admin.rooms.update', $room->id) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="form-group">
                <label for="name">Room Name</label>
                <input type="text" name="name" id="name" class="form-control" required value="{{ $room->name }}">
            </div>

            <div class="form-group">
                <label for="floor">Floor / Location</label>
                <input type="text" name="floor" id="floor" class="form-control" value="{{ $room->floor }}">
            </div>

            <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label for="length">Length (Grid Units)</label>
                    <input type="number" name="length" id="length" class="form-control" required min="1" value="{{ $room->dimensions['length'] }}">
                </div>
                <div class="form-group" style="flex: 1;">
                    <label for="width">Width (Grid Units)</label>
                    <input type="number" name="width" id="width" class="form-control" required min="1" value="{{ $room->dimensions['width'] }}">
                </div>
            </div>

            <div style="margin-top: 1.5rem;">
                <button type="submit" class="btn btn-primary">Update Room</button>
                <a href="{{ route('admin.rooms.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
        </form>

        <hr style="margin: 2rem 0; border: 0; border-top: 1px solid #e2e8f0;">

        <form action="{{ route('admin.rooms.destroy', $room->id) }}" method="POST" onsubmit="return confirm('Are you sure? This will delete all associated racks!');">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" style="width: 100%;">Delete Room</button>
        </form>
    </div>
</div>
@endsection
