@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Maintenance Tickets</h1>
        <a href="{{ route('admin.maintenance.create') }}" class="btn btn-primary">Schedule Maintenance</a>
    </div>

    @if($tickets->count() > 0)
    <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Asset</th>
                    <th>Title</th>
                    <th>Scheduled Date</th>
                    <th>Assigned To</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($tickets as $ticket)
                    <tr>
                        <td>
                            @if($ticket->status == 'scheduled')
                                <span class="badge" style="background: var(--info-color); color: white;">Scheduled</span>
                            @elseif($ticket->status == 'completed')
                                <span class="badge badge-success">Completed</span>
                            @else
                                <span class="badge badge-warning">{{ ucfirst($ticket->status) }}</span>
                            @endif
                        </td>
                        <td>{{ $ticket->resource->name }}</td>
                        <td>{{ $ticket->title }}</td>
                        <td>{{ $ticket->scheduled_date ? $ticket->scheduled_date->format('M d, Y') : 'N/A' }}</td>
                        <td>{{ $ticket->assignee->name ?? 'Unassigned' }}</td>
                        <td>
                            <form action="{{ route('admin.maintenance.update', $ticket->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('PATCH')
                                <input type="hidden" name="status" value="completed">
                                <button type="submit" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.2rem 0.6rem;">Complete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @else
        <div class="card" style="text-align: center; color: var(--text-muted); padding: 3rem;">
            No maintenance tickets found.
        </div>
    @endif
</div>
@endsection
