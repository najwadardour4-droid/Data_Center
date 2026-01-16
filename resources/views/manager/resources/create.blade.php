@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('manager.resources.index') }}" style="color: var(--text-muted);">&larr; Back to Resources</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">Add New Resource</h2>

        <form action="{{ route('manager.resources.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="category_id">Category</label>
                <select name="category_id" id="category_id" required>
                    <option value="">Select Category</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
                @error('category_id')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="name">Resource Name</label>
                <input type="text" name="name" id="name" value="{{ old('name') }}" required>
                @error('name')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <fieldset style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <legend style="padding: 0 0.5rem; font-weight: 500;">Specifications</legend>
                
                <div class="form-group">
                    <label for="cpu">CPU (Cores/Model)</label>
                    <input type="text" name="cpu" id="cpu" value="{{ old('cpu') }}">
                </div>

                <div class="form-group">
                    <label for="ram">RAM (GB)</label>
                    <input type="text" name="ram" id="ram" value="{{ old('ram') }}">
                </div>

                <div class="form-group">
                    <label for="storage">Storage</label>
                    <input type="text" name="storage" id="storage" value="{{ old('storage') }}">
                </div>
            </fieldset>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Create Resource</button>
            </div>
        </form>
    </div>
</div>
@endsection
