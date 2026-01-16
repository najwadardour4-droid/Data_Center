import React from 'react';
import { useForm } from '@inertiajs/react';

interface ReservationFormProps {
  onSuccess: () => void;
  onBack: () => void;
  selectedResource?: any;
  theme: 'light' | 'dark';
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess, onBack, selectedResource, theme }) => {
  const { data, setData, post, processing, errors } = useForm({
    resource_id: selectedResource?.id || '',
    start_time: '',
    end_time: '',
    venture_name: '',
    justification: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/user/reservations', {
      onSuccess: () => onSuccess(),
      onError: (_errors) => {
        if (typeof _errors.error !== 'string') return;
        // Cible le conteneur de scroll de ton dashboard
        const scrollContainer = document.getElementById('scroll_container');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto pb-8">
      {/* Header : Taille équilibrée */}
      <div className="mb-6 flex items-center gap-5">
        <button
          onClick={onBack}
          className={`cursor-pointer p-3 rounded-xl border transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className={`text-2xl font-black tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Booking <span className="text-[#0080FF]">Request</span>
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-bold`}>
            Initiate target infrastructure allocation.
          </p>
        </div>
      </div>

      {/* Erreur : Bien visible mais moins massive */}
      {errors.error && (
        <div className={`mb-5 p-4 rounded-xl border flex items-center gap-3 animate-bounce ${theme === 'dark' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[10px] font-black uppercase tracking-widest leading-tight">{errors.error}</p>
        </div>
      )}

      <div className={`rounded-2xl border overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        {/* Banner Ressource */}
        <div className={`px-8 py-5 text-white flex justify-between items-center ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900'}`}>
          <div>
            <div className="text-[9px] font-black text-[#0080FF] uppercase tracking-[0.2em] mb-0.5">Target Infrastructure</div>
            <div className="text-lg font-black tracking-tight uppercase leading-none">{selectedResource?.name || 'Generic Node'}</div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-blue-950/40 text-[#0080FF] border-blue-900/30' : 'bg-white/10 text-blue-400 border-white/10'}`}>
            Active Catalog
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Allocation Start</label>
              <input
                required
                type="datetime-local"
                value={data.start_time}
                onChange={e => setData('start_time', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
              />
              {errors.start_time && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.start_time}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Release Time</label>
              <input
                required
                type="datetime-local"
                value={data.end_time}
                onChange={e => setData('end_time', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
              />
              {errors.end_time && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.end_time}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operator Context</label>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Optional</span>
            </div>
            <input
              type="text"
              value={data.venture_name}
              onChange={e => setData('venture_name', e.target.value)}
              placeholder="Project or Team Name"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-bold outline-none transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Justification Memo</label>
            <textarea
              required
              rows={3}
              value={data.justification}
              onChange={e => setData('justification', e.target.value)}
              placeholder="Outline requirements..."
              className={`w-full px-4 py-3 rounded-xl border text-sm font-bold outline-none resize-none transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#0080FF]'}`}
            ></textarea>
            {errors.justification && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.justification}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`${!processing ? 'cursor-pointer' : ''} w-full bg-[#0080FF] text-white font-black py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] hover:bg-[#0070E0] ${processing ? 'opacity-50' : ''}`}
          >
            {processing ? 'Processing Clearance...' : 'Submit Request'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
        Subject to node availability protocols
      </p>
    </div>
  );
};