import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../BrandLogo';
import { NotificationCenter } from './NotificationCenter';
import { UserRole } from '../../types';
import { router } from '@inertiajs/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: any) => void;
  userName: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentView,
  setView,
  userName,
  userEmail,
  userRole,
  setUserRole,
  theme,
  toggleTheme
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Utilisation directe de l'enum pour les vérifications de permissions
  const isAdminOrManager = userRole === UserRole.ADMIN || userRole === UserRole.TECH_MANAGER;
  const isGuest = userRole === UserRole.GUEST;

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const onLogout = () => {
    router.post('/logout');
  };

  // Liste de navigation mise à jour avec les valeurs de l'Enum
  const allNavItems = [
    {
      id: 'dashboard', label: 'Dashboard', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER, UserRole.INTERNAL_USER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      )
    },
    {
      id: 'approvals', label: 'Approvals', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      id: 'manage-resources', label: 'Asset Catalog', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER, UserRole.INTERNAL_USER, UserRole.GUEST], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
      )
    },
    {
      id: 'history', label: 'My Bookings', roles: [UserRole.INTERNAL_USER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      id: 'users', label: 'User Hub', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      )
    },
    {
      id: 'categories', label: 'Categories', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
      )
    },
    {
      id: 'logs', label: 'Audit Trail', roles: [UserRole.ADMIN], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      )
    },
    {
      id: 'settings', label: 'My Account', roles: [UserRole.ADMIN, UserRole.TECH_MANAGER, UserRole.INTERNAL_USER], icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      )
    },
  ];

  // Filtrage intelligent basé sur l'enum
  const filteredNavItems = allNavItems.filter(item => item.roles.includes(userRole));
  const activeId = currentView.includes('resource') || currentView === 'new-reservation' ? 'manage-resources' : currentView;

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-[#fcfcfc] text-slate-900'}`}>

      {/* Sidebar */}
      <aside className={`w-64 border-r hidden md:flex flex-col relative z-20 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-8">
          <BrandLogo size="sm" dark={theme === 'dark'} />

          {!isGuest && (
            <div className={`mt-6 px-3 py-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Access Level</div>
              {/* On affiche la valeur de l'enum (le label lisible) */}
              <div className="text-[10px] font-black text-[#0080FF] uppercase tracking-wider">{userRole}</div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeId === item.id
                ? 'bg-[#0080FF] text-white shadow-sm'
                : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                }`}
            >
              <div className={activeId === item.id ? 'text-white' : 'text-[#0080FF]/70'}>
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`p-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'text-slate-500 hover:bg-red-950/30 hover:text-red-500' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className={`h-20 border-b flex flex-shrink-0 items-center justify-between px-10 relative z-30 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>

          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900'}`}>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Debug Role</span>
              <select
                value={userRole}
                onChange={(e) => {
                  const r = e.target.value as UserRole;
                  setUserRole(r);
                  setView('dashboard');
                }}
                className="bg-transparent text-[10px] font-black text-[#0080FF] outline-none cursor-pointer uppercase tracking-widest"
              >
                <option value={UserRole.GUEST}>Guest</option>
                <option value={UserRole.INTERNAL_USER}>Internal User</option>
                <option value={UserRole.TECH_MANAGER}>Manager</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${theme === 'dark'
                ? 'bg-slate-950 border-slate-800 text-[#0080FF] hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
              )}
            </button>

            {/* Notification center */}
            {!isGuest && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2.5 rounded-xl border transition-all relative ${showNotifications ? 'bg-[#0080FF]/10 border-[#0080FF]' : (theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900')}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                </button>
                {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} theme={theme} />}
              </div>
            )}

            <div className={`h-8 w-[1px] hidden sm:block ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end leading-none hidden sm:flex">
                <span className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{userName}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">{userEmail}</span>
              </div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${theme === 'dark' ? 'bg-[#0080FF] text-white' : 'bg-slate-900 text-white'}`}>
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        <div ref={scrollContainerRef} id="scroll_container" className="flex-1 p-10 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};