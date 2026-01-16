@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Manage Reservations</h1>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Resource</th>
                    <th style="padding: 1rem;">User</th>
                    <th style="padding: 1rem;">Dates</th>
                    <th style="padding: 1rem;">Justification</th>
                    <th style="padding: 1rem;">Status</th>
                    <th style="padding: 1rem;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reservations as $reservation)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; font-weight: 500;">
                            {{ $reservation->resource->name }}<br>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">{{ $reservation->resource->category->name }}</span>
                        </td>
                        <td style="padding: 1rem;">
                            {{ $reservation->user->name }}<br>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">{{ $reservation->user->email }}</span>
                        </td>
                        <td style="padding: 1rem;">
                            From: {{ $reservation->start_time->format('M d, H:i') }}<br>
                            To: {{ $reservation->end_time->format('M d, H:i') }}
                        </td>
                        <td style="padding: 1rem; max-width: 200px; font-size: 0.875rem;">{{ $reservation->justification }}</td>
                        <td style="padding: 1rem;">
                            <span style="
                                padding: 0.25rem 0.5rem; 
                                border-radius: 9999px; 
                                font-size: 0.75rem; 
                                font-weight: 600;
                                background-color: {{ $reservation->status === 'approved' ? '#dcfce7' : ($reservation->status === 'rejected' ? '#fee2e2' : ($reservation->status === 'pending' ? '#fef9c3' : '#e2e8f0')) }};
                                color: {{ $reservation->status === 'approved' ? '#166534' : ($reservation->status === 'rejected' ? '#991b1b' : ($reservation->status === 'pending' ? '#854d0e' : '#475569')) }};
                            ">
                                {{ ucfirst($reservation->status) }}
                            </span>
                        </td>
                        <td style="padding: 1rem;">
                            @if($reservation->status === 'pending')
                                <div style="display: flex; gap: 0.5rem;">
                                    <form action="{{ route('manager.reservations.update', $reservation) }}" method="POST">
                                        @csrf
                                        @method('PATCH')
                                        <input type="hidden" name="status" value="approved">
                                        <button type="submit" class="btn btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Approve</button>
                                    </form>

                                    <form action="{{ route('manager.reservations.update', $reservation) }}" method="POST" onsubmit="
                                        const reason = prompt('Please enter rejection reason:');
                                        if(!reason) return false;
                                        this.querySelector('[name=rejection_reason]').value = reason;
                                    ">
                                        @csrf
                                        @method('PATCH')
                                        <input type="hidden" name="status" value="rejected">
                                        <input type="hidden" name="rejection_reason" value="">
                                        <button type="submit" class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Reject</button>
                                    </form>
                                </div>
                            @else
                                <span style="font-size: 0.875rem; color: var(--text-muted);">{{ ucfirst($reservation->status) }}</span>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" style="padding: 2rem; text-align: center; color: var(--text-muted);">No reservations found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
