
import React from 'react';
import { useSite } from '../context/SiteContext';

const CourtsSection: React.FC = () => {
  const { config } = useSite();

  return (
    <section id="courts" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <span className="text-[#A8D695] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Performance First</span>
          <h2 className="text-5xl font-bold text-[#5C6B89] mb-4 tracking-tighter">I CAMPI DI PAITONE ARENA</h2>
          <div className="w-20 h-1.5 bg-[#A8D695]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Tennis Courts */}
          <div className="group">
            <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden relative mb-8 shadow-2xl">
              <img 
                src={config.courts.tennis.imageUrl} 
                alt="Tennis Courts" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-[#5C6B89] px-6 py-2 rounded-2xl text-xs font-bold shadow-lg">
                TENNIS
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-3xl font-bold mb-4 text-[#5C6B89]">{config.courts.tennis.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {config.courts.tennis.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {config.courts.tennis.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
              <a href="#booking" className="inline-flex items-center text-[#A8D695] font-bold text-lg hover:translate-x-2 transition-transform">
                Prenota ora <i className="fas fa-arrow-right ml-3 text-sm"></i>
              </a>
            </div>
          </div>

          {/* Padel Courts */}
          <div className="group">
            <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden relative mb-8 shadow-2xl">
              <img 
                src={config.courts.padel.imageUrl} 
                alt="Padel Courts" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-[#A8D695] text-white px-6 py-2 rounded-2xl text-xs font-bold shadow-lg">
                PADEL INDOOR
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-3xl font-bold mb-4 text-[#5C6B89]">{config.courts.padel.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {config.courts.padel.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {config.courts.padel.tags.map(tag => (
                  <span key={tag} className="bg-[#A8D695]/10 text-[#A8D695] px-4 py-2 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
              <a href="#booking" className="inline-flex items-center text-[#A8D695] font-bold text-lg hover:translate-x-2 transition-transform">
                Prenota ora <i className="fas fa-arrow-right ml-3 text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourtsSection;
