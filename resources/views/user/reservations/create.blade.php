@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('user.reservations.index') }}" style="color: var(--text-muted);">&larr; Back to History</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">New Reservation Request</h2>

        <form action="{{ route('user.reservations.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="resource_id">Resource</label>
                <select name="resource_id" id="resource_id" required>
                    <option value="">Select a Resource</option>
                    @foreach($resources as $resource)
                        <option value="{{ $resource->id }}" {{ (old('resource_id') == $resource->id || $selectedResourceId == $resource->id) ? 'selected' : '' }}>
                            {{ $resource->name }} ({{ $resource->category->name }})
                        </option>
                    @endforeach
                </select>
                @error('resource_id')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="grid-cols-2">
                <div class="form-group">
                    <label for="start_time">Start Time</label>
                    <input type="datetime-local" name="start_time" id="start_time" value="{{ old('start_time') }}" required>
                    @error('start_time')
                        <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="end_time">End Time</label>
                    <input type="datetime-local" name="end_time" id="end_time" value="{{ old('end_time') }}" required>
                    @error('end_time')
                        <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group">
                <label for="justification">Justification / Purpose</label>
                <textarea name="justification" id="justification" rows="3" required placeholder="Project X development, Thesis research, etc.">{{ old('justification') }}</textarea>
                @error('justification')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Submit Request</button>
            </div>
        </form>
    </div>
</div>
@endsection
