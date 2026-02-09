
import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourtsSection from './components/CourtsSection';
import BookingSection from './components/BookingSection';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import AdminPanel from './components/AdminPanel';

const SiteContent: React.FC = () => {
  const { isAdmin, config, isLoading } = useSite();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="loader mb-4"></div>
        <p className="text-[#5C6B89] font-bold animate-pulse tracking-widest uppercase text-xs">Caricamento Arena...</p>
      </div>
    );
  }

  if (isAdmin) return <AdminPanel />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CourtsSection />
        
        {/* Statistics or Social Proof */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">{config.stats.tennis}</p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Campi Tennis</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">{config.stats.padel}</p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Padel Indoor</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-900 mb-2">{config.stats.members}</p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Soci Attivi</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-900 mb-2">{config.stats.coaches}</p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Maestri Certificati</p>
              </div>
            </div>
          </div>
        </section>

        <EventsSection />
        <BookingSection />
        
        {/* Special Offers Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#5C6B89] to-[#4a566e] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 md:w-2/3">
                <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter">VUOI MIGLIORARE IL TUO LIVELLO?</h2>
                <p className="text-xl mb-8 opacity-90 font-light">
                  I nostri maestri nazionali FITP sono a tua disposizione per lezioni individuali o corsi collettivi per adulti e bambini.
                </p>
                <button className="bg-[#A8D695] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#97c584] transition shadow-xl shadow-[#A8D695]/20">
                  Richiedi una prova gratuita
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1622279457486-62dcc4a497c8?auto=format&fit=crop&q=80&w=800" 
                  alt="Coach" 
                  className="h-full object-cover opacity-50"
                  style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <SiteProvider>
      <SiteContent />
    </SiteProvider>
  );
};

export default App;
