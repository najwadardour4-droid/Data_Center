@extends('layouts.app')

@section('content')
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Your Notifications</h1>
        
        @if($notifications->whereNull('read_at')->count() > 0)
            <form action="{{ route('notifications.markAllRead') }}" method="POST">
                @csrf
                <button type="submit" class="btn btn-secondary">Mark All as Read</button>
            </form>
        @endif
    </div>

    <div class="grid-cols-1" style="display: grid; gap: 1rem;">
        @forelse($notifications as $notification)
            <div class="card" style="
                border-left: 4px solid {{ $notification->type === 'success' ? 'var(--success-color)' : ($notification->type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)') }};
                background: {{ $notification->read_at ? 'var(--surface-color)' : '#f8fafc' }};
                opacity: {{ $notification->read_at ? '0.8' : '1' }};
            ">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 0.25rem;">
                            {{ ucfirst($notification->type) }}
                        </div>
                        <p style="color: var(--text-main);">{{ $notification->message }}</p>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">
                            {{ $notification->created_at->diffForHumans() }}
                        </div>
                    </div>

                    @if(!$notification->read_at)
                        <form action="{{ route('notifications.read', $notification) }}" method="POST">
                            @csrf
                            @method('PATCH')
                            <button type="submit" class="btn btn-sm btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Mark Read</button>
                        </form>
                    @endif
                </div>
            </div>
        @empty
            <div class="card" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                No notifications found.
            </div>
        @endforelse
    </div>
</div>
@endsection
