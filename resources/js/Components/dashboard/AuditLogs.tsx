
import React, { useState } from 'react';

interface LogEntry {
  id: number;
  action: string;
  target: string;
  actor: string;
  time: string;
  severity: 'Info' | 'Alert' | 'Warning';
  details: {
    ip: string;
    userAgent: string;
    payload: any;
  };
}

export const AuditLogs: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const logs: LogEntry[] = [
    { 
      id: 1, action: 'Role Updated', target: 'Mark Rivers', actor: 'Alex Rivers', time: '12 mins ago', severity: 'Info',
      details: { ip: '10.0.4.122', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', payload: { prevRole: 'USER', newRole: 'MANAGER' } }
    },
    { 
      id: 2, action: 'Resource Deleted', target: 'NVIDIA DGX-08', actor: 'Admin System', time: '45 mins ago', severity: 'Alert',
      details: { ip: 'SYSTEM_INTERNAL', userAgent: 'CRON_JOB_V2', payload: { resourceId: 'DC-0042', reason: 'Decommissioning' } }
    },
    { 
      id: 3, action: 'Access Denied', target: 'HPC Cluster', actor: 'Sarah Wilson', time: '1 hour ago', severity: 'Warning',
      details: { ip: '192.168.1.45', userAgent: 'Chrome 120.0', payload: { errorCode: '403_FORBIDDEN', attemptCount: 3 } }
    },
    { 
      id: 4, action: 'New User Registered', target: 'John Doe', actor: 'System Auto', time: '2 hours ago', severity: 'Info',
      details: { ip: '172.16.0.4', userAgent: 'Firefox 115', payload: { userId: 'USER-992', email: 'john@datacenter.hub' } }
    },
    { 
      id: 5, action: 'Category Created', target: 'Quantum Computing', actor: 'Alex Rivers', time: '5 hours ago', severity: 'Info',
      details: { ip: '10.0.4.122', userAgent: 'Safari 17.1', payload: { catName: 'Quantum', specs: ['Quantum', 'Specs'] } }
    },
  ];

  const getSeverityStyle = (sev: string) => {
    switch(sev) {
      case 'Alert': return theme === 'dark' ? 'text-red-400 bg-red-950/20 border-red-900/30' : 'text-red-600 bg-red-50 border-red-100';
      case 'Warning': return theme === 'dark' ? 'text-amber-400 bg-amber-950/20 border-amber-900/30' : 'text-amber-600 bg-amber-50 border-amber-100';
      default: return theme === 'dark' ? 'text-blue-400 bg-blue-950/20 border-blue-900/30' : 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-20">
        <div className="flex justify-between items-end">
          <div>
            <h1 className={`text-4xl font-black mb-2 tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Audit <span className="text-[#0080FF]">Trail</span></h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Immutable high-integrity log of all system interactions.</p>
          </div>
          <button className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 active:scale-95 transition-all shadow-none ${theme === 'dark' ? 'bg-slate-900 text-white border border-slate-800 hover:border-slate-700' : 'bg-slate-950 text-white hover:bg-[#0080FF]'}`}>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             Export Stream
          </button>
        </div>

        <div className={`rounded-2xl border p-8 transition-colors duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
           <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className={`flex items-center gap-6 p-5 rounded-xl border transition-all group ${theme === 'dark' ? 'border-slate-800 hover:bg-slate-950/40' : 'border-slate-50 hover:bg-slate-50/50'}`}>
                   <div className={`w-1 h-8 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-800 group-hover:bg-[#0080FF]' : 'bg-slate-100 group-hover:bg-[#0080FF]'}`}></div>
                   
                   <div className="flex-1">
                      <div className="flex items-center gap-3 mb-0.5">
                         <span className={`text-sm font-black tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{log.action}</span>
                         <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${getSeverityStyle(log.severity)}`}>
                            {log.severity}
                         </span>
                      </div>
                      <p className={`text-[10px] font-bold tracking-tight uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                         <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{log.actor}</span> on <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{log.target}</span>
                      </p>
                   </div>

                   <div className="text-right flex items-center gap-6">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{log.time}</div>
                      <button 
                        onClick={() => setSelectedLog(log)}
                        className={`px-4 py-2 text-[9px] font-black border transition-all uppercase tracking-widest rounded-lg ${theme === 'dark' ? 'bg-slate-950 text-slate-500 border-slate-800 hover:text-[#0080FF]' : 'bg-slate-50 text-slate-400 border-transparent hover:text-[#0080FF] hover:bg-blue-50'}`}
                      >
                         Inspect
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {selectedLog && (
        <div 
          onClick={() => setSelectedLog(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 cursor-default shadow-none transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
          >
             <div className={`p-8 flex justify-between items-start transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'}`}>
                <div>
                   <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-2 text-[#0080FF]">Event Diagnostics</div>
                   <h2 className="text-2xl font-black tracking-tight uppercase leading-none">{selectedLog.action}</h2>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
             </div>
             
             <div className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-1">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Operator Identity</div>
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedLog.actor}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Source</div>
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedLog.details.ip}</div>
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payload Trace</div>
                   <div className={`p-6 rounded-xl border font-mono text-[11px] overflow-x-auto whitespace-pre transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                      {JSON.stringify(selectedLog.details.payload, null, 2)}
                   </div>
                </div>

                <div className={`pt-6 border-t flex justify-end ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                   <button 
                     onClick={() => setSelectedLog(null)}
                     className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-none ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-900 text-white hover:bg-[#0080FF]'}`}
                   >
                      Exit Log
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};
