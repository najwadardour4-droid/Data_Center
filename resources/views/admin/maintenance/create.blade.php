@extends('layouts.app')

@section('content')
<div class="container" style="max-width: 600px;">
    <h1>Schedule Maintenance</h1>
    
    <div class="card">
        <form action="{{ route('admin.maintenance.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="resource_id">Select Asset / Resource</label>
                <select name="resource_id" id="resource_id" class="form-control" required>
                    @foreach($resources as $resource)
                        <option value="{{ $resource->id }}" {{ (isset($selectedResource) && $selectedResource->id == $resource->id) ? 'selected' : '' }}>
                            {{ $resource->name }} ({{ $resource->serial_number ?? 'No S/N' }})
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="title">Title / Summary</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="e.g. Replace Fan Module" required>
            </div>

            <div class="form-group">
                <label for="description">Detailed Description</label>
                <textarea name="description" id="description" class="form-control" rows="4"></textarea>
            </div>

            <div class="form-group">
                <label for="scheduled_date">Scheduled Date</label>
                <input type="date" name="scheduled_date" id="scheduled_date" class="form-control" required value="{{ date('Y-m-d') }}">
            </div>

            <div style="margin-top: 1.5rem;">
                <button type="submit" class="btn btn-primary">Create Ticket</button>
                <a href="{{ route('admin.maintenance.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>
@endsection
