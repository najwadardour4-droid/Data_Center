
import React, { useState, useMemo } from 'react';

type AccountRole = 'ADMIN' | 'TECH_MANAGER' | 'INTERNAL_USER';

interface VerificationState {
  type: 'ROLE_CHANGE' | 'DELETE_USER';
  userId: string;
  userName: string;
  newRole?: AccountRole;
  code: string;
  input: string;
}

export const UserManagement: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@datacenter.hub', role: 'ADMIN' as AccountRole, status: 'Active', joined: 'Oct 2025', isRoot: true },
    { id: '2', name: 'Jane Smith', email: 'jane@enterprise.com', role: 'TECH_MANAGER' as AccountRole, status: 'Active', joined: 'Nov 2025', isRoot: false },
    { id: '3', name: 'Mark Rivers', email: 'mark@dev.io', role: 'INTERNAL_USER' as AccountRole, status: 'Active', joined: 'Jan 2026', isRoot: false },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@ops.net', role: 'INTERNAL_USER' as AccountRole, status: 'Active', joined: 'Dec 2025', isRoot: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [verification, setVerification] = useState<VerificationState | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const initiateRoleChange = (id: string, name: string, newRole: AccountRole) => {
    const user = users.find(u => u.id === id);
    if (user?.isRoot) return; 
    setVerification({ type: 'ROLE_CHANGE', userId: id, userName: name, newRole, code: Math.floor(100 + Math.random() * 900).toString(), input: '' });
  };

  const handleVerifyAction = () => {
    if (verification && verification.input === verification.code) {
      if (verification.type === 'ROLE_CHANGE' && verification.newRole) {
        setUsers(users.map(u => u.id === verification.userId ? { ...u, role: verification.newRole! } : u));
      } else if (verification.type === 'DELETE_USER') {
        setUsers(users.filter(u => u.id !== verification.userId));
      }
      setVerification(null);
    }
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className={`text-4xl font-black mb-2 tracking-tight uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Operator <span className="text-[#0080FF]">Hub</span></h1>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-bold`}>Manage internal accounts and security privileges.</p>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-center gap-4">
           <div className="relative flex-1 w-full">
              <input 
                type="text" 
                placeholder="Search by name or email..."
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
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-6 py-4 rounded-xl border appearance-none font-black text-[10px] uppercase tracking-widest transition-all shadow-none outline-none ${
                  theme === 'dark' 
                  ? 'bg-slate-900 border-slate-800 text-[#0080FF] focus:border-[#0080FF]' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-slate-900'
                }`}
              >
                <option value="All">All Roles</option>
                <option value="ADMIN">Admins Only</option>
                <option value="TECH_MANAGER">Managers Only</option>
                <option value="INTERNAL_USER">Internal Users</option>
              </select>
           </div>
        </div>

        <div className={`border transition-colors duration-500 overflow-visible shadow-none rounded-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className={`border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Identity</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Access Level</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Status</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Join Date</th>
                       <th className={`px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right pr-14 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Actions</th>
                    </tr>
                 </thead>
                 <tbody className={`divide-y transition-colors duration-500 ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50/30'}`}>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                               <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-[10px] shadow-none ${user.isRoot ? 'bg-[#0080FF] text-white' : (theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-900 text-white')}`}>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                               </div>
                               <div>
                                  <div className={`text-sm font-black uppercase tracking-tight mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
                                  <div className="text-[10px] font-black text-slate-500 lowercase">{user.email}</div>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            {user.isRoot ? (
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Root Authority</span>
                            ) : (
                              <select 
                                value={user.role}
                                onChange={(e) => initiateRoleChange(user.id, user.name, e.target.value as AccountRole)}
                                className={`bg-transparent text-[10px] font-black text-[#0080FF] outline-none cursor-pointer uppercase tracking-widest hover:underline ${theme === 'dark' ? '[&>option]:bg-slate-950' : ''}`}
                              >
                                 <option value="ADMIN">Admin</option>
                                 <option value="TECH_MANAGER">Manager</option>
                                 <option value="INTERNAL_USER">Internal</option>
                              </select>
                            )}
                         </td>
                         <td className="px-10 py-8">
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-colors ${theme === 'dark' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                               {user.status}
                            </span>
                         </td>
                         <td className={`px-10 py-8 text-xs font-bold uppercase tracking-tight ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{user.joined}</td>
                         <td className="px-10 py-8 text-right pr-14">
                            {!user.isRoot ? (
                               <button 
                                 onClick={() => setVerification({ type: 'DELETE_USER', userId: user.id, userName: user.name, code: Math.floor(100 + Math.random() * 900).toString(), input: '' })}
                                 className={`p-3 rounded-xl transition-all shadow-none ${theme === 'dark' ? 'text-slate-500 hover:text-red-500 hover:bg-red-950/40' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                               >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                               </button>
                            ) : (
                               <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            )}
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {verification && (
        <div 
          onClick={() => setVerification(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
        >
           <div 
             onClick={(e) => e.stopPropagation()}
             className={`w-full max-w-[320px] rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200 cursor-default shadow-none transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border-transparent'}`}
           >
              <div className="p-10 text-center">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 ${verification.type === 'DELETE_USER' ? 'bg-red-950/40 text-red-500' : 'bg-blue-950/40 text-[#0080FF]'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 
                 <h2 className={`text-base font-black tracking-tight mb-2 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Auth Check</h2>
                 <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-8 px-2 uppercase tracking-wide">
                    {verification.type === 'DELETE_USER' ? `Revoke access for ${verification.userName}?` : `Change role for ${verification.userName}?`}
                 </p>

                 <div className={`rounded-xl p-5 border mb-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5">Verification Code</div>
                    <div className={`text-2xl font-black tracking-[0.3em] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{verification.code}</div>
                 </div>

                 <input 
                   type="text"
                   maxLength={3}
                   autoFocus
                   value={verification.input}
                   onChange={(e) => setVerification({ ...verification, input: e.target.value })}
                   placeholder="---"
                   className={`w-full px-4 py-4 rounded-xl border-2 transition-all text-center text-xl font-black tracking-[0.5em] shadow-none ${
                      theme === 'dark' 
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                      : 'bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:border-[#0080FF]'
                   }`}
                 />

                 <div className="mt-8 flex gap-3">
                    <button onClick={() => setVerification(null)} className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-500 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>Cancel</button>
                    <button 
                      disabled={verification.input !== verification.code}
                      onClick={handleVerifyAction}
                      className={`flex-[2] py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${verification.input === verification.code ? 'bg-[#0080FF] text-white shadow-none' : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-700'}`}
                    >
                       Confirm
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
