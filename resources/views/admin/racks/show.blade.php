@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <h1 style="margin-bottom: 0.5rem;">{{ $rack->name }}</h1>
            <p style="color: var(--text-muted);">{{ $rack->room->name }} | {{ $rack->height_u }}U | {{ $rack->max_power_watts }}W Max</p>
        </div>
        <a href="{{ route('admin.racks.index') }}" class="btn btn-secondary">Back to Racks</a>
    </div>

    <div style="display: flex; gap: 2rem; align-items: flex-start;">
        <!-- Rack Visual -->
        <div style="width: 300px; background: #2d3748; padding: 10px; border-radius: 8px; border: 2px solid #4a5568;">
            @foreach($slots as $u => $data)
                <div style="
                    height: 30px; 
                    border-bottom: 1px solid #4a5568; 
                    display: flex; 
                    align-items: center; 
                    position: relative;
                    background: {{ $data ? '#4299e1' : 'transparent' }};
                    color: white;
                ">
                    <span style="
                        width: 30px; 
                        text-align: center; 
                        border-right: 1px solid #4a5568; 
                        font-size: 0.8rem; 
                        color: #a0aec0;
                        margin-right: 10px;
                    ">{{ $u }}</span>
                    
                    @if($data && $data['is_start'])
                        <span style="font-size: 0.85rem; padding-left: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            {{ $data['resource']->name }}
                        </span>
                    @elseif(!$data)
                        <span style="color: #4a5568; font-size: 0.8rem; font-style: italic;">Empty</span>
                    @endif
                </div>
            @endforeach
        </div>

        <!-- Asset Details Side Panel -->
        <div class="card" style="flex: 1;">
            <h3>Installed Assets</h3>
            <table class="table" style="margin-top: 1rem;">
                <thead>
                    <tr>
                        <th>U-Pos</th>
                        <th>Device</th>
                        <th>Model</th>
                        <th>Serial</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($rack->resources as $resource)
                        @if($resource->u_position)
                            <tr>
                                <td>{{ $resource->u_position }} - {{ $resource->u_position + $resource->u_height - 1 }}</td>
                                <td>{{ $resource->name }}</td>
                                <td>{{ $resource->model ?? 'N/A' }}</td>
                                <td>{{ $resource->serial_number ?? 'N/A' }}</td>
                                <td>
                                    <a href="{{ route('manager.resources.show', $resource->id) }}" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;">Details</a>
                                </td>
                            </tr>
                        @endif
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
