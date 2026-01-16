@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>My Dashboard</h1>
        <span class="btn btn-secondary">{{ Auth::user()->name }}</span>
    </div>

    <div class="grid-cols-2">
        <div class="card">
            <h3>New Reservation</h3>
            <p style="margin: 1rem 0; color: var(--text-muted);">Browse available resources and make a request.</p>
            <a href="{{ route('user.reservations.create') }}" class="btn btn-primary">New Reservation</a>
        </div>

        <div class="card">
            <h3>My History</h3>
            <p style="margin: 1rem 0; color: var(--text-muted);">View past and current reservation status.</p>
            <a href="{{ route('user.reservations.index') }}" class="btn btn-secondary">View Requests</a>
        </div>
    </div>
</div>
@endsection
