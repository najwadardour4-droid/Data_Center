<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with('resource')->where('user_id', Auth::id());

        // --- Garde ta logique de filtrage actuelle ---
        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        if ($request->has('resource_name') && $request->resource_name != '') {
            $query->whereHas('resource', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->resource_name . '%');
            });
        }

        $sort = $request->get('sort', 'created_at');
        $query->orderBy($sort, 'desc');

        // 2. Utilise la pagination ou get()
        $reservations = $query->paginate(10);

        // 3. CHANGE CECI : Renvoie vers ton composant React
        return \Inertia\Inertia::render('MyReservations', [
            'reservations' => $reservations,
            'filters' => $request->all(['status', 'resource_name', 'sort']) // Pour garder les filtres actifs dans l'UI
        ]);
    }

    public function create(Request $request)
    {
        $resources = Resource::where('status', 'available')
            ->where('is_active', true)
            ->get();

        return \Inertia\Inertia::render('ReservationForm', [
            'resources' => $resources,
            'selectedResourceId' => $request->query('resource_id')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'justification' => 'required|string|max:1000',
        ]);

        $resource = Resource::findOrFail($request->resource_id);

        // 1. Check if resource is available (status check)
        if ($resource->status !== 'available') {
            return back()->withInput()->with('error', 'This resource is currently not available (Maintenance or Reserved manually).');
        }

        // 2. Conflict Check
        // A conflict exists if (StartA < EndB) and (EndA > StartB)
        $start = Carbon::parse($request->start_time);
        $end = Carbon::parse($request->end_time);

        $conflicts = Reservation::where('resource_id', $resource->id)
            ->whereIn('status', ['approved', 'active', 'pending']) // Pending also blocks to prevent race conditions or overbooking
            ->where(function ($query) use ($start, $end) {
                $query->where(function ($q) use ($start, $end) {
                    $q->where('start_time', '<', $end)
                        ->where('end_time', '>', $start);
                });
            })
            ->exists();

        if ($conflicts) {
            // Avec Inertia, les erreurs retournées ici arrivent dans 'errors' du useForm
            return back()->withErrors(['error' => 'The selected period conflicts with an existing reservation.']);
        }

        // Create Reservation
        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'resource_id' => $request->resource_id,
            'start_time' => $start,
            'end_time' => $end,
            'status' => 'pending',
            'justification' => $request->justification,
        ]);

        \App\Models\Log::create([
            'user_id' => Auth::id(),
            'action' => 'Reservation Created',
            'details' => "Reservation #{$reservation->id} created for resource: {$resource->name}",
        ]);

        return back()->with('success', 'Reservation created');;
    }

    public function show(Reservation $reservation)
    {
        $this->authorize('view', $reservation);
        return view('user.reservations.show', compact('reservation'));
    }

    /**
     * Cancel the reservation user side.
     */
    public function destroy(Reservation $reservation)
    {
        if (Auth::id() !== $reservation->user_id) {
            abort(403);
        }

        // Protection contre l'annulation de réservations déjà traitées
        if ($reservation->status === 'active' || $reservation->status === 'completed') {
            return back()->with('error', 'Cannot cancel active or completed reservations.');
        }

        // On change le statut
        $reservation->update(['status' => 'cancelled']);

        // --- IMPORTANT POUR INERTIA ---
        // Reste sur la page actuelle pour que React reçoive les nouvelles props
        return back()->with('success', 'Reservation cancelled.');
    }

    // Manager Methods

    public function managerIndex()
    {
        // Get reservations for resources managed by the current user
        $managerId = Auth::id();
        $reservations = Reservation::whereHas('resource', function ($query) use ($managerId) {
            $query->where('manager_id', $managerId);
        })->with(['user', 'resource'])->orderBy('start_time', 'asc')->get();

        return view('manager.reservations.index', compact('reservations'));
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        // Verify manager owns the resource
        if ($reservation->resource->manager_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:approved,rejected,active,completed,cancelled',
            'rejection_reason' => 'required_if:status,rejected|nullable|string',
        ]);

        // If approving, check for conflicts AGAIN to be safe
        if ($request->status === 'approved') {
            $start = $reservation->start_time;
            $end = $reservation->end_time;

            $conflicts = Reservation::where('resource_id', $reservation->resource_id)
                ->where('id', '!=', $reservation->id)
                ->whereIn('status', ['approved', 'active'])
                ->where(function ($query) use ($start, $end) {
                    $query->where(function ($q) use ($start, $end) {
                        $q->where('start_time', '<', $end)
                            ->where('end_time', '>', $start);
                    });
                })
                ->exists();

            if ($conflicts) {
                return back()->with('error', 'Cannot approve. Conflict detected with another approved reservation.');
            }
        }

        $reservation->update([
            'status' => $request->status,
            'rejection_reason' => $request->rejection_reason,
        ]);

        \App\Models\Log::create([
            'user_id' => Auth::id(),
            'action' => 'Reservation Updated',
            'details' => "Reservation #{$reservation->id} status updated to {$request->status} by manager.",
        ]);

        // Notify User
        \App\Models\Notification::create([
            'user_id' => $reservation->user_id,
            'type' => $request->status === 'approved' ? 'success' : ($request->status === 'rejected' ? 'error' : 'info'),
            'message' => "Your reservation for {$reservation->resource->name} has been " . ucfirst($request->status) . ($request->status === 'rejected' ? ". Reason: {$request->rejection_reason}" : "."),
        ]);

        return redirect()->back()->with('success', 'Reservation status updated to ' . ucfirst($request->status));
    }
}
