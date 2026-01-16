<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Auth::user()->notifications()->orderBy('created_at', 'desc')->get();
        return view('notifications.index', compact('notifications'));
    }

    public function markAsRead(Notification $notification)
    {
        if ($notification->user_id !== Auth::id()) {
            abort(403);
        }

        $notification->update(['read_at' => now()]);

        return back()->with('success', 'Notification marked as read.');
    }
    
    public function markAllAsRead()
    {
        Auth::user()->notifications()->whereNull('read_at')->update(['read_at' => now()]);
        return back()->with('success', 'All notifications marked as read.');
    }
}
