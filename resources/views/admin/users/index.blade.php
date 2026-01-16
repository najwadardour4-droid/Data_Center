@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Manage Users</h1>
        <a href="{{ route('admin.users.create') }}" class="btn btn-primary">Add New User</a>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Name</th>
                    <th style="padding: 1rem;">Email</th>
                    <th style="padding: 1rem;">Role</th>
                    <th style="padding: 1rem;">Joined</th>
                    <th style="padding: 1rem;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($users as $user)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; font-weight: 500;">{{ $user->name }}</td>
                        <td style="padding: 1rem; color: var(--text-muted);">{{ $user->email }}</td>
                        <td style="padding: 1rem;">
                            <span style="
                                background-color: #f1f5f9; 
                                color: var(--text-muted); 
                                padding: 0.25rem 0.5rem; 
                                border-radius: 4px; 
                                font-size: 0.75rem; 
                                font-weight: bold;
                            ">
                                {{ $user->role->name ?? 'No Role' }}
                            </span>
                        </td>
                        <td style="padding: 1rem; font-size: 0.875rem;">{{ $user->created_at->format('M d, Y') }}</td>
                        <td style="padding: 1rem;">
                            <a href="{{ route('admin.users.edit', $user) }}" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.875rem; margin-right: 0.5rem;">Edit</a>
                            
                            @if($user->id !== Auth::id())
                                <form action="{{ route('admin.users.destroy', $user) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Are you sure? This will delete all associated data (reservations, resources).');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">Delete</button>
                                </form>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" style="padding: 2rem; text-align: center; color: var(--text-muted);">No users found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
