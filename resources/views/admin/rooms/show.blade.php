@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>{{ $room->name }} <span style="font-size: 1rem; color: var(--text-muted);">({{ $room->floor }})</span></h1>
        <div>
            <a href="{{ route('admin.rooms.index') }}" class="btn btn-secondary">Back to Rooms</a>
            <a href="{{ route('admin.rooms.edit', $room->id) }}" class="btn btn-secondary">Edit Room</a>
        </div>
    </div>

    <div class="card">
        <h3>Floor Layout</h3>
        <p>Dimensions: {{ $room->dimensions['length'] }}x{{ $room->dimensions['width'] }}</p>
        
        <div style="
            display: grid; 
            grid-template-columns: repeat({{ $room->dimensions['width'] }}, 40px); 
            grid-template-rows: repeat({{ $room->dimensions['length'] }}, 40px); 
            gap: 2px; 
            margin-top: 1rem;
            overflow: auto;
            border: 1px solid #ddd;
            padding: 1rem;
            background: #f8f9fa;
        ">
            @for($y = 1; $y <= $room->dimensions['length']; $y++)
                @for($x = 1; $x <= $room->dimensions['width']; $x++)
                    @php
                        // Check if a rack exists at this coordinate
                        $rack = $room->racks->where('layout_x', $x)->where('layout_y', $y)->first();
                        
                        $statusColor = 'var(--primary-color)'; // Default (Safe)
                        $statusText = 'Normal';

                        if ($rack) {
                            // Check Sensors
                            foreach($rack->sensors as $sensor) {
                                if ($sensor->status == 'critical') {
                                    $statusColor = '#e53e3e'; // Red
                                    $statusText = 'Critical';
                                    break;
                                } elseif ($sensor->status == 'warning' && $statusColor != '#e53e3e') {
                                    $statusColor = '#dd6b20'; // Orange
                                    $statusText = 'Warning';
                                }
                            }
                        }
                    @endphp

                    <div style="
                        width: 40px; 
                        height: 40px; 
                        background: {{ $rack ? $statusColor : '#e2e8f0' }};
                        border: 1px solid #cbd5e0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.7rem;
                        color: {{ $rack ? 'white' : '#718096' }};
                        cursor: {{ $rack ? 'pointer' : 'default' }};
                        position: relative;
                        transition: all 0.2s;
                    "
                    title="X: {{ $x }}, Y: {{ $y }} {{ $rack ? '- ' . $rack->name . ' (' . $statusText . ')' : '' }}"
                    @if($rack) onclick="window.location='{{ route('admin.racks.show', $rack->id) }}'" @endif
                    >
                        @if($rack)
                            R
                        @else
                            .
                        @endif
                    </div>
                @endfor
            @endfor
        </div>
        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted); display: flex; gap: 1rem;">
            <div><span style="display: inline-block; width: 12px; height: 12px; background: var(--primary-color); margin-right: 5px;"></span> Normal</div>
            <div><span style="display: inline-block; width: 12px; height: 12px; background: #dd6b20; margin-right: 5px;"></span> Warning</div>
            <div><span style="display: inline-block; width: 12px; height: 12px; background: #e53e3e; margin-right: 5px;"></span> Critical</div>
            <div><span style="display: inline-block; width: 12px; height: 12px; background: #e2e8f0; margin-right: 5px;"></span> Empty Space</div>
        </div>
    </div>
</div>
@endsection
