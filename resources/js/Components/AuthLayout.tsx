
import React from 'react';
import { BrandLogo } from './BrandLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  toggleTheme?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, theme, toggleTheme }) => {
  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Left Panel: Form */}
      <div className={`flex flex-col flex-1 px-6 py-12 lg:px-24 relative transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
        
        {/* Theme Switcher in Auth */}
        <div className="absolute top-8 right-8 lg:right-12">
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-2xl border transition-all active:scale-95 ${
              theme === 'dark' 
                ? 'bg-slate-900 border-slate-800 text-[#0080FF] hover:border-slate-700' 
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mb-16">
          <BrandLogo size="sm" dark={theme === 'dark'} />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-sm:max-w-full max-w-sm">
            {children}
          </div>
        </div>
        
        <div className={`mt-8 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${theme === 'dark' ? 'text-slate-700' : 'text-slate-400'}`}>
          © 2026 DataCenterHub Platform
        </div>
      </div>

      {/* Right Panel: Clean Professional Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative overflow-hidden flex-col justify-center px-24 border-l border-slate-900">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-600/10 blur-[150px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 space-y-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black tracking-widest uppercase">
            Platform v2.0 Enterprise
          </div>
          
          <h2 className="text-6xl font-extrabold text-white leading-[0.9] tracking-tighter">
            Enterprise <br/> <span className="text-sky-500">Resource Hub.</span>
          </h2>
          
          <p className="text-slate-300 text-xl max-w-md leading-relaxed font-medium">
            Manage your assets, reservations, and metrics with the most advanced management platform.
          </p>

          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-800">
            <div>
              <div className="text-4xl font-black text-white mb-1">99.9%</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Availability</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-1">1.2k+</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Assets Managed</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-24 right-24 flex justify-between items-center opacity-60">
           <div className="text-slate-400 text-[9px] uppercase tracking-[0.3em] font-black">Secure Infrastructure</div>
           <div className="flex gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
