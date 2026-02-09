
import React from 'react';
import { useSite } from '../context/SiteContext';

const Hero: React.FC = () => {
  const { config } = useSite();

  return (
    <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={config.hero.imageUrl} 
          alt="Hero" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#5C6B89]/90 via-[#5C6B89]/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="inline-block bg-[#A8D695] text-white px-4 py-1 rounded-full text-xs font-bold tracking-[0.3em] mb-6 uppercase">
          by NEXT
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.9] max-w-3xl">
          {config.hero.title} <br/><span className="text-[#A8D695]">{config.hero.highlight}</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-xl text-gray-100 font-light">
          {config.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#booking" 
            className="bg-[#A8D695] hover:bg-[#97c584] text-white px-10 py-4 rounded-xl font-bold text-lg text-center transition-all transform hover:-translate-y-1 shadow-lg shadow-[#A8D695]/20"
          >
            Prenota un Campo
          </a>
          <a 
            href="#courts" 
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg text-center transition-all"
          >
            Le Nostre Strutture
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <i className="fas fa-mouse text-white text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;
