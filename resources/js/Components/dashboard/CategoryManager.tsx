
import React, { useState } from 'react';
import { Category } from '../../App';

interface CategoryManagerProps {
  categories: Category[];
  setCategories: (cats: Category[]) => void;
  theme: 'light' | 'dark';
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, setCategories, theme }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newSpecs, setNewSpecs] = useState<string[]>([]);
  const [currentSpecInput, setCurrentSpecInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const scrollToTop = () => {
    const container = document.querySelector('main > div[class*="overflow-y-auto"]');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addSpecToCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSpecInput && !newSpecs.includes(currentSpecInput)) {
      setNewSpecs([...newSpecs, currentSpecInput]);
      setCurrentSpecInput('');
    }
  };

  const removeSpecFromCurrent = (spec: string) => {
    setNewSpecs(newSpecs.filter(s => s !== spec));
  };

  const handleEditInitiation = (cat: Category) => {
    setEditingId(cat.id);
    setNewCatName(cat.name);
    setNewSpecs([...cat.specs]);
    setIsCreating(true);
    scrollToTop(); 
  };

  const handleStartCreation = () => {
    setEditingId(null);
    setNewCatName('');
    setNewSpecs([]);
    setIsCreating(true);
    scrollToTop(); 
  };

  const finalizeCategory = () => {
    if (!newCatName) return;

    if (editingId) {
      setCategories(categories.map(c => 
        c.id === editingId 
          ? { ...c, name: newCatName, specs: newSpecs } 
          : c
      ));
    } else {
      const newCat: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCatName,
        specs: newSpecs
      };
      setCategories([newCat, ...categories]);
    }

    setNewCatName('');
    setNewSpecs([]);
    setIsCreating(false);
    setEditingId(null);
  };

  const cancelSession = () => {
    setIsCreating(false);
    setEditingId(null);
    setNewCatName('');
    setNewSpecs([]);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-20">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className={`text-3xl font-black mb-1 tracking-tight uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Taxonomy <span className="text-[#0080FF]">Lab</span></h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-bold`}>Engineer infrastructure categories and technical schemas.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={handleStartCreation}
            className={`px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-2 shadow-none ${theme === 'dark' ? 'bg-slate-900 text-white border border-slate-800 hover:border-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            <svg className="w-4 h-4 text-[#0080FF]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            New Category
          </button>
        )}
      </div>

      {isCreating && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          <div className="relative group">
            <div className={`relative rounded-[2rem] border p-7 transition-colors duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               <div className="flex justify-between items-start mb-6">
                  <div className="text-[9px] font-black text-[#0080FF] uppercase tracking-[0.4em]">
                    {editingId ? 'Updating Schema Preview' : 'Live Schematic Preview'}
                  </div>
                  <div className="flex gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0080FF] animate-pulse"></div>
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors shadow-none ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-300'} shrink-0`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                     <h2 className={`text-2xl font-black tracking-tight uppercase mb-1 ${newCatName ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-slate-800 italic' : 'text-slate-300 italic')}`}>
                        {newCatName || "Category Name..."}
                     </h2>
                     <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-4">
                        {newSpecs.length > 0 ? newSpecs.map(spec => (
                          <span key={spec} className={`px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors shadow-none ${theme === 'dark' ? 'bg-blue-950/20 text-[#0080FF] border-blue-900/30' : 'bg-blue-50 text-[#0080FF] border-blue-100'}`}>
                            {spec}
                          </span>
                        )) : (
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic opacity-40">No specs added</span>
                        )}
                     </div>
                  </div>
                  <div className="pt-2">
                     <button 
                       onClick={finalizeCategory}
                       disabled={!newCatName}
                       className="px-7 py-4 bg-[#0080FF] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-none hover:bg-[#0070E0] transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
                     >
                        {editingId ? 'Update Schema' : 'Confirm'} <svg className="inline w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                     </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`rounded-[2rem] border p-7 transition-colors duration-500 space-y-6 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               <div className="space-y-3">
                  <label className={`text-[9px] font-black uppercase tracking-[0.3em] ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>Category Designation</label>
                  <input 
                    type="text" 
                    autoFocus
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Quantum Nodes..."
                    className={`w-full px-5 py-3.5 rounded-xl border transition-all text-sm font-black shadow-none ${
                        theme === 'dark' 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                        : 'bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#0080FF]/10'
                    }`}
                  />
               </div>
               <div className={`flex gap-4 pt-2 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
                  <button onClick={cancelSession} className={`px-4 py-2 font-black text-[9px] uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-red-400' : 'text-slate-500 hover:text-red-500'}`}>Discard Changes</button>
               </div>
            </div>

            <div className={`rounded-[2rem] border p-7 transition-colors duration-500 shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               <div className="space-y-4">
                  <label className={`text-[9px] font-black uppercase tracking-[0.3em] ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'}`}>Technical Schematic (Specs)</label>
                  <form onSubmit={addSpecToCurrent} className="flex gap-2">
                     <input 
                       type="text" 
                       value={currentSpecInput}
                       onChange={(e) => setCurrentSpecInput(e.target.value)}
                       placeholder="e.g. CPU Cores..."
                       className={`flex-1 px-4 py-3 rounded-xl border transition-all text-xs font-bold shadow-none ${
                           theme === 'dark' 
                           ? 'bg-slate-950 border-slate-800 text-white focus:border-[#0080FF]' 
                           : 'bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0080FF]/10'
                       }`}
                     />
                     <button 
                       type="submit"
                       className={`px-5 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 shadow-none ${theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                     >
                       Add
                     </button>
                  </form>
                  
                  <div className="flex flex-wrap gap-2 pt-2 min-h-[60px]">
                     {newSpecs.map(spec => (
                        <div key={spec} className={`group flex items-center gap-2.5 pl-3 pr-1.5 py-1.5 rounded-lg transition-all border shadow-none ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-blue-900' : 'bg-slate-50 border-slate-100 hover:border-red-200'}`}>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-800'}`}>{spec}</span>
                           <button 
                             onClick={() => removeSpecFromCurrent(spec)}
                             className={`w-5 h-5 flex items-center justify-center rounded-md transition-all border shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-700 hover:text-red-400' : 'bg-white text-slate-300 group-hover:text-red-500 border-slate-100'}`}
                           >
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5 pt-4">
        <div className="flex items-center gap-3 mb-4">
           <div className={`h-[1px] flex-1 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
           <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>Active Registry</span>
           <div className={`h-[1px] flex-1 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
           {categories.map((cat) => (
             <div key={cat.id} className={`rounded-[1.5rem] border p-6 flex flex-col justify-between transition-all group border-l-[3px] border-l-[#0080FF] relative shadow-none ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h3 className={`text-lg font-black tracking-tight uppercase mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{cat.name}</h3>
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Classification</div>
                   </div>
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditInitiation(cat)}
                        className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-slate-500 hover:text-[#0080FF] hover:bg-blue-950/40' : 'text-slate-400 hover:text-[#0080FF] hover:bg-blue-50'}`}
                        title="Edit Schema"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button 
                        onClick={() => removeCategory(cat.id)}
                        className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-slate-500 hover:text-red-400 hover:bg-red-950/40' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                        title="Delete Category"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                   </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                   {cat.specs.map(spec => (
                     <span key={spec} className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded border transition-colors shadow-none ${theme === 'dark' ? 'bg-slate-950 text-slate-500 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                        {spec}
                     </span>
                   ))}
                   {cat.specs.length === 0 && <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest italic opacity-40">No technical schema</span>}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
