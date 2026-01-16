
import React, { useState } from 'react';
import { UserRole } from '../../App';

interface SettingsProps {
  userName: string;
  userRole: UserRole;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

interface DeletionState {
  passwordConfirm: string;
}

export const Settings: React.FC<SettingsProps> = ({ userName, userRole, theme, setTheme }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState('alex.rivers@datacenter.hub');
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [isChanging, setIsChanging] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [deletion, setDeletion] = useState<DeletionState | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const roleLabels: Record<UserRole, string> = {
    GUEST: 'Guest',
    INTERNAL_USER: 'Operator',
    TECH_MANAGER: 'Infrastructure Manager',
    ADMIN: 'Admin Authority'
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm || !passwordData.new) return;
    setIsChanging(true);
    setTimeout(() => {
      setIsChanging(false);
      setChangeSuccess(true);
      setTimeout(() => {
        setShowPasswordModal(false);
        setChangeSuccess(false);
        setPasswordData({ current: '', new: '', confirm: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-20 max-w-4xl">
        <div>
          <h1 className={`text-4xl font-black mb-1 tracking-tight uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Security <span className="text-[#0080FF]">Vault</span>
          </h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Manage operator identity and authentication protocols.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className={`rounded-2xl border p-8 shadow-none transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
               <div className={`flex items-center gap-6 mb-10 pb-8 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shadow-none ${theme === 'dark' ? 'bg-slate-800 text-[#0080FF]' : 'bg-slate-950 text-white'}`}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <h3 className={`text-xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
                     <div className="text-[9px] font-black text-[#0080FF] uppercase tracking-[0.2em]">{roleLabels[userRole]}</div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Display</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full px-5 py-4 rounded-xl border transition-all text-xs font-bold shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-950 focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Authorized Email</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-5 py-4 rounded-xl border transition-all text-xs font-bold shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-950 focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
                        />
                     </div>
                  </div>
                  <button className="px-8 py-4 bg-[#0080FF] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0070E0] transition-all shadow-none">
                    Commit Changes
                  </button>
               </div>
            </div>

            <div className={`rounded-2xl border p-8 shadow-none transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
               <h3 className={`text-[10px] font-black uppercase tracking-widest mb-8 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Security Protocol</h3>
               <div className="space-y-4">
                  <div className={`flex items-center justify-between p-5 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-50'}`}>
                     <div className="flex items-center gap-5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${theme === 'dark' ? 'bg-slate-950 text-slate-500 border-slate-800' : 'bg-white text-slate-400 border-slate-100'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                        </div>
                        <div>
                           <div className={`text-[11px] font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Credential Rotation</div>
                           <div className="text-[9px] font-black text-slate-500 uppercase mt-0.5">Updated 14 days ago</div>
                        </div>
                     </div>
                     <button onClick={() => setShowPasswordModal(true)} className={`px-5 py-2.5 border rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'}`}>
                        Rotate Key
                     </button>
                  </div>

                  <div className={`flex items-center justify-between p-5 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-red-950/10 border-red-900/30' : 'bg-red-50/30 border-red-100'}`}>
                     <div className="flex items-center gap-5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-red-500 border transition-all ${theme === 'dark' ? 'bg-slate-900 border-red-900/30' : 'bg-white border-red-100'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </div>
                        <div>
                           <div className={`text-[11px] font-black uppercase tracking-tight ${theme === 'dark' ? 'text-red-400' : 'text-slate-900'}`}>Identity Revocation</div>
                           <div className="text-[9px] font-black text-red-500 uppercase mt-0.5">Delete operator profile</div>
                        </div>
                     </div>
                     <button onClick={() => setDeletion({ passwordConfirm: '' })} className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-none hover:bg-red-700">
                        Revoke ID
                     </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className={`rounded-2xl p-8 border transition-colors duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-900 text-white border-slate-800'}`}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-slate-500">Interface Config</h3>
                <div className="space-y-8">
                   <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment Theme</span>
                      <div className="grid grid-cols-2 gap-3">
                         <button 
                           onClick={() => setTheme('light')}
                           className={`py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-white border-[#0080FF]' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                         >
                            <svg className={`w-4 h-4 ${theme === 'light' ? 'text-[#0080FF]' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${theme === 'light' ? 'text-[#0080FF]' : ''}`}>Light</span>
                         </button>
                         <button 
                           onClick={() => setTheme('dark')}
                           className={`py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-[#0080FF] border-[#0080FF]' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                         >
                            <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : ''}`}>Dark</span>
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Password Rotation Popup */}
      {showPasswordModal && (
        <div 
          onClick={() => setShowPasswordModal(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
           <div 
             onClick={(e) => e.stopPropagation()}
             className={`w-full max-w-sm rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative cursor-default transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
           >
              {changeSuccess ? (
                <div className="p-12 text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-none ${theme === 'dark' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Auth Updated</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity protocols successfully refreshed.</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange}>
                  <div className={`p-8 text-white flex justify-between items-center transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-b border-slate-800' : 'bg-slate-900 border-b border-slate-800'}`}>
                    <div>
                      <div className="text-[8px] font-black text-[#0080FF] uppercase tracking-[0.4em] mb-1.5">Security Auth</div>
                      <h3 className="text-lg font-black uppercase tracking-tight">Access Key Rotation</h3>
                    </div>
                    <button onClick={() => setShowPasswordModal(false)} type="button" className="p-2 hover:bg-white/10 rounded-xl transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Secret</label>
                       <input 
                         required type="password"
                         value={passwordData.current}
                         onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                         className={`w-full px-5 py-4 rounded-xl border transition-all text-xs font-bold shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-950 focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">New Secret</label>
                       <input 
                         required type="password"
                         value={passwordData.new}
                         onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                         className={`w-full px-5 py-4 rounded-xl border transition-all text-xs font-bold shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-950 focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
                       />
                    </div>
                    <button 
                      type="submit"
                      disabled={isChanging || !passwordData.current || passwordData.new !== passwordData.confirm || !passwordData.new}
                      className="w-full py-5 bg-[#0080FF] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all disabled:opacity-40 active:scale-95 shadow-none"
                    >
                      {isChanging ? 'Validating...' : 'Rotate Identity Key'}
                    </button>
                  </div>
                </form>
              )}
           </div>
        </div>
      )}

      {/* Deletion Auth Popup */}
      {deletion && (
        <div 
          onClick={() => setDeletion(null)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
           <div 
             onClick={(e) => e.stopPropagation()}
             className={`w-full max-w-sm rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative cursor-default transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
           >
              <div className="p-10 text-center">
                 <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-none ${theme === 'dark' ? 'bg-red-950/30 text-red-500' : 'bg-red-50 text-red-500'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <h2 className={`text-xl font-black tracking-tight mb-2 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Revoke Authority</h2>
                 <p className="text-[10px] text-slate-500 font-bold mb-10 px-4 uppercase tracking-wide">
                    Identity <span className="text-red-500 font-black">{name}</span> will be purged. This action is irreversible.
                 </p>
                 <div className="space-y-4">
                    <input 
                      type="password" autoFocus
                      value={deletion.passwordConfirm}
                      onChange={(e) => setDeletion({ ...deletion, passwordConfirm: e.target.value })}
                      placeholder="Confirm with Key"
                      className={`w-full px-6 py-5 rounded-xl border transition-all text-center text-sm font-black tracking-widest shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-red-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'}`}
                    />
                    <div className="flex flex-col gap-3 mt-4">
                       <button onClick={() => { setIsDeleting(true); setTimeout(() => window.location.reload(), 1500); }} className={`w-full py-5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${deletion.passwordConfirm ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-700 cursor-not-allowed'}`}>
                          {isDeleting ? 'Erasing...' : 'Confirm Revocation'}
                       </button>
                       <button onClick={() => setDeletion(null)} className={`w-full py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                          Abort Session
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
