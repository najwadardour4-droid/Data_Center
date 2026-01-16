@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Manager Dashboard</h1>
        <span class="btn btn-secondary">{{ Auth::user()->name }}</span>
    </div>

    <div class="grid-cols-3">
        <div class="card">
            <h3>Pending Requests</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--warning-color); margin: 1rem 0;">
                {{ \App\Models\Reservation::whereHas('resource', function($q) { $q->where('manager_id', Auth::id()); })->where('status', 'pending')->count() }}
            </div>
            <a href="{{ route('manager.reservations.index') }}" class="btn btn-primary" style="font-size: 0.875rem;">Review</a>
        </div>

        <div class="card">
            <h3>My Resources</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--primary-color); margin: 1rem 0;">{{ \App\Models\Resource::where('manager_id', Auth::id())->count() }}</div>
            <a href="{{ route('manager.resources.index') }}" class="btn btn-secondary" style="font-size: 0.875rem;">Manage</a>
        </div>

        <div class="card">
            <h3>Active Reservations</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--success-color); margin: 1rem 0;">0</div>
            <a href="#" class="btn btn-secondary" style="font-size: 0.875rem;">View</a>
        </div>
    </div>
</div>
@endsection
