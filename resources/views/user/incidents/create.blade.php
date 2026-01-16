@extends('layouts.app')

@section('content')
<div class="container">
    <div style="margin-bottom: 2rem;">
        <a href="{{ route('user.incidents.index') }}" style="color: var(--text-muted);">&larr; Back to Incidents</a>
    </div>

    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h2 style="margin-bottom: 1.5rem;">Report Technical Incident</h2>

        <form action="{{ route('user.incidents.store') }}" method="POST">
            @csrf
            
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" placeholder="e.g. Server unreachable, Login issue" required>
            </div>

            <div class="form-group">
                <label for="description">Detailed Description</label>
                <textarea name="description" id="description" rows="5" required></textarea>
            </div>

            <div style="text-align: right;">
                <button type="submit" class="btn btn-primary">Submit Report</button>
            </div>
        </form>
    </div>
</div>
@endsection
