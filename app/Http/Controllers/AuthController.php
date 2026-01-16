<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    public function showLogin()
    {
        //return view('auth.login');
        return \Inertia\Inertia::render('AuthPage', ['initialView' => 'login']);
    }

    public function showRegister()
    {
        return \Inertia\Inertia::render('AuthPage', ['initialView' => 'signup']);
    }

    public function register(Request $request)
    {
        // 1. Validation
        $request->validate([
            'name' => 'required|string|max:100',
            'venture_name' => 'nullable|string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // 2. Création de l'utilisateur avec concaténation du nom
        $user = User::create([
            'name' => $request->name,
            'venture_name' => $request->venture_name,
            'email'=> $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2, // 2 = User role (id géré côté serveur)
        ]);
        

        // 3. Connexion automatique
        Auth::login($user);

        // 4. Log
        \App\Models\Log::create([
            'user_id' => $user->id,
            'action' => 'Register',
            'details' => 'New user account created with role_id 2',
        ]);

        // 5. Redirection
        return redirect('/dashboard');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);


        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            \App\Models\Log::create([
                'user_id' => Auth::id(),
                'action' => 'Login',
                'details' => 'User logged in successfully.',
            ]);

            // Redirect based on role
            $user = Auth::user();
            return redirect('/dashboard'); //$this->redirectBasedOnRole($user);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            \App\Models\Log::create([
                'user_id' => Auth::id(),
                'action' => 'Logout',
                'details' => 'User logged out.',
            ]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    private function redirectBasedOnRole($user)
    {
        if (!$user->role) {
            return redirect('/');
        }

        switch ($user->role->name) {
            case 'Data Center Administrator':
                return redirect()->route('admin.dashboard');
            case 'Technical Resource Manager':
                return redirect()->route('manager.dashboard');
            case 'Internal User':
                return redirect()->route('user.dashboard');
            default:
                return redirect('/');
        }
    }
}
