
import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { SiteConfig } from '../types';

const POSSIBLE_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
];

const AdminPanel: React.FC = () => {
  const { config, updateConfig, setAdmin } = useSite();
  const [tempConfig, setTempConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'courts' | 'schedules' | 'events'>('home');
  const [newImgUrl, setNewImgUrl] = useState('');

  useEffect(() => {
    if (config) setTempConfig(JSON.parse(JSON.stringify(config)));
  }, [config]);

  if (!tempConfig) return <div className="p-20 text-center font-bold text-[#5C6B89]">Inizializzazione Dashboard...</div>;

  const handleSave = async () => {
    await updateConfig(tempConfig);
    alert('Configurazione Arena salvata con successo!');
  };

  const addImage = (type: 'tennis' | 'padel') => {
    if (!newImgUrl) return;
    setTempConfig(prev => {
      if (!prev) return null;
      const updated = { ...prev };
      updated.courts[type].imageUrls = [...updated.courts[type].imageUrls, newImgUrl];
      return updated;
    });
    setNewImgUrl('');
  };

  const removeImage = (type: 'tennis' | 'padel', index: number) => {
    setTempConfig(prev => {
      if (!prev) return null;
      const updated = { ...prev };
      updated.courts[type].imageUrls = updated.courts[type].imageUrls.filter((_, i) => i !== index);
      return updated;
    });
  };

  const toggleSlot = (courtId: string, slot: string) => {
    setTempConfig(prev => {
      if (!prev) return null;
      const updated = { ...prev };
      const findAndToggle = (courts: any[]) => courts.map(c => {
        if (c.id === courtId) {
          const hasSlot = c.slots.includes(slot);
          return {
            ...c,
            slots: hasSlot ? c.slots.filter((s: string) => s !== slot) : [...c.slots, slot].sort()
          };
        }
        return c;
      });

      updated.courts.tennis.individualCourts = findAndToggle(updated.courts.tennis.individualCourts);
      updated.courts.padel.individualCourts = findAndToggle(updated.courts.padel.individualCourts);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#5C6B89] rounded-3xl flex items-center justify-center text-white shadow-xl">
              <i className="fas fa-sliders-h text-2xl"></i>
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#5C6B89] tracking-tighter">ADMIN ARENA</h1>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Gestione Campi & Orari</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleSave} className="bg-[#A8D695] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-[#A8D695]/20 hover:scale-105 transition">SALVA TUTTO</button>
            <button onClick={() => setAdmin(false)} className="bg-white text-red-500 border border-red-50 px-8 py-4 rounded-2xl font-black shadow-sm hover:bg-red-50 transition">ESCI</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-3">
            {[
              { id: 'home', icon: 'fa-home', label: 'Dashboard Hero' },
              { id: 'courts', icon: 'fa-images', label: 'Gallery Campi' },
              { id: 'schedules', icon: 'fa-clock', label: 'Orari Campi' },
              { id: 'events', icon: 'fa-calendar-star', label: 'Eventi' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-6 rounded-3xl font-black transition-all flex items-center ${activeTab === tab.id ? 'bg-[#5C6B89] text-white shadow-2xl transform -translate-y-1' : 'bg-white text-gray-400 hover:text-[#5C6B89]'}`}
              >
                <i className={`fas ${tab.icon} w-10 text-xl`}></i> {tab.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-[3rem] shadow-sm p-10 border border-gray-100">
            {activeTab === 'home' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-3xl font-black text-[#5C6B89] mb-10 border-b pb-6 uppercase tracking-tighter">Hero Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Titolo Principale</label>
                    <input className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold" value={tempConfig.hero.title} onChange={e => setTempConfig({...tempConfig, hero: {...tempConfig.hero, title: e.target.value}})}/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Highlight</label>
                    <input className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold text-[#A8D695]" value={tempConfig.hero.highlight} onChange={e => setTempConfig({...tempConfig, hero: {...tempConfig.hero, highlight: e.target.value}})}/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sottotitolo</label>
                    <textarea rows={3} className="w-full p-5 bg-gray-50 rounded-2xl border-none" value={tempConfig.hero.subtitle} onChange={e => setTempConfig({...tempConfig, hero: {...tempConfig.hero, subtitle: e.target.value}})}/>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courts' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                {(['tennis', 'padel'] as const).map(type => (
                  <div key={type} className="bg-gray-50 p-8 rounded-[2.5rem]">
                    <h3 className="text-2xl font-black text-[#5C6B89] mb-6 uppercase tracking-tighter">Gallery {type.toUpperCase()}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      {tempConfig.courts[type].imageUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                          <img src={url} className="w-full h-full object-cover"/>
                          <button onClick={() => removeImage(type, i)} className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"><i className="fas fa-trash-alt text-xs"></i></button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <input 
                        className="flex-1 p-5 bg-white rounded-2xl border-none text-sm" 
                        placeholder="Incolla URL Immagine..."
                        value={newImgUrl}
                        onChange={e => setNewImgUrl(e.target.value)}
                      />
                      <button onClick={() => addImage(type)} className="bg-[#5C6B89] text-white px-8 py-4 rounded-2xl font-black shadow-lg">AGGIUNGI</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'schedules' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <h2 className="text-3xl font-black text-[#5C6B89] mb-4 uppercase tracking-tighter">Programmazione Oraria</h2>
                <p className="text-gray-400 text-sm mb-10">Seleziona gli slot orari attivi per ogni singolo campo. Gli utenti vedranno solo gli slot selezionati qui.</p>
                
                {[...tempConfig.courts.tennis.individualCourts, ...tempConfig.courts.padel.individualCourts].map(court => (
                  <div key={court.id} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-xl font-black text-[#5C6B89] uppercase tracking-tighter">{court.name}</h4>
                      <span className="text-[10px] font-black bg-white px-4 py-1.5 rounded-full shadow-sm text-gray-400 tracking-widest uppercase">{court.id}</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2">
                      {POSSIBLE_SLOTS.map(slot => (
                        <button 
                          key={slot}
                          onClick={() => toggleSlot(court.id, slot)}
                          className={`py-3 rounded-xl text-[10px] font-bold transition-all border ${court.slots.includes(slot) ? 'bg-[#A8D695] text-white border-[#A8D695] shadow-md' : 'bg-white text-gray-300 border-gray-50'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
