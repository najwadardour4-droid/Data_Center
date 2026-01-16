@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Reported Incidents</h1>
        <a href="{{ route('user.incidents.create') }}" class="btn btn-primary">Report New Issue</a>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Date</th>
                    <th style="padding: 1rem;">Title</th>
                    <th style="padding: 1rem;">Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse($incidents as $incident)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;">{{ $incident->created_at->format('M d, Y') }}</td>
                        <td style="padding: 1rem; font-weight: 500;">{{ $incident->title }}</td>
                        <td style="padding: 1rem;">
                            <span style="
                                padding: 0.25rem 0.5rem; 
                                border-radius: 9999px; 
                                font-size: 0.75rem; 
                                font-weight: 600;
                                background-color: {{ $incident->status === 'open' ? '#fee2e2' : ($incident->status === 'resolved' ? '#dcfce7' : '#fef9c3') }};
                                color: {{ $incident->status === 'open' ? '#991b1b' : ($incident->status === 'resolved' ? '#166534' : '#854d0e') }};
                            ">
                                {{ ucfirst($incident->status) }}
                            </span>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" style="padding: 2rem; text-align: center; color: var(--text-muted);">No incidents reported.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
