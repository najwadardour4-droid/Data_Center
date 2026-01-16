<nav style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 1rem 2rem; box-shadow: 0 2px 20px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <a href="{{ route('home') }}" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem; font-weight: 700; color: #667eea; text-decoration: none;">
            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                🖥️
            </div>
            DCIM
        </a>
        
        <div style="display: flex; gap: 2rem; align-items: center;">
            <a href="{{ route('home') }}" style="color: #4a5568; text-decoration: none; font-weight: 500;">Resources</a>
            <a href="{{ route('timeline') }}" style="color: #4a5568; text-decoration: none; font-weight: 500;">Timeline</a>
            
            @guest
                <a href="{{ route('login') }}" style="background: #667eea; color: white; padding: 0.6rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">Login</a>
            @else
                @if(auth()->user()->role === 'admin')
                    <a href="{{ route('admin.dashboard') }}" style="color: #4a5568; text-decoration: none; font-weight: 500;">Dashboard</a>
                @elseif(auth()->user()->role === 'manager')
                    <a href="{{ route('manager.dashboard') }}" style="color: #4a5568; text-decoration: none; font-weight: 500;">Dashboard</a>
                @else
                    <a href="{{ route('user.dashboard') }}" style="color: #4a5568; text-decoration: none; font-weight: 500;">Dashboard</a>
                @endif
                
                <a href="{{ route('notifications.index') }}" style="color: #4a5568; text-decoration: none; font-weight: 500; position: relative;">
                    🔔
                    @if(auth()->user()->unreadNotifications->count() > 0)
                        <span style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center;">
                            {{ auth()->user()->unreadNotifications->count() }}
                        </span>
                    @endif
                </a>
                
                <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                    @csrf
                    <button type="submit" style="background: transparent; border: none; color: #4a5568; font-weight: 500; cursor: pointer; font-family: inherit; font-size: inherit;">Logout</button>
                </form>
            @endguest
        </div>
    </div>
</nav>