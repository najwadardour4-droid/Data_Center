@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>System Reports & Analytics</h1>
        <button class="btn btn-secondary" onclick="window.print()">Print Report</button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
        
        <!-- PUE Metric -->
        <div class="card" style="text-align: center;">
            <h3>PUE (Power Usage Effectiveness)</h3>
            <div style="font-size: 4rem; font-weight: bold; color: {{ $pue < 1.5 ? 'var(--success-color)' : '#dd6b20' }}; margin: 1rem 0;">
                {{ $pue }}
            </div>
            <p style="color: var(--text-muted);">
                Efficiency Rating: 
                @if($pue < 1.2) <span style="color: green; font-weight: bold;">World Class</span>
                @elseif($pue < 1.5) <span style="color: green;">Efficient</span>
                @else <span style="color: orange;">Needs Improvement</span>
                @endif
            </p>
        </div>

        <!-- Maintenance Stats -->
        <div class="card">
            <h3>Maintenance Performance</h3>
            <div style="display: flex; justify-content: space-around; margin-top: 1.5rem; text-align: center;">
                <div>
                    <span style="display: block; font-size: 2rem; font-weight: bold;">{{ $totalTickets }}</span>
                    <small style="color: var(--text-muted);">Total Tickets</small>
                </div>
                <div>
                    <span style="display: block; font-size: 2rem; font-weight: bold; color: var(--success-color);">{{ $completionRate }}%</span>
                    <small style="color: var(--text-muted);">Completion Rate</small>
                </div>
                <div>
                    <span style="display: block; font-size: 2rem; font-weight: bold; color: #dd6b20;">{{ $openTickets }}</span>
                    <small style="color: var(--text-muted);">Open</small>
                </div>
            </div>
            <div style="margin-top: 2rem; background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
                <div style="background: var(--success-color); width: {{ $completionRate }}%; height: 100%;"></div>
            </div>
        </div>

        <!-- Power Trend Chart -->
        <div class="card">
            <h3>6-Month Power Consumption (kWh)</h3>
            <div style="
                display: flex; 
                align-items: flex-end; 
                justify-content: space-between; 
                height: 200px; 
                margin-top: 2rem; 
                padding-bottom: 2rem; 
                border-bottom: 1px solid #e2e8f0; 
                position: relative;
            ">
                @foreach($powerUsage as $month => $usage)
                    @php $height = ($usage / $maxPower) * 100; @endphp
                    <div style="width: 12%; text-align: center; position: relative;">
                        <span style="
                            position: absolute; 
                            bottom: {{ $height + 5 }}%; 
                            left: 50%; 
                            transform: translateX(-50%); 
                            font-size: 0.8rem; 
                            font-weight: bold;
                        ">{{ $usage }}</span>
                        <div style="
                            height: {{ $height }}%; 
                            background: var(--info-color); 
                            border-radius: 4px 4px 0 0; 
                            transition: height 0.5s ease;
                        "></div>
                        <span style="position: absolute; bottom: -25px; left: 0; right: 0; font-size: 0.85rem; color: var(--text-muted);">{{ $month }}</span>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Asset Value Growth -->
        <div class="card">
            <h3>Quarterly Asset Value ($)</h3>
            <div style="
                display: flex; 
                align-items: flex-end; 
                justify-content: space-between; 
                height: 200px; 
                margin-top: 2rem; 
                padding-bottom: 2rem; 
                border-bottom: 1px solid #e2e8f0;
            ">
                @foreach($assetGrowth as $q => $val)
                    @php $height = ($val / $maxAssetVal) * 100; @endphp
                    <div style="width: 18%; text-align: center; position: relative;">
                         <div style="
                            height: {{ $height }}%; 
                            background: var(--primary-color); 
                            border-radius: 4px 4px 0 0;
                            opacity: 0.8;
                        "></div>
                        <span style="position: absolute; bottom: -25px; left: 0; right: 0; font-size: 0.85rem; color: var(--text-muted);">{{ $q }}</span>
                        <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 0.8rem; font-weight: bold; writing-mode: vertical-rl; text-orientation: mixed;">${{ number_format($val/1000) }}k</span>
                    </div>
                @endforeach
            </div>
        </div>

    </div>
</div>
@endsection
