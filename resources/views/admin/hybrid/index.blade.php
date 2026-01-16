@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Hybrid Infrastructure Dashboard</h1>
        <form action="{{ route('admin.hybrid.sync') }}" method="POST">
            @csrf
            <button type="submit" class="btn btn-primary">
                <span class="icon">↻</span> Sync Cloud Resources
            </button>
        </form>
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <!-- Top Stats Row -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- On-Prem Summary -->
        <div class="card" style="border-left: 5px solid var(--primary-color);">
            <h3>On-Premise Status</h3>
            <div style="margin-top: 1rem;">
                <p><strong>Total Racks:</strong> {{ $totalRacks }}</p>
                <p><strong>Current Power Load:</strong> {{ number_format($totalPowerUsage) }} W</p>
                <p><strong>Health:</strong> <span style="color: var(--success-color); font-weight: bold;">Stable</span></p>
            </div>
        </div>

        <!-- Cloud Direct Costs -->
        <div class="card" style="border-left: 5px solid #805ad5;">
            <h3>Est. Cloud Cost (Monthly)</h3>
            <div style="margin-top: 1rem; font-size: 2.5rem; font-weight: bold; color: #805ad5;">
                ${{ number_format($estimatedMonthlyCloudCost, 2) }}
            </div>
            <p style="color: var(--text-muted);">Based on currently running instances</p>
        </div>

        <!-- Provider Breakdown -->
        <div class="card">
            <h3>Provider Distribution</h3>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                <div style="text-align: center;">
                    <div style="font-weight: bold; font-size: 1.2rem;">{{ $awsCount }}</div>
                    <small>AWS</small>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: bold; font-size: 1.2rem;">{{ $azureCount }}</div>
                    <small>Azure</small>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: bold; font-size: 1.2rem;">{{ $gcpCount }}</div>
                    <small>GCP</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Instance List -->
    <div class="card">
        <h3>Connected Cloud Instances</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
            <thead>
                <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                    <th style="padding: 12px; text-align: left;">Name</th>
                    <th style="padding: 12px; text-align: left;">Provider</th>
                    <th style="padding: 12px; text-align: left;">Type</th>
                    <th style="padding: 12px; text-align: left;">Region</th>
                    <th style="padding: 12px; text-align: left;">Status</th>
                    <th style="padding: 12px; text-align: right;">Cost/Hr</th>
                </tr>
            </thead>
            <tbody>
                @foreach($instances as $instance)
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 12px; font-weight: 500;">{{ $instance->name }}</td>
                    <td style="padding: 12px;">
                        <span style="
                            padding: 4px 8px; 
                            border-radius: 4px; 
                            font-size: 0.8rem;
                            font-weight: bold;
                            color: white;
                            background-color: 
                                {{ $instance->provider == 'AWS' ? '#FF9900' : 
                                   ($instance->provider == 'Azure' ? '#007FFF' : '#34A853') }};
                        ">
                            {{ $instance->provider }}
                        </span>
                    </td>
                    <td style="padding: 12px;">{{ $instance->instance_type }}</td>
                    <td style="padding: 12px;">{{ $instance->region }}</td>
                    <td style="padding: 12px;">
                        @if($instance->status == 'Running')
                            <span style="color: var(--success-color);">● Running</span>
                        @else
                            <span style="color: var(--danger-color);">● Stopped</span>
                        @endif
                    </td>
                    <td style="padding: 12px; text-align: right;">${{ number_format($instance->cost_per_hour, 4) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
