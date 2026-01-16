
import React, { useState, useMemo } from 'react';
import { UserRole } from '../../types';

interface ManageResourcesProps {
  onAdd: () => void;
  onEdit: (resource: any) => void;
  onReserve: (resource: any) => void;
  userRole: UserRole;
  theme: 'light' | 'dark';
}

interface DeletionState {
  id: string;
  name: string;
  code: string;
  input: string;
}

export const ManageResources: React.FC<ManageResourcesProps> = ({ onAdd, onEdit, onReserve, userRole, theme, resources }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deletion, setDeletion] = useState<DeletionState | null>(null);
  

  const canManage = userRole === UserRole.ADMIN || userRole === UserRole.TECH_MANAGER;
  const isInternal = userRole === UserRole.INTERNAL_USER;


  const initialResources = [
    { 
      id: '1', name: 'NVIDIA DGX H100 Node-01', categoryName: 'AI Lab', status: 'Available', 
      specs: { 'GPU Model': 'NVIDIA H100 80GB', 'GPU Count': '8', 'Interconnect': 'InfiniBand' }
    },
    { 
      id: '2', name: 'Dell PowerEdge R760 Rack', categoryName: 'Compute', status: 'Reserved', 
      specs: { 'CPU Model': 'Xeon Platinum', 'Core Count': '128', 'RAM (GB)': '512' }
    },
    { 
      id: '3', name: 'PureStorage FlashArray', categoryName: 'Storage', status: 'Available', 
      specs: { 'Capacity (TB)': '1024', 'Drive Type': 'NVMe Flash', 'IOPS': '2M+' }
    },
    { 
      id: '4', name: 'Arista 7050X Leaf', categoryName: 'Network', status: 'Maintenance', 
      specs: { 'Throughput': '100 Gbps', 'Port Count': '48', 'Layer': 'L3' }
    }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesStatus = filterStatus === 'All' || res.status === filterStatus;
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.category.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchQuery, resources]);
  

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'available': return theme === 'dark' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/40' : 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'reserved': return theme === 'dark' ? 'bg-blue-950/30 text-blue-400 border-blue-900/40' : 'bg-blue-50 text-blue-800 border-blue-200';
      case 'maintenance': return theme === 'dark' ? 'bg-amber-950/30 text-amber-400 border-amber-900/40' : 'bg-amber-50 text-amber-800 border-amber-200';
      default: return theme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-20 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className={`text-4xl font-black tracking-tight mb-2 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Asset <span className="text-[#0080FF]">Catalog</span></h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Monitoring global system infrastructure.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-72">
                <input 
                  type="text" 
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all text-sm font-bold shadow-none ${
                    theme === 'dark' 
                    ? 'bg-slate-900 border-slate-800 text-white focus:bg-slate-950 focus:border-[#0080FF]' 
                    : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                  }`}
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5"/></svg>
                </div>
            </div>

            {canManage && (
              <button onClick={onAdd} className={`w-full md:w-auto text-white font-black px-10 py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-none ${theme === 'dark' ? 'bg-[#0080FF] hover:bg-[#0070E0]' : 'bg-slate-950 hover:bg-slate-800'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="3"/></svg>
                Deploy Asset
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <div key={res.id} className={`rounded-2xl border p-8 flex flex-col transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-[#0080FF]/40' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
              <div className="flex justify-between items-start mb-10">
                <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${getStatusBg(res.status)}`}>
                  {res.status}
                </div>
                {canManage && (
                    <button onClick={() => setDeletion({ id: res.id, name: res.name, code: Math.floor(100+Math.random()*900).toString(), input: '' })} className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                )}
              </div>

              <h3 className={`text-2xl font-black mb-1 leading-tight tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{res.name}</h3>
              <div className="text-[10px] font-black text-[#0080FF] uppercase tracking-[0.2em] mb-10">{res.category.name}</div>

              <div className="space-y-4 mb-10 flex-1">
                {Object.entries(res.specifications).map(([key, value]) => (
                  <div key={key} className={`flex items-center justify-between py-2 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{key}</span>
                    <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{String(value)}</span>
                  </div>
                ))}
              </div>

              <div className={`pt-8 border-t mt-auto ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
                {isInternal && (
                  <button onClick={() => onReserve(res)} className="cursor-pointer w-full py-4 bg-[#0080FF] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0070E0] transition-all shadow-none">
                    Confirm Allocation
                  </button>
                )}
                {canManage && (
                  <button onClick={() => onEdit(res)} className={`cursor-pointer w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-none ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-950 text-white hover:bg-slate-800'}`}>
                    Manage Profile
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {deletion && (
        <div 
          onClick={() => setDeletion(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
           <div 
             onClick={(e) => e.stopPropagation()}
             className={`w-full max-w-sm rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200 cursor-default shadow-none transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
           >
              <div className="p-10 text-center">
                 <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 bg-red-950 text-red-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <h2 className={`text-base font-black tracking-tight mb-2 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Decommission</h2>
                 <p className="text-[10px] text-slate-500 font-bold mb-8 uppercase tracking-wide">
                    Delete <span className="text-red-500 font-black">{deletion.name}</span>?
                 </p>
                 <div className={`rounded-xl p-5 mb-8 border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Passcode</div>
                    <div className="text-2xl font-black text-[#0080FF] tracking-widest">{deletion.code}</div>
                 </div>
                 <input 
                   type="text" maxLength={3} autoFocus
                   value={deletion.input}
                   onChange={(e) => setDeletion({ ...deletion, input: e.target.value })}
                   placeholder="---"
                   className={`w-full px-4 py-4 rounded-xl border-2 transition-all text-center text-xl font-black tracking-widest ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-red-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'}`}
                 />
                 <div className="flex flex-col gap-3 mt-8">
                    <button disabled={deletion.input !== deletion.code} onClick={() => { setResources(resources.filter(r => r.id !== deletion.id)); setDeletion(null); }} className={`cursor-pointer w-full py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${deletion.input === deletion.code ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400 dark:bg-slate-800'}`}>Confirm</button>
                    <button onClick={() => setDeletion(null)} className={`cursor-pointer w-full py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>Abort</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
