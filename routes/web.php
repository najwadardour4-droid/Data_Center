<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;


Route::post('/dashboard-setup', function (\Illuminate\Http\Request $request) {
    // Utiliser input() est plus sûr que l'accès direct via ->view
    $targetView = $request->input('view');

    return redirect()->route('dashboard')->with('targetView', $targetView);
})->name('dashboard.setup');

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'isLoggedIn' => auth()->check()
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Main Dashboard Route
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
    // 1. Ressources et Catégories
    $query = \App\Models\Resource::with('category')->where('is_active', true);
    if ($request->has('category_id') && $request->category_id != '') {
        $query->where('category_id', $request->category_id);
    }
    $resources = $query->get();
    $categories = \App\Models\Category::all();

    // 2. Logique de Session / Rôle et RÉSERVATIONS
    $user = auth()->user();
    $reservations = [];

    if ($user) {
        // Utilisateur connecté
        $userRole = $user->role ? $user->role->name : 'Internal User';
        $reservations = \App\Models\Reservation::with('resource.category')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $authData = [
            'user' => $user,
            'role' => $userRole,
        ];
    } else {
        // LOGIQUE GUEST : Valeurs par défaut si non connecté
        $authData = [
            'user' => [
                'name' => 'Guest User',
                'email' => 'guest@datacenter.local',
                'id' => null,
            ],
            'role' => 'Guest',
        ];
    }

    return Inertia::render('DashboardPage', [
        'resources' => $resources,
        'categories' => $categories,
        'reservations' => $reservations,
        'initialView' => session('targetView', 'dashboard'), // 'dashboard' par défaut si session vide
        'auth' => $authData,
        'isLoggedIn' => auth()->check()
    ]);
})->name('dashboard');

Route::get('/timeline', [\App\Http\Controllers\TimelineController::class, 'index'])->name('timeline');

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');
});

// Authentication Routes
Route::get('/auth', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Route pour afficher le formulaire d'inscription
Route::get('/auth/signup', [AuthController::class, 'showRegister'])->name('register');

// Route pour traiter l'inscription (méthode POST)
Route::post('/register', [AuthController::class, 'register']);

// Protected Routes
Route::middleware(['auth'])->group(function () {

    // Admin Dashboard
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
        Route::resource('categories', \App\Http\Controllers\CategoryController::class);
        Route::resource('users', \App\Http\Controllers\UserController::class);
        Route::get('/logs', [\App\Http\Controllers\LogController::class, 'index'])->name('logs.index');

        // Rack Management
        Route::resource('racks', \App\Http\Controllers\RackController::class);

        // Monitoring
        Route::get('/monitoring', [\App\Http\Controllers\MonitoringController::class, 'index'])->name('monitoring.index');

        // Maintenance
        Route::get('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'index'])->name('maintenance.index');
        Route::get('/maintenance/create', [\App\Http\Controllers\MaintenanceController::class, 'create'])->name('maintenance.create');
        Route::post('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'store'])->name('maintenance.store');
        Route::patch('/maintenance/{ticket}', [\App\Http\Controllers\MaintenanceController::class, 'update'])->name('maintenance.update');

        // Capacity Planning
        Route::get('/capacity', [\App\Http\Controllers\CapacityController::class, 'index'])->name('capacity.index');

        // Rooms
        Route::resource('rooms', \App\Http\Controllers\RoomController::class);

        // Reports & Analytics
        Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');

        // Hybrid Cloud
        Route::get('/hybrid', [\App\Http\Controllers\CloudController::class, 'index'])->name('hybrid.index');
        Route::post('/hybrid/sync', [\App\Http\Controllers\CloudController::class, 'sync'])->name('hybrid.sync');
    });

    // Manager Dashboard
    Route::middleware(['role:manager'])->prefix('manager')->name('manager.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'manager'])->name('dashboard');
        Route::resource('resources', \App\Http\Controllers\ResourceController::class);

        // Manager Reservation Management
        Route::get('/reservations', [\App\Http\Controllers\ReservationController::class, 'managerIndex'])->name('reservations.index');
        Route::patch('/reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, 'updateStatus'])->name('reservations.update');
    });

    // User Dashboard
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'user'])->name('dashboard');
        Route::resource('reservations', \App\Http\Controllers\ReservationController::class)->only(['index', 'create', 'store', 'show', 'destroy']);
        Route::resource('incidents', \App\Http\Controllers\IncidentController::class)->only(['index', 'create', 'store']);
    });
});
