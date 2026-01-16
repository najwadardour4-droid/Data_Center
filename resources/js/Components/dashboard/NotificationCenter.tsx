
import React, { useState } from 'react';

interface NotificationCenterProps {
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose, theme }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Auth Clearance', body: 'New reservation request for AI Lab Node 4.', time: '2m ago', type: 'urgent' },
    { id: 2, title: 'System Status', body: 'HPC Cluster Alpha has finished maintenance.', time: '1h ago', type: 'info' },
    { id: 3, title: 'Identity Update', body: 'Your access has been updated to Administrator.', time: '5h ago', type: 'success' },
    { id: 4, title: 'Security Event', body: 'Failed login attempt from IP 192.168.1.1', time: '12h ago', type: 'warning' },
  ]);

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'urgent': return 'bg-red-500';
      case 'success': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      default: return 'bg-[#0080FF]';
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      {/* SHADOW REMOVED, BORDER UPDATED */}
      <div className={`absolute right-0 mt-4 w-96 rounded-none z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right transition-all border shadow-none ${
        theme === 'dark' 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-300'
      }`}>
        <div className={`p-6 border-b flex items-center justify-between transition-colors duration-500 ${
          theme === 'dark' 
            ? 'bg-slate-950 border-slate-800 text-white' 
            : 'bg-slate-50 border-slate-300 text-slate-900'
        }`}>
          <div className="flex flex-col">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Operator Alerts</h4>
            <span className="text-[8px] font-black text-slate-500 uppercase mt-0.5">{notifications.length} Active Events</span>
          </div>
          {notifications.length > 0 && (
            <button 
              onClick={clearAll}
              className={`text-[9px] font-black px-3 py-1.5 rounded-none uppercase tracking-widest transition-all ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                  : 'bg-slate-900 text-white hover:bg-[#0080FF]'
              }`}
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="max-h-[380px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div key={n.id} className={`p-6 border-b transition-all group ${
                theme === 'dark' 
                  ? 'border-slate-800 hover:bg-slate-850' 
                  : 'border-slate-100 hover:bg-slate-50'
              }`}>
                 <div className="flex gap-4">
                    <div className={`w-2 h-2 rounded-none mt-1.5 shrink-0 ${getTypeStyle(n.type)} shadow-none`}></div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <h5 className={`text-xs font-black uppercase tracking-tight group-hover:text-[#0080FF] transition-all ${
                            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                          }`}>{n.title}</h5>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</span>
                       </div>
                       <p className={`text-[11px] font-bold leading-relaxed ${
                         theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                       }`}>{n.body}</p>
                    </div>
                 </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
               <div className={`w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-4 ${
                 theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-300'
               }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Queue is clear</p>
            </div>
          )}
        </div>

        <div className={`p-4 border-t flex items-center justify-center transition-colors duration-500 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
        }`}>
           <button onClick={onClose} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-[#0080FF] transition-all">
              Close Panel
           </button>
        </div>
      </div>
    </>
  );
};
