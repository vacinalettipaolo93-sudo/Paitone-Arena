
import React from 'react';
import { useSite } from '../context/SiteContext';

const EventsSection: React.FC = () => {
  const { config } = useSite();

  return (
    <section id="events" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[#A8D695] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Cosa succede in Arena</span>
          <h2 className="text-5xl font-bold text-[#5C6B89] mb-4 tracking-tighter">EVENTI & TORNEI</h2>
          <div className="w-20 h-1.5 bg-[#A8D695] mx-auto"></div>
        </div>

        {config.events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {config.events.map((event) => (
              <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-[#A8D695] uppercase tracking-wider">{event.category}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <i className="far fa-calendar-alt mr-2 text-[#A8D695]"></i> {event.date}
                  </div>
                  <h3 className="text-2xl font-bold text-[#5C6B89] mb-4">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {event.description}
                  </p>
                  <button className="text-[#5C6B89] font-bold text-sm flex items-center hover:text-[#A8D695] transition">
                    MAGGIORI INFO <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Nessun evento programmato al momento. Resta sintonizzato!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
