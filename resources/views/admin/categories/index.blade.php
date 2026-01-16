@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Manage Categories</h1>
        <a href="{{ route('admin.categories.create') }}" class="btn btn-primary">Add New Category</a>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Name</th>
                    <th style="padding: 1rem;">Description</th>
                    <th style="padding: 1rem;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($categories as $category)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; font-weight: 500;">{{ $category->name }}</td>
                        <td style="padding: 1rem; color: var(--text-muted);">{{ $category->description ?? '-' }}</td>
                        <td style="padding: 1rem;">
                            <a href="{{ route('admin.categories.edit', $category) }}" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.875rem; margin-right: 0.5rem;">Edit</a>
                            
                            <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Are you sure?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" style="padding: 2rem; text-align: center; color: var(--text-muted);">No categories found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
