@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Manage Resources</h1>
        <a href="{{ route('manager.resources.create') }}" class="btn btn-primary">Add New Resource</a>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Name</th>
                    <th style="padding: 1rem;">Category</th>
                    <th style="padding: 1rem;">Status</th>
                    <th style="padding: 1rem;">Specs</th>
                    <th style="padding: 1rem;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($resources as $resource)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; font-weight: 500;">{{ $resource->name }}</td>
                        <td style="padding: 1rem; color: var(--text-muted);">{{ $resource->category->name }}</td>
                        <td style="padding: 1rem;">
                            <span style="
                                padding: 0.25rem 0.5rem; 
                                border-radius: 9999px; 
                                font-size: 0.75rem; 
                                font-weight: 600;
                                background-color: {{ $resource->status === 'available' ? '#dcfce7' : ($resource->status === 'maintenance' ? '#fee2e2' : '#fbbf24') }};
                                color: {{ $resource->status === 'available' ? '#166534' : ($resource->status === 'maintenance' ? '#991b1b' : '#92400e') }};
                            ">
                                {{ ucfirst($resource->status) }}
                            </span>
                        </td>
                        <td style="padding: 1rem; font-size: 0.875rem;">
                            CPU: {{ $resource->specifications['cpu'] ?? 'N/A' }}<br>
                            RAM: {{ $resource->specifications['ram'] ?? 'N/A' }}
                        </td>
                        <td style="padding: 1rem;">
                            <a href="{{ route('manager.resources.edit', $resource) }}" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.875rem; margin-right: 0.5rem;">Edit</a>
                            
                            <form action="{{ route('manager.resources.destroy', $resource) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Are you sure?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" style="padding: 2rem; text-align: center; color: var(--text-muted);">No resources found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
