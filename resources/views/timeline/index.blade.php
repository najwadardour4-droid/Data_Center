@extends('layouts.app')

@section('content')
<div class="container-fluid" style="padding: 0 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Resource Availability Timeline</h1>
        <span class="btn btn-secondary" style="cursor: default;">
            {{ $startOfWeek->format('M d') }} - {{ $endOfWeek->format('M d, Y') }}
        </span>
    </div>

    <div class="card" style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
                <tr>
                    <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--border-color); background: #f8fafc; min-width: 200px; position: sticky; left: 0; z-index: 10;">Resource</th>
                    @foreach($weekDates as $date)
                        <th style="padding: 1rem; text-align: center; border-bottom: 2px solid var(--border-color); background: #f8fafc; min-width: 120px; border-left: 1px solid var(--border-color);">
                            <div style="font-weight: bold;">{{ $date->format('D') }}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">{{ $date->format('M d') }}</div>
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @forelse($resources as $resource)
                    <tr>
                        <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); font-weight: 500; background: #fff; position: sticky; left: 0; z-index: 10;">
                            {{ $resource->name }} <br>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">{{ $resource->category->name }}</span>
                        </td>
                        @foreach($weekDates as $date)
                            <td style="padding: 0.5rem; border-bottom: 1px solid var(--border-color); border-left: 1px solid var(--border-color); vertical-align: top;">
                                @php
                                    $dayReservations = $resource->reservations->filter(function($res) use ($date) {
                                        return $res->start_time->isSameDay($date) || 
                                               $res->end_time->isSameDay($date) || 
                                               ($res->start_time->lt($date->copy()->startOfDay()) && $res->end_time->gt($date->copy()->endOfDay()));
                                    });
                                @endphp

                                @foreach($dayReservations as $res)
                                    <div style="
                                        background-color: #dbeafe; 
                                        color: #1e40af; 
                                        padding: 0.25rem 0.5rem; 
                                        border-radius: 4px; 
                                        font-size: 0.75rem; 
                                        margin-bottom: 0.25rem;
                                        border-left: 3px solid #2563eb;
                                    " title="{{ $res->start_time->format('H:i') }} - {{ $res->end_time->format('H:i') }}">
                                        <strong>{{ $res->start_time->format('H:i') }}-{{ $res->end_time->format('H:i') }}</strong><br>
                                        {{ Str::limit($res->user->name, 10) }}
                                    </div>
                                @endforeach
                            </td>
                        @endforeach
                    </tr>
                @empty
                    <tr>
                        <td colspan="8" style="padding: 2rem; text-align: center; color: var(--text-muted);">No resources found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
