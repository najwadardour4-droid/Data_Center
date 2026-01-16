import React, { useMemo } from 'react';
import { UserRole } from '../../types';

interface DashboardHomeProps {
  onNavigate: (view: any) => void;
  userRole: UserRole;
  theme: 'light' | 'dark';
  auth: any;
  resources: any[];
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate, userRole, theme, auth, resources, reservations }) => {
  const isAdminOrManager = userRole === UserRole.ADMIN || userRole === UserRole.TECH_MANAGER;
  const isInternal = userRole === UserRole.INTERNAL_USER;
  
  // Calcul des statistiques optimisé
  const stats = useMemo(() => {
    if (isAdminOrManager) {
      const system = {
        pendingApprovals: 3,
        totalOperators: 12,
        available: 0,
        reserved: 0,
        maintenance: 0,
        total: resources.length
      };

      resources.forEach(res => {
        switch (res.status) {
          case 'available': system.available++; break;
          case 'reserved': system.reserved++; break;
          case 'maintenance': system.maintenance++; break;
        }
      });
      return { type: 'ADMIN', data: system };
    } else {
      const system = {
        activeLeases: 0,
        pendingRequests: 0,
        completedLeases: 0,
        rejectedRequests: 0
      }

      reservations.forEach(res => {
        switch (res.status) {
          case 'active': system.activeLeases++; break;
          case 'pending': system.pendingRequests++; break;
          case 'completed': system.completedLeases++; break;
        }
      });

      return { type: 'INTERNAL', data: system };
    }
  }, [resources, userRole]);

  const palette = {
    bright: 'bg-[#0080FF]',
    deep: 'bg-[#003366]',
    cyan: 'bg-[#00D2FF]',
    maintenance: 'bg-orange-500',
    danger: 'bg-red-600',
    neutral: 'bg-slate-700'
  };

  const StatCard = ({ label, value, subValue, icon, accentColor, onClick }: any) => (
    <div
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 flex justify-between items-start group border-l border-r border-b ${onClick ? 'cursor-pointer' : ''
        } ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`}></div>
      <div className="flex flex-col justify-between h-full p-6 pt-7">
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</div>
          <div className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </div>
        </div>
        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-4">{subValue}</div>
      </div>
      <div className="p-6 pt-7">
        <div className={`w-12 h-12 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${accentColor} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 pb-20">
      {/* Welcome Header */}
      <div>
        <h1 className={`text-5xl font-black mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Welcome, <span className="text-[#0080FF]">{auth.user.name}</span>
        </h1>
        <p className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          {isAdminOrManager ? "Global snapshot of infrastructure, nodes, and clearance." : "Summary of your personal resource allocations and history."}
        </p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.type === 'ADMIN' ? (
          <>
            <StatCard
              label="Inventory"
              value={stats.data.total}
              subValue={`${stats.data.total} total nodes`}
              accentColor={palette.bright}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            />
            <StatCard
              label="Available"
              value={stats.data.available}
              subValue="Ready for lease"
              accentColor={palette.cyan}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
            />
            <StatCard
              label="Reserved"
              value={stats.data.reserved}
              subValue="Active allocations"
              accentColor={palette.deep}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
            />
            <StatCard
              label="Maintenance"
              value={stats.data.maintenance}
              subValue="Technician required"
              accentColor={palette.maintenance}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>}
            />
            <StatCard
              label="Approvals"
              value={stats.data.pendingApprovals}
              subValue="Tasks pending"
              onClick={() => onNavigate('approvals')}
              accentColor={palette.danger}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            />
            <StatCard
              label="Operators"
              value={stats.data.totalOperators}
              subValue="Connected accounts"
              onClick={() => onNavigate('users')}
              accentColor={palette.neutral}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
          </>
        ) : (
          <>
            <StatCard
              label="Active Leases"
              value={stats.data.activeLeases}
              subValue="Authorized & Running"
              onClick={() => onNavigate('history')}
              accentColor={palette.cyan}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              label="Pending Auth"
              value={stats.data.pendingRequests}
              subValue="In Clearance Queue"
              onClick={() => onNavigate('history')}
              accentColor={palette.bright}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              label="Completed"
              value={stats.data.completedLeases}
              subValue="Full Session History"
              onClick={() => onNavigate('history')}
              accentColor={palette.deep}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
            />
          </>
        )}
      </div>

      {/* Main Module Entry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <button
          onClick={() => onNavigate(isAdminOrManager ? 'approvals' : 'manage-resources')}
          className={`group text-left p-10 border transition-all flex items-start gap-8 duration-500 border-t-4 border-t-[#0080FF] ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-[#0080FF]/40' : 'bg-white border-slate-200 hover:border-[#0080FF]/60'}`}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#0080FF] text-white shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h3 className={`text-2xl font-black mb-1 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {isAdminOrManager ? 'Clearance Queue' : 'Asset Catalog'}
            </h3>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold mb-6`}>
              {isAdminOrManager ? 'Review and authorize high-impact infrastructure requests.' : 'Browse available infrastructure and initiate new leases.'}
            </p>
            <div className="font-black text-[9px] uppercase tracking-widest group-hover:text-[#0080FF]">
              Access Module →
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate(isInternal ? 'history' : 'manage-resources')}
          className={`group text-left p-10 border transition-all flex items-start gap-8 duration-500 border-t-4 border-t-slate-700 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800'}`}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-slate-800 text-[#0080FF] shrink-0">
            {isInternal ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-black mb-1 uppercase text-white">
              {isInternal ? 'My Leases' : 'Asset Catalog'}
            </h3>
            <p className="text-slate-400 font-bold mb-6">
              {isInternal ? 'Review your current active infrastructure sessions.' : 'Monitor global infrastructure inventory.'}
            </p>
            <div className="font-black text-[9px] uppercase tracking-widest text-white/40 group-hover:text-[#0080FF]">
              Launch Module →
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};