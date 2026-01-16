@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Capacity Planning</h1>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
        
        <!-- Space Utilization -->
        <div class="card">
            <h3>Rack Space Utilization</h3>
            <div style="display: flex; align-items: center; justify-content: center; height: 150px; margin-top: 1rem;">
                <div style="text-align: center;">
                    <span style="font-size: 3rem; font-weight: bold; color: var(--primary-color);">{{ $spaceUtilization }}%</span>
                    <p style="color: var(--text-muted);">Occupied</p>
                </div>
            </div>
            <div style="background: #e2e8f0; border-radius: 4px; height: 20px; width: 100%; overflow: hidden;">
                <div style="background: var(--primary-color); height: 100%; width: {{ $spaceUtilization }}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem;">
                <span>Used: {{ $usedU }} U</span>
                <span>Total: {{ $totalU }} U</span>
            </div>
        </div>

        <!-- Power Utilization -->
        <div class="card">
            <h3>Power Utilization (Real-time)</h3>
            <div style="display: flex; align-items: center; justify-content: center; height: 150px; margin-top: 1rem;">
                <div style="text-align: center;">
                    <span style="font-size: 3rem; font-weight: bold; color: #ed8936;">{{ $powerUtilization }}%</span>
                    <p style="color: var(--text-muted);">Load</p>
                </div>
            </div>
            <div style="background: #e2e8f0; border-radius: 4px; height: 20px; width: 100%; overflow: hidden;">
                <div style="background: #ed8936; height: 100%; width: {{ $powerUtilization }}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem;">
                <span>Current: {{ number_format($usedPowerReal) }} W</span>
                <span>Cap: {{ number_format($totalPowerCap) }} W</span>
            </div>
        </div>

    </div>

    <!-- Asset Breakdown -->
    <div class="card" style="margin-top: 2rem;">
        <h3>Asset Breakdown by Category</h3>
        <table class="table" style="margin-top: 1rem;">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Count</th>
                    <th>% of Inventory</th>
                </tr>
            </thead>
            <tbody>
                @php $totalAssets = $categories->sum('resources_count'); @endphp
                @foreach($categories as $category)
                    <tr>
                        <td>{{ $category->name }}</td>
                        <td>{{ $category->resources_count }}</td>
                        <td>
                            @if($totalAssets > 0)
                                {{ round(($category->resources_count / $totalAssets) * 100, 1) }}%
                            @else
                                0%
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
