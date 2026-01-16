<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resource;
use App\Models\Reservation;
use Carbon\Carbon;

class TimelineController extends Controller
{
    public function index()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        // Fetch resources with their reservations for the current week
        $resources = Resource::with(['reservations' => function ($query) use ($startOfWeek, $endOfWeek) {
            $query->whereIn('status', ['approved', 'active'])
                  ->where(function ($q) use ($startOfWeek, $endOfWeek) {
                      $q->whereBetween('start_time', [$startOfWeek, $endOfWeek])
                        ->orWhereBetween('end_time', [$startOfWeek, $endOfWeek])
                        ->orWhere(function ($sub) use ($startOfWeek, $endOfWeek) {
                            $sub->where('start_time', '<', $startOfWeek)
                                ->where('end_time', '>', $endOfWeek);
                        });
                  });
        }, 'category'])->where('is_active', true)->get();

        $weekDates = [];
        for ($date = $startOfWeek->copy(); $date->lte($endOfWeek); $date->addDay()) {
            $weekDates[] = $date->copy();
        }

        return view('timeline.index', compact('resources', 'weekDates', 'startOfWeek', 'endOfWeek'));
    }
}
