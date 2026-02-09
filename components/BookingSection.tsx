
import React, { useState } from 'react';

const BookingSection: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<'Tennis' | 'Padel'>('Tennis');
  const [date, setDate] = useState('');
  
  const timeSlots = [
    "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "21:30"
  ];

  return (
    <section id="booking" className="py-32 bg-[#5C6B89] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A8D695]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#A8D695] font-bold tracking-[0.2em] mb-4 block uppercase">Fast Booking</span>
            <h2 className="text-5xl font-bold mb-8 text-white tracking-tighter leading-none">RISERVA IL TUO POSTO IN ARENA</h2>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-lg">
              La tua prossima sfida ti aspetta. Seleziona la disciplina, scegli l'orario e scendi in campo a Paitone Arena.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <i className="fas fa-shield-alt text-2xl text-[#A8D695]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">Qualità 'NEXT'</h4>
                  <p className="text-white/60 text-sm">Gestione professionale e impianti sempre al top.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <i className="fas fa-bolt text-2xl text-[#A8D695]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">Matchmaking</h4>
                  <p className="text-white/60 text-sm">Usa la nostra chat AI per trovare compagni di gioco.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-2xl relative">
            <div className="absolute -top-6 -right-6 bg-[#A8D695] text-white w-20 h-20 rounded-full flex items-center justify-center font-bold rotate-12 shadow-xl text-sm text-center">
              BOOKING<br/>FAST
            </div>

            <div className="flex mb-10 bg-gray-100 p-1.5 rounded-2xl">
              <button 
                onClick={() => setSelectedSport('Tennis')}
                className={`flex-1 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${selectedSport === 'Tennis' ? 'bg-[#5C6B89] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                TENNIS
              </button>
              <button 
                onClick={() => setSelectedSport('Padel')}
                className={`flex-1 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${selectedSport === 'Padel' ? 'bg-[#A8D695] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                PADEL
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-[#5C6B89] mb-3 uppercase tracking-widest">Scegli la Data</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none text-[#5C6B89] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#5C6B89] mb-3 uppercase tracking-widest">Orari Disponibili</label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(slot => (
                    <button 
                      key={slot}
                      className="py-3 px-2 border border-gray-100 rounded-xl text-xs font-bold text-[#5C6B89] hover:bg-[#A8D695]/10 hover:border-[#A8D695] transition-all"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button className={`w-full py-5 rounded-2xl font-black text-white transition-all mt-6 shadow-xl active:scale-95 ${selectedSport === 'Tennis' ? 'bg-[#5C6B89] hover:bg-[#4a566e] shadow-[#5C6B89]/20' : 'bg-[#A8D695] hover:bg-[#97c584] shadow-[#A8D695]/20'}`}>
                CONFERMA PRENOTAZIONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
