<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        $user = Auth::user();
        
        // Map simplified role names to DB names if needed
        // Or expects exact string match from middleware arguments
        // Current Roles in DB: 'Guest', 'Internal User', 'Technical Resource Manager', 'Data Center Administrator'
        
        // Simpler: pass simplified aliases in route like 'admin', 'manager'
        $roleMap = [
            'admin' => 'Data Center Administrator',
            'manager' => 'Technical Resource Manager',
            'user' => 'Internal User',
            'guest' => 'Guest',
        ];

        $userRoleName = $user->role->name ?? '';

        foreach ($roles as $role) {
            $expected = $roleMap[$role] ?? $role;
            if ($userRoleName === $expected) {
                return $next($request);
            }
        }

        // Redirect if unauthorized
        return redirect('/')->with('error', 'You do not have permission to access this page.');
    }
}
