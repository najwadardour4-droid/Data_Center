@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>System Logs</h1>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 1rem;">Timestamp</th>
                    <th style="padding: 1rem;">User</th>
                    <th style="padding: 1rem;">Action</th>
                    <th style="padding: 1rem;">Details</th>
                </tr>
            </thead>
            <tbody>
                @forelse($logs as $log)
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem; color: var(--text-muted); font-size: 0.875rem; white-space: nowrap;">
                            {{ $log->created_at->format('M d, Y H:i:s') }}
                        </td>
                        <td style="padding: 1rem; font-weight: 500;">
                            {{ $log->user->name ?? 'System' }}
                        </td>
                        <td style="padding: 1rem;">
                            <span style="
                                background-color: #f1f5f9; 
                                color: var(--text-muted); 
                                padding: 0.25rem 0.5rem; 
                                border-radius: 4px; 
                                font-size: 0.75rem; 
                                font-weight: bold;
                                text-transform: uppercase;
                            ">
                                {{ $log->action }}
                            </span>
                        </td>
                        <td style="padding: 1rem; color: var(--text-muted);">
                            {{ Str::limit($log->details, 100) }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" style="padding: 2rem; text-align: center; color: var(--text-muted);">No logs found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div style="padding: 1rem;">
            {{ $logs->links() }}
        </div>
    </div>
</div>
@endsection
