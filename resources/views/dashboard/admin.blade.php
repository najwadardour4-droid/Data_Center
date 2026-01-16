@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Admin Dashboard</h1>
        <span class="btn btn-secondary">{{ Auth::user()->name }}</span>
    </div>

    <div class="grid-cols-2">
        <div class="card">
            <h3>Overview</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem;">
                <div style="text-align: center; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">{{ \App\Models\User::count() }}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">Users</div>
                </div>
                <div style="text-align: center; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">{{ \App\Models\Resource::count() }}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">Resources</div>
                </div>
                <div style="text-align: center; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">{{ \App\Models\Category::count() }}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">Categories</div>
                </div>
                <div style="text-align: center; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">{{ \App\Models\Reservation::count() }}</div>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">Reservations</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Quick Actions</h3>
            <ul style="margin-top: 1rem;">
                <li style="margin-bottom: 0.5rem;"><a href="{{ route('admin.users.index') }}">Manage Users</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="{{ route('admin.categories.index') }}">Manage Resource Categories</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="{{ route('admin.logs.index') }}">System Logs</a></li>
            </ul>
        </div>
    </div>
</div>
@endsection
