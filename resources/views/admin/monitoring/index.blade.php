@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Infrastructure Monitoring</h1>
        <span style="font-size: 0.9rem; color: var(--text-muted);"><span style="color: #48bb78;">●</span> Systems Operational</span>
    </div>

    <!-- Stats Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="card" style="border-left: 4px solid var(--primary-color);">
            <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Avg Temperature</h3>
            <p style="font-size: 2rem; font-weight: bold; margin: 0.5rem 0;">{{ $avgTemp }}°C</p>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Target: 22-26°C</p>
        </div>

        <div class="card" style="border-left: 4px solid #ed8936;">
            <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Total Power Usage</h3>
            <p style="font-size: 2rem; font-weight: bold; margin: 0.5rem 0;">{{ number_format($totalPower, 0) }} W</p>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Capacity: 50,000 W</p>
        </div>

        <div class="card" style="border-left: 4px solid var(--danger-color);">
            <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Active Alerts</h3>
            <p style="font-size: 2rem; font-weight: bold; margin: 0.5rem 0; color: {{ $activeAlerts > 0 ? 'var(--danger-color)' : 'inherit' }}">{{ $activeAlerts }}</p>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Critical / Warning</p>
        </div>
    </div>

    <!-- Sensors List -->
    <div class="card">
        <h3>Real-time Sensors</h3>
        
        <table class="table" style="margin-top: 1.5rem;">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Sensor Name</th>
                    <th>Type</th>
                    <th>Rack</th>
                    <th>Value</th>
                    <th>Last Update</th>
                </tr>
            </thead>
            <tbody>
                @foreach($sensors as $sensor)
                    <tr>
                        <td>
                            @if($sensor->status == 'normal')
                                <span class="badge badge-success">Normal</span>
                            @elseif($sensor->status == 'warning')
                                <span class="badge badge-warning">Warning</span>
                            @else
                                <span class="badge badge-error">Critical</span>
                            @endif
                        </td>
                        <td style="font-weight: 500;">{{ $sensor->name }}</td>
                        <td style="text-transform: capitalize;">{{ $sensor->type }}</td>
                        <td>{{ $sensor->rack->name ?? 'N/A' }}</td>
                        <td style="font-family: monospace; font-size: 1rem;">
                            {{ $sensor->current_value }} <span style="color: var(--text-muted);">{{ $sensor->unit }}</span>
                        </td>
                        <td style="color: var(--text-muted); font-size: 0.85rem;">
                            {{ $sensor->readings->first() ? $sensor->readings->first()->recorded_at->diffForHumans() : 'N/A' }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
