
import React, { useState, useEffect } from 'react';
import { Category } from '../../App';

interface CreateResourceFormProps {
  onBack: () => void;
  initialData?: any;
  categories: Category[];
  theme: 'light' | 'dark';
}

type ResourceStatus = 'Available' | 'Maintenance' | 'Reserved' | 'Offline';

export const CreateResourceForm: React.FC<CreateResourceFormProps> = ({ onBack, initialData, categories, theme }) => {
  const isEdit = !!initialData;
  const [selectedCatId, setSelectedCatId] = useState(initialData?.categoryId || categories[0]?.id || '');
  const [status, setStatus] = useState<ResourceStatus>(initialData?.status || 'Available');
  const [name, setName] = useState(initialData?.name || '');
  const [specValues, setSpecValues] = useState<Record<string, string>>(initialData?.specs || {});

  const currentCategory = categories.find(c => c.id === selectedCatId);

  useEffect(() => {
    if (!isEdit && currentCategory) {
      const newSpecs: Record<string, string> = {};
      currentCategory.specs.forEach(s => {
        newSpecs[s] = '';
      });
      setSpecValues(newSpecs);
    }
  }, [selectedCatId, categories, isEdit]);

  const handleSpecChange = (spec: string, val: string) => {
    setSpecValues(prev => ({ ...prev, [spec]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      categoryId: selectedCatId,
      categoryName: currentCategory?.name,
      status,
      specs: specValues
    };
    console.log("Saving Asset:", payload);
    onBack();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-24">
      <div className="mb-10 flex items-center gap-6">
        <button 
          onClick={onBack}
          className={`p-4 rounded-2xl border transition-all shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <div>
          <h1 className={`text-3xl font-black mb-1 tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{isEdit ? 'Refine Asset' : 'Deploy Infrastructure'}</h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Configure technical parameters and operational state.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`rounded-[3rem] border transition-colors duration-500 overflow-hidden shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        {/* Basic Config */}
        <div className={`p-12 space-y-10 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
           <div className="text-[10px] font-black text-[#0080FF] uppercase tracking-[0.3em] mb-2">Fundamental Identity</div>
           
           <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Asset Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HPC-CLUSTER-ALPHA-01"
              className={`w-full px-6 py-4 rounded-2xl border transition-all text-sm font-bold shadow-none ${
                theme === 'dark' 
                ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Category Classification</label>
              <div className="relative">
                <select 
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className={`w-full appearance-none px-6 py-4 rounded-2xl border transition-all text-sm font-bold shadow-none ${
                    theme === 'dark' 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                    : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                  }`}
                >
                  {categories.map(cat => <option key={cat.id} value={cat.id} className={theme === 'dark' ? 'bg-slate-900' : ''}>{cat.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-[#0080FF]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Immediate Status</label>
              <div className="relative">
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ResourceStatus)}
                  className={`w-full appearance-none px-6 py-4 rounded-2xl border transition-all text-sm font-bold shadow-none ${
                    theme === 'dark' 
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                    : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                  }`}
                >
                  <option value="Available" className={theme === 'dark' ? 'bg-slate-900' : ''}>Available for Lease</option>
                  <option value="Maintenance" className={theme === 'dark' ? 'bg-slate-900' : ''}>Maintenance Window</option>
                  <option value="Reserved" className={theme === 'dark' ? 'bg-slate-900' : ''}>Pre-Reserved / Busy</option>
                  <option value="Offline" className={theme === 'dark' ? 'bg-slate-900' : ''}>Decommissioned / Offline</option>
                </select>
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-[#0080FF]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Specs Section */}
        <div className={`p-12 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950/30' : 'bg-slate-50/50'}`}>
           <div className="flex items-center justify-between mb-10">
              <div className="text-[10px] font-black text-[#0080FF] uppercase tracking-[0.3em]">Technical Specification Schema</div>
              <div className={`text-[9px] font-black px-3 py-1 rounded-md border uppercase tracking-widest shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-100 text-slate-400'}`}>
                Template: {currentCategory?.name}
              </div>
           </div>

           {currentCategory && currentCategory.specs.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {currentCategory.specs.map(spec => (
                 <div key={spec} className="space-y-2">
                   <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{spec}</label>
                   <input 
                     required
                     type="text"
                     value={specValues[spec] || ''}
                     onChange={(e) => handleSpecChange(spec, e.target.value)}
                     placeholder={`Enter ${spec}...`}
                     className={`w-full px-6 py-4 rounded-2xl border transition-all text-sm font-bold shadow-none ${
                        theme === 'dark' 
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-[#0080FF]' 
                        : 'bg-white border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                     }`}
                   />
                 </div>
               ))}
             </div>
           ) : (
             <div className="py-12 flex flex-col items-center gap-4 text-center">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-700' : 'bg-white border-slate-100 text-slate-200'}`}>
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No technical fields defined for this category.</p>
             </div>
           )}
        </div>

        <div className={`p-12 flex gap-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
          <button 
            type="button" 
            onClick={onBack}
            className={`flex-1 py-4 border rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
          >
            Cancel Session
          </button>
          <button 
            type="submit"
            className="flex-[2] py-4 bg-[#0080FF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-none hover:bg-[#0070E0] transition-all transform active:scale-[0.98]"
          >
            Commit to Inventory
          </button>
        </div>
      </form>
    </div>
  );
};
