
import React, { useState, useMemo } from 'react';

interface ApprovalRequest {
  id: string;
  user: string;
  resource: string;
  duration: string;
  justification: string;
  timestamp: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const Approvals: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [requests, setRequests] = useState<ApprovalRequest[]>([
    { 
      id: 'REQ-9921', 
      user: 'Mark Rivers', 
      resource: 'NVIDIA DGX H100 Node-01', 
      duration: '48 Hours', 
      justification: 'Critical GPU training for the Project Phoenix neural engine.',
      timestamp: '12 mins ago',
      status: 'Pending'
    },
    { 
      id: 'REQ-8842', 
      user: 'Sarah Wilson', 
      resource: 'PureStorage FlashArray', 
      duration: '1 Week', 
      justification: 'Backup migration for legacy database clusters.',
      timestamp: '1 hour ago',
      status: 'Pending'
    },
    { 
      id: 'REQ-7712', 
      user: 'John Doe', 
      resource: 'Dell PowerEdge R760', 
      duration: '24 Hours', 
      justification: 'Standard load testing for upcoming microservice deployment.',
      timestamp: '3 hours ago',
      status: 'Pending'
    }
  ]);

  const [activeAction, setActiveAction] = useState<{ id: string, type: 'APPROVE' | 'REJECT' } | null>(null);
  const [feedback, setFeedback] = useState('');

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        req.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
        req.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  const handleExecute = () => {
    if (!activeAction) return;
    setRequests(prev => prev.map(req => req.id === activeAction.id ? { ...req, status: activeAction.type === 'APPROVE' ? 'Approved' : 'Rejected' } : req));
    setActiveAction(null);
    setFeedback('');
  };

  const currentRequest = requests.find(r => r.id === activeAction?.id);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return theme === 'dark' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return theme === 'dark' ? 'bg-red-950/20 text-red-400 border-red-900/30' : 'bg-red-50 text-red-700 border-red-200';
      case 'Pending': return theme === 'dark' ? 'bg-blue-950/20 text-blue-400 border-blue-900/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      default: return '';
    }
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className={`text-4xl font-black mb-2 tracking-tight uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Clearance <span className="text-[#0080FF]">Queue</span></h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Verify high-impact infrastructure allocations.</p>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full">
              <input 
                type="text" 
                placeholder="Search operator or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
           
           <div className="flex items-center gap-2 w-full md:w-auto">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-6 py-4 rounded-xl border appearance-none font-black text-[10px] uppercase tracking-widest transition-all shadow-none outline-none ${
                  theme === 'dark' 
                  ? 'bg-slate-900 border-slate-800 text-[#0080FF] focus:border-[#0080FF]' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-slate-900'
                }`}
              >
                <option value="Pending">Pending Auth</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="All">All Requests</option>
              </select>
           </div>
        </div>

        <div className={`border transition-colors duration-500 overflow-visible shadow-none rounded-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className={`border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Operator</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Resource</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Duration</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Status</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right pr-14 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Auth</th>
                    </tr>
                 </thead>
                 <tbody className={`divide-y transition-colors duration-500 ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50/30'}`}>
                         <td className="px-10 py-8">
                            <div className={`font-black uppercase tracking-tight text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{req.user}</div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{req.id}</div>
                         </td>
                         <td className={`px-10 py-8 text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{req.resource}</td>
                         <td className="px-10 py-8">
                            <div className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{req.duration}</div>
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{req.timestamp}</div>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-colors ${getStatusStyles(req.status)}`}>
                               {req.status}
                            </span>
                         </td>
                         <td className="px-10 py-8 text-right pr-14">
                            {req.status === 'Pending' ? (
                               <div className="flex justify-end gap-3">
                                  <button onClick={() => setActiveAction({ id: req.id, type: 'REJECT' })} className={`p-3 rounded-xl transition-all shadow-none ${theme === 'dark' ? 'text-slate-500 hover:text-red-500 hover:bg-red-950/40' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}>
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                                  </button>
                                  <button onClick={() => setActiveAction({ id: req.id, type: 'APPROVE' })} className={`p-3 rounded-xl transition-all shadow-none ${theme === 'dark' ? 'text-slate-500 hover:text-emerald-500 hover:bg-emerald-950/40' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}>
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                                  </button>
                               </div>
                            ) : (
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Finalized</span>
                            )}
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {activeAction && currentRequest && (
        <div 
          onClick={() => setActiveAction(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 cursor-default shadow-none transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
          >
             <div className={`p-8 flex flex-col gap-1 transition-colors duration-500 ${activeAction.type === 'APPROVE' ? (theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900') : 'bg-red-950'} text-white`}>
                <div className="text-[9px] font-black uppercase tracking-[0.4em] opacity-70">Verdict</div>
                <h2 className="text-xl font-black tracking-tight uppercase leading-none">
                   {activeAction.type === 'APPROVE' ? 'Authorize' : 'Reject'} Lease
                </h2>
             </div>
             <div className="p-8 space-y-6">
                <div className={`p-5 rounded-xl border transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Target Operator</div>
                   <div className={`text-sm font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{currentRequest.user}</div>
                </div>
                <textarea 
                  rows={3}
                  placeholder="Notes for the operator..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl border transition-all text-xs font-bold resize-none shadow-none ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' : 'bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
                />
                <div className="flex gap-4">
                   <button onClick={() => setActiveAction(null)} className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-500 hover:text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-900'}`}>Cancel</button>
                   <button onClick={handleExecute} className={`flex-[2] py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeAction.type === 'APPROVE' ? 'bg-[#0080FF] text-white' : 'bg-red-600 text-white'}`}>Process</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};
