@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('admin.categories.index') }}" style="color: var(--text-muted);">&larr; Back to Categories</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">Edit Category</h2>

        <form action="{{ route('admin.categories.update', $category) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="{{ old('name', $category->name) }}" required>
                @error('name')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="4">{{ old('description', $category->description) }}</textarea>
                @error('description')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Update Category</button>
            </div>
        </form>
    </div>
</div>
@endsection
