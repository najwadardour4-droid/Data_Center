import React, { useState, useRef, useEffect, useMemo } from 'react';

interface ReservationEntry {
  id: number;
  resource: string;
  categoryName: string;
  from: string;
  to: string;
  status: string;
  justification: string;
}

interface ReservationHistoryProps {
  reservations: any[];
  onNew: () => void;
  theme: 'light' | 'dark';
}

export const ReservationHistory: React.FC<ReservationHistoryProps> = ({ reservations, onNew, theme }) => {
  const [selectedBooking, setSelectedBooking] = useState<ReservationEntry | null>(null);
  const [activeMenu, setActiveMenu] = useState<{ id: number, rect: DOMRect } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const menuRef = useRef<HTMLDivElement>(null);

  // Fonction pour rendre la date "cool" et informelle
  const formatCoolDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const filteredReservations = useMemo(() => {
    return reservations.map(res => ({
      id: res.id,
      resource: res.resource?.name || 'Unknown',
      categoryName: res.resource?.category?.name || 'Uncategorized',
      from: res.start_time,
      to: res.end_time,
      status: res.status,
      justification: res.justification
    }));
  }, [reservations]);

  const [history, setHistory] = useState(filteredReservations);

  useEffect(() => {
    setHistory(filteredReservations);
  }, [filteredReservations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = item.resource.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [history, searchTerm, statusFilter]);

  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'approved':
        return theme === 'dark' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return theme === 'dark' ? 'bg-red-950/20 text-red-400 border-red-900/30' : 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled':
        return theme === 'dark' ? 'bg-orange-950/20 text-orange-400 border-orange-900/30' : 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed':
        return theme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-700 border-slate-200';
      case 'pending':
        return theme === 'dark' ? 'bg-blue-950/20 text-blue-400 border-blue-900/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return theme === 'dark' ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-200';
    }
  };

  const handleMenuClick = (e: React.MouseEvent, id: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setActiveMenu(activeMenu?.id === id ? null : { id, rect });
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className={`text-2xl font-black mb-1 tracking-tight uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>My <span className="text-[#0080FF]">Leases</span></h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Tracking active resource allocations.</p>
          </div>
          <button
            onClick={onNew}
            className={`font-black px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-2 active:scale-95 group shadow-none ${theme === 'dark' ? 'bg-[#0080FF] text-white hover:bg-[#0070E0]' : 'bg-slate-950 text-white hover:bg-[#0080FF]'}`}
          >
            <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            New Allocation
          </button>
        </div>

        {/* Filters & Search Row - Plus compact */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all text-xs font-bold shadow-none ${theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-white focus:bg-slate-950 focus:border-[#0080FF]'
                : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                }`}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-3 rounded-xl border appearance-none font-black text-[10px] uppercase tracking-widest transition-all shadow-none outline-none ${theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-[#0080FF] focus:border-[#0080FF]'
                : 'bg-white border-slate-200 text-slate-700 focus:border-slate-900'
                }`}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table : Réduction des paddings et fonts équilibrées */}
        <div className={`border transition-colors duration-500 overflow-hidden shadow-sm rounded-xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <th className={`px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Resource</th>
                  <th className={`px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Period</th>
                  <th className={`px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Status</th>
                  <th className={`px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-right pr-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y transition-colors duration-500 ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
                {filteredHistory.length > 0 ? filteredHistory.map((row) => (
                  <tr key={row.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50/30'}`}>
                    <td className="px-6 py-5">
                      <div className={`font-black uppercase tracking-tight text-xs mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{row.resource}</div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[9px] font-bold text-[#0080FF] uppercase tracking-wider">{row.categoryName}</span>
                        <span className="text-[9px] font-bold text-slate-500 opacity-50">#DC-{row.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-[11px] font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {formatCoolDate(row.from)}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">until {formatCoolDate(row.to)}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-colors ${getStatusStyles(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right pr-10">
                      <button
                        onClick={(e) => handleMenuClick(e, row.id)}
                        className={`p-2 rounded-lg transition-all shadow-none ${activeMenu?.id === row.id ? (theme === 'dark' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white') : 'text-slate-400 hover:text-[#0080FF] hover:bg-[#0080FF]/10'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">No records found.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popups : Réduction de taille et dates cool */}
      {selectedBooking && (
        <div
          onClick={() => setSelectedBooking(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-300 cursor-default shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}
          >
            <div className={`p-6 flex justify-between items-center ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900'} text-white`}>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight leading-none">{selectedBooking.resource}</h3>
                <span className="text-[8px] text-[#0080FF] font-black uppercase tracking-widest">{selectedBooking.categoryName}</span>
              </div>
              <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase border ${getStatusStyles(selectedBooking.status)}`}>
                {selectedBooking.status}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-500/5 border border-slate-500/10">
                <div>
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">From</div>
                  <div className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCoolDate(selectedBooking.from)}</div>
                </div>
                <div className="text-slate-400">→</div>
                <div className="text-right">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Until</div>
                  <div className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCoolDate(selectedBooking.to)}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Justification</div>
                <p className={`text-[11px] font-bold italic leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>"{selectedBooking.justification}"</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className={`w-full py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Dropdown Popup */}
      {activeMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${activeMenu.rect.bottom + 8}px`,
            left: `${activeMenu.rect.right - 180}px`,
            zIndex: 100
          }}
          className={`w-44 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl ${theme === 'dark' ? 'bg-slate-900 border border-slate-700 shadow-none' : 'bg-white border-transparent'}`}
        >
          <button
            onClick={() => {
              setSelectedBooking(history.find(h => h.id === activeMenu.id) || null);
              setActiveMenu(null);
            }}
            className={`w-full text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-b ${theme === 'dark' ? 'text-slate-300 hover:bg-[#0080FF] hover:text-white border-slate-800' : 'text-slate-600 hover:bg-[#0080FF] hover:text-white border-slate-100'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Inspect
          </button>

          <button
            onClick={() => {
              setHistory(history.filter(h => h.id !== activeMenu.id));
              setActiveMenu(null);
            }}
            className="w-full text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Abort
          </button>
        </div>
      )}
    </>
  );
};