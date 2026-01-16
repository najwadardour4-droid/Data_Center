@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('manager.resources.index') }}" style="color: var(--text-muted);">&larr; Back to Resources</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">Edit Resource</h2>

        <form action="{{ route('manager.resources.update', $resource) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="form-group">
                <label for="category_id">Category</label>
                <select name="category_id" id="category_id" required>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $resource->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="name">Resource Name</label>
                <input type="text" name="name" id="name" value="{{ old('name', $resource->name) }}" required>
            </div>

            <div class="form-group">
                <label for="status">Status</label>
                <select name="status" id="status" required>
                    <option value="available" {{ $resource->status == 'available' ? 'selected' : '' }}>Available</option>
                    <option value="maintenance" {{ $resource->status == 'maintenance' ? 'selected' : '' }}>Maintenance</option>
                    <option value="reserved" {{ $resource->status == 'reserved' ? 'selected' : '' }}>Reserved (Manual)</option>
                </select>
            </div>

             <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" name="is_active" id="is_active" value="1" {{ $resource->is_active ? 'checked' : '' }} style="width: auto;">
                <label for="is_active" style="margin-bottom: 0;">Active (Visible to users)</label>
            </div>

            <fieldset style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <legend style="padding: 0 0.5rem; font-weight: 500;">Specifications</legend>
                
                <div class="form-group">
                    <label for="cpu">CPU</label>
                    <input type="text" name="cpu" id="cpu" value="{{ old('cpu', $resource->specifications['cpu'] ?? '') }}">
                </div>

                <div class="form-group">
                    <label for="ram">RAM</label>
                    <input type="text" name="ram" id="ram" value="{{ old('ram', $resource->specifications['ram'] ?? '') }}">
                </div>

                <div class="form-group">
                    <label for="storage">Storage</label>
                    <input type="text" name="storage" id="storage" value="{{ old('storage', $resource->specifications['storage'] ?? '') }}">
                </div>
            </fieldset>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Update Resource</button>
            </div>
        </form>
    </div>
</div>
@endsection
