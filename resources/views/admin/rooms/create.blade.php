@extends('layouts.app')

@section('content')
<div class="container" style="max-width: 600px;">
    <h1>Add New Server Room</h1>

    <div class="card">
        <form action="{{ route('admin.rooms.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="name">Room Name</label>
                <input type="text" name="name" id="name" class="form-control" required placeholder="e.g. Server Hall A">
            </div>

            <div class="form-group">
                <label for="floor">Floor / Location</label>
                <input type="text" name="floor" id="floor" class="form-control" placeholder="e.g. Basement Level 2">
            </div>

            <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label for="length">Length (Grid Units)</label>
                    <input type="number" name="length" id="length" class="form-control" required min="1" value="20">
                </div>
                <div class="form-group" style="flex: 1;">
                    <label for="width">Width (Grid Units)</label>
                    <input type="number" name="width" id="width" class="form-control" required min="1" value="20">
                </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted);">
                1 Grid Unit approx 1 meter or 1 tile based on your preference. Used for 2D mapping.
            </p>

            <div style="margin-top: 1.5rem;">
                <button type="submit" class="btn btn-primary">Create Room</button>
                <a href="{{ route('admin.rooms.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>
@endsection
