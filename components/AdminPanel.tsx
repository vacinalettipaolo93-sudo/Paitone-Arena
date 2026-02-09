
import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SiteEvent, SiteConfig } from '../types';

const AdminPanel: React.FC = () => {
  const { config, updateConfig, setAdmin } = useSite();
  // Creiamo una copia profonda per evitare mutazioni indesiderate durante l'editing
  const [tempConfig, setTempConfig] = useState<SiteConfig>(JSON.parse(JSON.stringify(config)));
  const [activeTab, setActiveTab] = useState<'home' | 'courts' | 'events' | 'footer'>('home');

  const handleSave = () => {
    updateConfig(tempConfig);
    alert('Sito aggiornato con successo! Le modifiche sono ora live.');
  };

  const addEvent = () => {
    const newEvent: SiteEvent = {
      id: Date.now().toString(),
      title: "Nuovo Evento",
      date: "Data da definire",
      description: "Inserisci qui i dettagli dell'evento...",
      imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800",
      category: "Torneo"
    };
    setTempConfig(prev => ({
      ...prev,
      events: [...(prev.events || []), newEvent]
    }));
  };

  const deleteEvent = (id: string) => {
    if(window.confirm('Sei sicuro di voler eliminare questo evento?')) {
      setTempConfig(prev => ({
        ...prev,
        events: prev.events.filter(e => e.id !== id)
      }));
    }
  };

  const updateEvent = (id: string, updates: Partial<SiteEvent>) => {
    setTempConfig(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...updates } : e)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#5C6B89] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-tools text-xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#5C6B89]">Dashboard</h1>
              <p className="text-gray-400 text-sm">Gestione Paitone Arena</p>
            </div>
          </div>
          <button 
            onClick={() => setAdmin(false)}
            className="bg-white text-red-500 px-6 py-3 rounded-2xl font-bold shadow-sm hover:shadow-md transition border border-red-50"
          >
            Torna al Sito
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
          {/* Sidebar Nav */}
          <div className="w-full md:w-72 bg-gray-50 border-r border-gray-100 p-8 flex flex-col space-y-3">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-left p-4 rounded-2xl font-bold transition flex items-center ${activeTab === 'home' ? 'bg-[#5C6B89] text-white shadow-xl' : 'text-gray-400 hover:bg-white hover:text-[#5C6B89]'}`}
            >
              <i className="fas fa-home w-8"></i> Home & Hero
            </button>
            <button 
              onClick={() => setActiveTab('courts')}
              className={`text-left p-4 rounded-2xl font-bold transition flex items-center ${activeTab === 'courts' ? 'bg-[#5C6B89] text-white shadow-xl' : 'text-gray-400 hover:bg-white hover:text-[#5C6B89]'}`}
            >
              <i className="fas fa-table-tennis w-8"></i> Campi & Foto
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`text-left p-4 rounded-2xl font-bold transition flex items-center ${activeTab === 'events' ? 'bg-[#5C6B89] text-white shadow-xl' : 'text-gray-400 hover:bg-white hover:text-[#5C6B89]'}`}
            >
              <i className="fas fa-calendar-alt w-8"></i> Eventi
            </button>
            <button 
              onClick={() => setActiveTab('footer')}
              className={`text-left p-4 rounded-2xl font-bold transition flex items-center ${activeTab === 'footer' ? 'bg-[#5C6B89] text-white shadow-xl' : 'text-gray-400 hover:bg-white hover:text-[#5C6B89]'}`}
            >
              <i className="fas fa-info-circle w-8"></i> Contatti
            </button>
            
            <div className="mt-auto pt-8">
              <button 
                onClick={handleSave}
                className="w-full bg-[#A8D695] text-white py-5 rounded-[1.5rem] font-black shadow-lg hover:bg-[#97c584] transition-all transform hover:-translate-y-1 uppercase tracking-widest text-sm"
              >
                Salva Modifiche
              </button>
            </div>
          </div>

          {/* Edit Content */}
          <div className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[800px] bg-white">
            {activeTab === 'home' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold text-[#5C6B89]">Home & Visual</h2>
                  <p className="text-gray-400 text-sm">Modifica i testi principali e l'immagine di apertura</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Titolo Arena</label>
                    <input 
                      type="text" 
                      value={tempConfig.hero.title}
                      onChange={(e) => setTempConfig(prev => ({...prev, hero: {...prev.hero, title: e.target.value}}))}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Parola Evidenziata</label>
                    <input 
                      type="text" 
                      value={tempConfig.hero.highlight}
                      onChange={(e) => setTempConfig(prev => ({...prev, hero: {...prev.hero, highlight: e.target.value}}))}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none font-bold text-[#A8D695]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Sottotitolo Introduzione</label>
                    <textarea 
                      rows={3}
                      value={tempConfig.hero.subtitle}
                      onChange={(e) => setTempConfig(prev => ({...prev, hero: {...prev.hero, subtitle: e.target.value}}))}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">URL Immagine Hero</label>
                    <input 
                      type="text" 
                      value={tempConfig.hero.imageUrl}
                      onChange={(e) => setTempConfig(prev => ({...prev, hero: {...prev.hero, imageUrl: e.target.value}}))}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none text-blue-500 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-6 flex items-center">
                    <i className="fas fa-chart-line mr-3 text-[#A8D695]"></i> Statistiche Rapide
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">Tennis</label>
                      <input type="text" value={tempConfig.stats.tennis} onChange={(e) => setTempConfig(prev => ({...prev, stats: {...prev.stats, tennis: e.target.value}}))} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-black text-center"/>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">Padel</label>
                      <input type="text" value={tempConfig.stats.padel} onChange={(e) => setTempConfig(prev => ({...prev, stats: {...prev.stats, padel: e.target.value}}))} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-black text-center"/>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">Soci</label>
                      <input type="text" value={tempConfig.stats.members} onChange={(e) => setTempConfig(prev => ({...prev, stats: {...prev.stats, members: e.target.value}}))} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-black text-center"/>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">Maestri</label>
                      <input type="text" value={tempConfig.stats.coaches} onChange={(e) => setTempConfig(prev => ({...prev, stats: {...prev.stats, coaches: e.target.value}}))} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-black text-center"/>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courts' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold text-[#5C6B89]">Campi & Strutture</h2>
                  <p className="text-gray-400 text-sm">Aggiorna le descrizioni tecniche e le foto dei campi</p>
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <h3 className="font-bold text-lg mb-6 text-[#5C6B89]">Sezione Tennis</h3>
                  <div className="space-y-4">
                    <input placeholder="Titolo Sezione" value={tempConfig.courts.tennis.title} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, tennis: {...prev.courts.tennis, title: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl"/>
                    <textarea placeholder="Descrizione Tecnica" rows={3} value={tempConfig.courts.tennis.description} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, tennis: {...prev.courts.tennis, description: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl"/>
                    <input placeholder="URL Immagine" value={tempConfig.courts.tennis.imageUrl} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, tennis: {...prev.courts.tennis, imageUrl: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-xs text-blue-500"/>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                  <h3 className="font-bold text-lg mb-6 text-[#A8D695]">Sezione Padel</h3>
                  <div className="space-y-4">
                    <input placeholder="Titolo Sezione" value={tempConfig.courts.padel.title} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, padel: {...prev.courts.padel, title: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl"/>
                    <textarea placeholder="Descrizione Tecnica" rows={3} value={tempConfig.courts.padel.description} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, padel: {...prev.courts.padel, description: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl"/>
                    <input placeholder="URL Immagine" value={tempConfig.courts.padel.imageUrl} onChange={(e) => setTempConfig(prev => ({...prev, courts: {...prev.courts, padel: {...prev.courts.padel, imageUrl: e.target.value}}}))} className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-xs text-blue-500"/>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#5C6B89]">Gestione Eventi</h2>
                    <p className="text-gray-400 text-sm">Aggiungi o rimuovi tornei e corsi</p>
                  </div>
                  <button 
                    onClick={addEvent}
                    className="bg-[#A8D695] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition flex items-center"
                  >
                    <i className="fas fa-plus mr-2"></i> AGGIUNGI EVENTO
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {tempConfig.events.length === 0 ? (
                    <p className="text-center py-10 text-gray-400 italic">Nessun evento presente. Clicca su "+ Aggiungi Evento" per iniziare.</p>
                  ) : (
                    tempConfig.events.map((ev) => (
                      <div key={ev.id} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-200 relative group">
                        <button 
                          onClick={() => deleteEvent(ev.id)} 
                          className="absolute top-6 right-6 text-red-400 hover:text-red-600 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Titolo</label>
                              <input value={ev.title} onChange={(e) => updateEvent(ev.id, {title: e.target.value})} placeholder="Es: Torneo Open Padel" className="w-full p-4 rounded-xl border border-gray-200 font-bold"/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Data</label>
                                <input value={ev.date} onChange={(e) => updateEvent(ev.id, {date: e.target.value})} placeholder="Es: 15 Settembre" className="w-full p-4 rounded-xl border border-gray-200"/>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Categoria</label>
                                <select 
                                  value={ev.category} 
                                  onChange={(e) => updateEvent(ev.id, {category: e.target.value})} 
                                  className="w-full p-4 rounded-xl border border-gray-200 bg-white"
                                >
                                  <option value="Torneo">Torneo</option>
                                  <option value="Clinics">Clinics</option>
                                  <option value="Social">Social</option>
                                  <option value="Corsi">Corsi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Descrizione</label>
                              <textarea rows={2} value={ev.description} onChange={(e) => updateEvent(ev.id, {description: e.target.value})} placeholder="Dettagli dell'evento..." className="w-full p-4 rounded-xl border border-gray-200"/>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">URL Foto</label>
                              <input value={ev.imageUrl} onChange={(e) => updateEvent(ev.id, {imageUrl: e.target.value})} placeholder="URL Immagine" className="w-full p-4 rounded-xl border border-gray-200 text-xs text-blue-500"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold text-[#5C6B89]">Contatti & Footer</h2>
                  <p className="text-gray-400 text-sm">Aggiorna le informazioni di contatto aziendali</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Indirizzo Sede</label>
                    <input value={tempConfig.footer.address} onChange={(e) => setTempConfig(prev => ({...prev, footer: {...prev.footer, address: e.target.value}}))} placeholder="Indirizzo completo" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Telefono di Contatto</label>
                    <input value={tempConfig.footer.phone} onChange={(e) => setTempConfig(prev => ({...prev, footer: {...prev.footer, phone: e.target.value}}))} placeholder="Numero di telefono" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Email Ufficiale</label>
                    <input value={tempConfig.footer.email} onChange={(e) => setTempConfig(prev => ({...prev, footer: {...prev.footer, email: e.target.value}}))} placeholder="Indirizzo Email" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
