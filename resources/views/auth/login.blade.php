@extends('layouts.app')

@section('content')
<div class="card auth-card">
    <h2 style="margin-bottom: 1.5rem; text-align: center;">Login</h2>
    
    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="form-group">
            <label for="email">Email Address</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
            @error('email')
                <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
            @enderror
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" required>
            @error('password')
                <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">
            Login
        </button>
    </form>
    
</div>
@endsection
