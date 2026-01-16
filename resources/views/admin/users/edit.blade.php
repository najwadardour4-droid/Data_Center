@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('admin.users.index') }}" style="color: var(--text-muted);">&larr; Back to Users</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">Edit User: {{ $user->name }}</h2>

        <form action="{{ route('admin.users.update', $user) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" name="name" id="name" value="{{ old('name', $user->name) }}" required>
                @error('name')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" name="email" id="email" value="{{ old('email', $user->email) }}" required>
                @error('email')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="role_id">Role</label>
                <select name="role_id" id="role_id" required>
                    @foreach($roles as $role)
                        <option value="{{ $role->id }}" {{ old('role_id', $user->role_id) == $role->id ? 'selected' : '' }}>{{ $role->name }}</option>
                    @endforeach
                </select>
                @error('role_id')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="password">New Password (leave blank to keep current)</label>
                <input type="password" name="password" id="password">
                @error('password')
                    <span style="color: var(--danger-color); font-size: 0.875rem;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="password_confirmation">Confirm New Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation">
            </div>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Update User</button>
            </div>
        </form>
    </div>
</div>
@endsection
