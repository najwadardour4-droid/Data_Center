<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Statistiques pour la page d'accueil
        $totalResources = Resource::count();
        $activeReservations = Reservation::where('status', 'active')->count();
        $utilizationRate = $this->calculateUtilizationRate();
        
        return view('home.index', compact(
            'totalResources',
            'activeReservations',
            'utilizationRate'
        ));
    }
    
    private function calculateUtilizationRate()
    {
        $total = Resource::count();
        $reserved = Resource::whereHas('reservations', function($q) {
            $q->where('status', 'active');
        })->count();
        
        return $total > 0 ? round(($reserved / $total) * 100) . '%' : '0%';
    }
}