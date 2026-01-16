@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>My Reservations</h1>
        <a href="{{ route('user.reservations.create') }}" class="btn btn-primary">New Reservation</a>
    </div>

    <!-- Filters -->
    <div class="card" style="margin-bottom: 2rem; padding: 1rem;">
        <form action="{{ route('user.reservations.index') }}" method="GET" style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
            <div class="form-group" style="margin-bottom: 0px; flex: 1; min-width: 200px;">
                <label for="status" style="margin-bottom: 0.25rem; font-size: 0.8rem;">Status</label>
                <select name="status" id="status" style="width: 100%;">
                    <option value="">All Statuses</option>
                    @foreach(['pending', 'approved', 'rejected', 'active', 'completed', 'cancelled'] as $status)
                        <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                    @endforeach
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 0px; flex: 1; min-width: 200px;">
                <label for="resource_name" style="margin-bottom: 0.25rem; font-size: 0.8rem;">Resource Name</label>
                <input type="text" name="resource_name" id="resource_name" value="{{ request('resource_name') }}" placeholder="Search resource..." style="width: 100%;">
            </div>

            <div class="form-group" style="margin-bottom: 0px;">
                <button type="submit" class="btn btn-secondary">Filter</button>
            </div>
        </form>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Resource</th>
                    <th style="padding: 1rem;">From</th>
                    <th style="padding: 1rem;">To</th>
                    <th style="padding: 1rem;">Status</th>
                    <th style="padding: 1rem;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reservations as $reservation)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; font-weight: 500;">{{ $reservation->resource->name }}</td>
                        <td style="padding: 1rem;">{{ $reservation->start_time->format('M d, Y H:i') }}</td>
                        <td style="padding: 1rem;">{{ $reservation->end_time->format('M d, Y H:i') }}</td>
                        <td style="padding: 1rem;">
                            <span style="
                                padding: 0.25rem 0.5rem; 
                                border-radius: 9999px; 
                                font-size: 0.75rem; 
                                font-weight: 600;
                                background-color: {{ $reservation->status === 'approved' ? '#dcfce7' : ($reservation->status === 'rejected' || $reservation->status === 'cancelled' ? '#fee2e2' : ($reservation->status === 'active' ? '#dbeafe' : '#fef9c3')) }};
                                color: {{ $reservation->status === 'approved' ? '#166534' : ($reservation->status === 'rejected' || $reservation->status === 'cancelled' ? '#991b1b' : ($reservation->status === 'active' ? '#1e40af' : '#854d0e')) }};
                            ">
                                {{ ucfirst($reservation->status) }}
                            </span>
                        </td>
                        <td style="padding: 1rem;">
                            @if($reservation->status === 'pending')
                                <form action="{{ route('user.reservations.destroy', $reservation) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Cancel this request?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">Cancel</button>
                                </form>
                            @else
                                <span style="color: var(--text-muted); font-size: 0.875rem;">-</span>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" style="padding: 2rem; text-align: center; color: var(--text-muted);">No reservations found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div style="padding: 1rem;">
            {{ $reservations->withQueryString()->links() }}
        </div>
    </div>
</div>
@endsection
