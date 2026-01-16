import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../Components/BrandLogo';
import { useTheme } from '../Context/ThemeContext';
import { router } from '@inertiajs/react';

interface LandingPageProps {
  isLoggedIn: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [processing, setProcessing] = useState(false); // Ajout de l'état processing
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onStart = (isStartReserving: boolean) => {
    if (processing) return;
    setProcessing(true);

    if (isLoggedIn) {
      if (isStartReserving)
        router.post('/dashboard-setup', { view: 'manage-resources' }, { onFinish: () => setProcessing(false) });
      else
        router.post('/dashboard-setup', { view: 'dashboard' }, { onFinish: () => setProcessing(false) });
    } else {
      router.get('/auth/signup', {}, { onFinish: () => setProcessing(false) });
    }
  };

  const onLogin = () => {
    if (processing) return;
    setProcessing(true);
    router.get('/auth', {}, { onFinish: () => setProcessing(false) });
  };

  const viewResources = (viewName: string) => {
    if (processing) return;
    setProcessing(true);
    router.post('/dashboard-setup', { view: viewName }, { onFinish: () => setProcessing(false) });
  };

  const features = [
    {
      title: "Resource Management",
      desc: "Complete catalog of servers, VMs, storage, and network equipment with detailed specifications and real-time status.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    },
    {
      title: "Smart Reservations",
      desc: "Automatic availability checking, conflict resolution, and intelligent scheduling for optimal resource utilization.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    },
    {
      title: "Usage Analytics",
      desc: "Comprehensive dashboards with visual statistics, occupancy rates, and historical data for informed decisions.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
    },
    {
      title: "Real-time Notifications",
      desc: "Instant alerts for request updates, expiration warnings, conflicts, and scheduled maintenance periods.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
    },
    {
      title: "Role-based Security",
      desc: "Advanced authentication with granular permissions, action logging, and comprehensive audit trails.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    },
    {
      title: "Complete Traceability",
      desc: "Full tracking of reservations from request to completion with detailed status updates and history.",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    }
  ];

  const userTypes = [
    {
      role: "Guest",
      desc: "Browse available resources, view specifications, and submit account requests.",
      perks: ["Read-only access", "Resource catalog", "Account requests"],
    },
    {
      role: "Internal User",
      desc: "Engineers, teachers, and students with full reservation capabilities.",
      perks: ["Submit reservations", "Track requests", "View history", "Get notifications"],
    },
    {
      role: "Resource Manager",
      desc: "Manage assigned resources and approve reservation requests.",
      perks: ["Approve requests", "Manage resources", "Set maintenance", "View analytics"],
    },
    {
      role: "Administrator",
      desc: "Complete control over the entire data center platform.",
      perks: ["User management", "Global statistics", "System configuration", "Full access"],
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-[#fcfcfc] text-slate-900'}`}>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
        ? (theme === 'dark' ? 'bg-slate-950/95 border-slate-800 shadow-none py-3' : 'bg-white/95 border-slate-200 shadow-none py-3')
        : 'bg-transparent border-transparent py-5'
        } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <BrandLogo size="sm" dark={theme === 'dark'} />

          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all active:scale-95 ${theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-[#0080FF] hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
              )}
            </button>
            {!isLoggedIn &&
              <button
                disabled={processing}
                onClick={onLogin}
                className={`cursor-pointer text-sm font-black uppercase tracking-widest transition-colors ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#0080FF]'} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {processing ? '...' : 'Sign In'}
              </button>
            }
            <button
              disabled={processing}
              onClick={() => onStart(false)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-none ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'} ${theme === 'dark' ? 'bg-[#0080FF] text-white' : 'bg-slate-950 text-white'}`}
            >
              {processing ? 'Loading...' : (isLoggedIn ? 'Go to Dashboard' : 'Get Started')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[50%] h-[50%] blur-[120px] -z-10 rounded-full ${theme === 'dark' ? 'bg-[#0080FF]/5' : 'bg-[#0080FF]/10'}`}></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-black uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ${theme === 'dark' ? 'bg-[#0080FF]/10 border-[#0080FF]/20 text-[#0080FF]' : 'bg-sky-100 border-sky-200 text-sky-800'}`}>
            Resource Management Platform
          </div>
          <h1 className={`text-4xl lg:text-6xl font-black tracking-tight leading-[1.2] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Manage Your Data Center <br /> <span className="text-[#0080FF]">With Confidence</span>
          </h1>
          <p className={`text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Streamline resource allocation, track reservations in real-time, and optimize your infrastructure with our intelligent reservation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button
              disabled={processing}
              onClick={() => onStart(true)}
              className={`px-10 py-4 bg-[#0080FF] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-none ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0070E0] active:scale-95 cursor-pointer'}`}>
              {processing ? 'Processing...' : 'Start Reserving'}
            </button>
            <button
              disabled={processing}
              onClick={() => viewResources('manage-resources')}
              className={`px-10 py-4 border-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-none ${processing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 cursor-pointer'} ${theme === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
              View Resources
            </button>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className={`py-12 border-y transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>500+</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Resources Managed</div>
          </div>
          <div className="text-center md:text-left">
            <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>98%</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Uptime Metric</div>
          </div>
          <div className="text-center md:text-left">
            <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>1200+</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Active Engineers</div>
          </div>
          <div className="text-center md:text-left">
            <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>24/7</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Expert Support</div>
          </div>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-8 rounded-3xl border transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
          <div className="text-4xl font-black mb-2 leading-none text-[#0080FF]">99.9%</div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">System Availability</div>
        </div>
        <div className={`p-8 rounded-3xl border transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
          <div className="text-4xl font-black mb-2 leading-none text-[#0080FF]">85%</div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Resource Utilization</div>
        </div>
        <div className={`p-8 rounded-3xl border transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
          <div className="text-4xl font-black mb-2 leading-none text-[#0080FF]">&lt;2min</div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Avg. Approval Time</div>
        </div>
        <div className={`p-8 rounded-3xl border transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
          <div className="text-4xl font-black mb-2 leading-none text-[#0080FF]">5000+</div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total Reservations</div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
          <h2 className="text-xs font-black text-[#0080FF] uppercase tracking-[0.4em] mb-4">Powerful Features</h2>
          <h3 className={`text-4xl lg:text-6xl font-black tracking-tight mb-8 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Everything you need for Complete Control</h3>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Streamline your data center operations with tools designed for precision, visibility, and performance.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`mb-8 p-4 w-fit rounded-2xl ${theme === 'dark' ? 'bg-[#0080FF]/10 text-[#0080FF]' : 'bg-[#0080FF]/10 text-[#0080FF]'}`}>
                {f.icon}
              </div>
              <h4 className={`text-xl font-black uppercase tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{f.title}</h4>
              <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className={`py-32 border-y transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-[#f8f9fa] border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-xs font-black text-[#0080FF] uppercase tracking-[0.4em] mb-4">Tailored for Every Team</h2>
          <h3 className={`text-4xl lg:text-5xl font-black tracking-tight mb-8 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Designed for Every User Type</h3>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Granular access controls ensure that every team member has the exact permissions they need.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((type, i) => (
            <div key={i} className={`p-8 rounded-3xl border flex flex-col h-full transition-all duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="mb-6 flex items-center justify-between">
                <h4 className={`text-xl font-black tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{type.role}</h4>
                <div className="w-2 h-2 rounded-full bg-[#0080FF]"></div>
              </div>
              <p className={`text-xs font-medium mb-10 flex-1 leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{type.desc}</p>
              <ul className="space-y-4">
                {type.perks.map((p, idx) => (
                  <li key={idx} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <svg className="w-3.5 h-3.5 text-[#0080FF]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Real Footer */}
      <footer className={`py-20 border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-6 space-y-8">
            <BrandLogo size="md" dark={theme === 'dark'} />
            <p className={`text-base font-medium leading-relaxed max-w-md ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Enterprise-grade resource management for modern data centers. Streamline reservations, optimize utilization, and maintain complete control over your infrastructure.
            </p>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0080FF]">Platform</h5>
            <ul className={`space-y-5 text-[10px] font-black uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Features</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Resources</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Documentation</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">API Reference</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0080FF]">Company</h5>
            <ul className={`space-y-5 text-[10px] font-black uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">About Us</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Contact</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0080FF] transition-all">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto px-6 mt-24 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${theme === 'dark' ? 'border-slate-900' : 'border-slate-200'}`}>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">© 2026 DataCenterHub. All rights reserved. RESOURCE MANAGEMENT SOLUTIONS.</p>
          <div className="flex gap-8 text-slate-500">
            <a href="#" className="hover:text-[#0080FF] transition-all text-[9px] font-black uppercase tracking-[0.1em]">TWITTER</a>
            <a href="#" className="hover:text-[#0080FF] transition-all text-[9px] font-black uppercase tracking-[0.1em]">GITHUB</a>
            <a href="#" className="hover:text-[#0080FF] transition-all text-[9px] font-black uppercase tracking-[0.1em]">LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;