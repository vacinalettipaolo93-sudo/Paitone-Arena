
import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';

const BookingSection: React.FC = () => {
  const { config } = useSite();
  const [selectedSport, setSelectedSport] = useState<'Tennis' | 'Padel'>('Tennis');
  const [selectedCourtId, setSelectedCourtId] = useState<string>('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const currentSportCourts = useMemo(() => {
    return selectedSport === 'Tennis' 
      ? config.courts.tennis.individualCourts 
      : config.courts.padel.individualCourts;
  }, [selectedSport, config]);

  // Se cambiamo sport, resettiamo il campo selezionato
  React.useEffect(() => {
    setSelectedCourtId(currentSportCourts[0]?.id || '');
    setSelectedSlot('');
  }, [selectedSport, currentSportCourts]);

  const activeCourt = useMemo(() => {
    return currentSportCourts.find(c => c.id === selectedCourtId);
  }, [selectedCourtId, currentSportCourts]);

  return (
    <section id="booking" className="py-32 bg-[#5C6B89] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#A8D695] font-bold tracking-[0.2em] mb-4 block uppercase text-sm">Real-Time Schedule</span>
            <h2 className="text-6xl font-black mb-8 text-white tracking-tighter leading-none uppercase">Riserva la tua Sfida</h2>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-lg font-light">
              Ogni campo ha la sua anima e i suoi orari. Scegli dove scendere in campo oggi a Paitone Arena.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/5">
                <i className="fas fa-clock text-3xl text-[#A8D695] mb-4"></i>
                <h4 className="font-bold text-xl text-white mb-2">Orari Personalizzati</h4>
                <p className="text-white/50 text-sm">Ogni campo segue intervalli precisi per garantirti il massimo tempo di gioco.</p>
              </div>
              <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/5">
                <i className="fas fa-map-pin text-3xl text-[#A8D695] mb-4"></i>
                <h4 className="font-bold text-xl text-white mb-2">Selezione Campo</h4>
                <p className="text-white/50 text-sm">Seleziona esattamente il campo su cui preferisci giocare.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl">
            {/* Sport Selector */}
            <div className="flex mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setSelectedSport('Tennis')}
                className={`flex-1 py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${selectedSport === 'Tennis' ? 'bg-[#5C6B89] text-white shadow-xl' : 'text-gray-400'}`}
              >
                TENNIS
              </button>
              <button 
                onClick={() => setSelectedSport('Padel')}
                className={`flex-1 py-4 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${selectedSport === 'Padel' ? 'bg-[#A8D695] text-white shadow-xl' : 'text-gray-400'}`}
              >
                PADEL
              </button>
            </div>

            <div className="space-y-8">
              {/* Court Selector */}
              <div>
                <label className="block text-[10px] font-black text-[#5C6B89] mb-4 uppercase tracking-[0.2em]">Seleziona il Campo</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currentSportCourts.map(court => (
                    <button 
                      key={court.id}
                      onClick={() => setSelectedCourtId(court.id)}
                      className={`py-4 px-3 rounded-2xl text-[10px] font-black border transition-all ${selectedCourtId === court.id ? 'bg-[#5C6B89] text-white border-[#5C6B89] shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-[#5C6B89]'}`}
                    >
                      {court.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[10px] font-black text-[#5C6B89] mb-4 uppercase tracking-[0.2em]">Data</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none text-[#5C6B89] font-bold"
                />
              </div>

              {/* Slots */}
              <div>
                <label className="block text-[10px] font-black text-[#5C6B89] mb-4 uppercase tracking-[0.2em]">Orari Disponibili</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {activeCourt?.slots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${selectedSlot === slot ? 'bg-[#A8D695] text-white border-[#A8D695] shadow-md' : 'bg-gray-50 text-[#5C6B89] border-gray-100 hover:border-[#A8D695]'}`}
                    >
                      {slot}
                    </button>
                  ))}
                  {(!activeCourt?.slots || activeCourt.slots.length === 0) && (
                    <p className="col-span-full text-center text-gray-400 text-xs py-4">Nessun orario configurato per questo campo.</p>
                  )}
                </div>
              </div>

              <button className={`w-full py-6 rounded-3xl font-black text-white transition-all shadow-2xl transform active:scale-95 uppercase tracking-[0.2em] text-sm ${selectedSlot ? 'bg-[#A8D695] hover:bg-[#97c584] shadow-[#A8D695]/30' : 'bg-gray-200 cursor-not-allowed text-gray-400'}`}>
                PRENOTA ORA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
