import React from 'react';
import { useForm } from '@inertiajs/react';

interface SignInFormProps {
  onSwitch: () => void;
  onLoginSuccess?: () => void; // Optionnel avec Inertia car il gère la redirection
  theme: 'light' | 'dark';
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSwitch, theme }) => {
  // Déclaration du formulaire avec Inertia
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'), // Réinitialise le mot de passe en cas d'échec
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-none text-[9px] font-black uppercase tracking-[0.3em] mb-8 border-l-4 border-[#0080FF] ${theme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-900'}`}>
          Secure Authentication
        </div>
        <h2 className={`text-6xl font-black mb-4 tracking-tighter uppercase leading-[0.85] transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Access <br /> <span className="text-[#0080FF]">Your Node</span>
        </h2>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
          Re-establish operator session for DC-HUB infrastructure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {/* Identity Field */}
          <div className="space-y-2">
            <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>Operator Identity</label>
            <div className="relative">
              <input
                required
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="ADMIN@DATACENTER.HUB"
                className={`w-full pl-12 pr-5 py-5 rounded-none border transition-all text-sm font-bold shadow-none ${theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-[#0080FF] focus:bg-slate-950'
                  : 'bg-white border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'
                  } ${errors.email ? 'border-red-500' : ''}`}
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#0080FF]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
            {errors.email && <div className="text-red-500 text-[8px] font-black uppercase tracking-widest mt-1">{errors.email}</div>}
          </div>

          {/* Access Key Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className={`text-[9px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>Access Key</label>
              <button type="button" className="text-[8px] font-black text-[#0080FF] uppercase tracking-widest hover:underline transition-all">Recover Key</button>
            </div>
            <div className="relative">
              <input
                required
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-12 pr-5 py-5 rounded-none border transition-all text-sm font-bold shadow-none ${theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-[#0080FF] focus:bg-slate-950'
                  : 'bg-white border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'
                  } ${errors.password ? 'border-red-500' : ''}`}
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#0080FF]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
            </div>
            {errors.password && <div className="text-red-500 text-[8px] font-black uppercase tracking-widest mt-1">{errors.password}</div>}
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className={`w-full font-black py-6 rounded-none text-[11px] uppercase tracking-[0.4em] transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-4 group shadow-none disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-[#0080FF] text-white hover:bg-[#0070E0]' : 'bg-slate-950 text-white hover:bg-[#0080FF]'
            }`}
        >
          {processing ? 'ESTABLISHING LINK...' : 'RESTORE SESSION'}
          {!processing && (
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          )}
        </button>
      </form>

      <div className="mt-16 text-center">
        <button
          onClick={onSwitch}
          className={`px-10 py-4 rounded-none border transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-none ${theme === 'dark'
            ? 'border-slate-800 text-slate-500 hover:text-white hover:bg-slate-900'
            : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
        >
          REQUEST NEW CLEARANCE
        </button>
      </div>
    </div>
  );
};