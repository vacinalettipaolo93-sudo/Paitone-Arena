
import React from 'react';
import { useSite } from '../context/SiteContext';

const CourtsSection: React.FC = () => {
  const { config } = useSite();

  const renderCourtBlock = (type: 'tennis' | 'padel', courtData: any) => (
    <div className="group mb-20">
      <div className="mb-8">
        <h3 className="text-4xl font-bold mb-4 text-[#5C6B89] flex items-center">
          {type === 'tennis' ? (
            <i className="fas fa-baseball-ball mr-4 text-[#A8D695]"></i>
          ) : (
            <i className="fas fa-table-tennis mr-4 text-[#A8D695]"></i>
          )}
          {courtData.title}
        </h3>
        <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
          {courtData.description}
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {courtData.tags.map((tag: string) => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">{tag}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courtData.imageUrls.map((url: string, index: number) => (
          <div key={index} className={`relative overflow-hidden rounded-[2rem] shadow-xl aspect-[4/3] ${index === 0 ? 'md:col-span-2' : ''}`}>
            <img 
              src={url} 
              alt={`${courtData.title} ${index + 1}`} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
        {courtData.imageUrls.length === 0 && (
          <div className="col-span-full h-64 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-400 italic">
            Nessuna foto disponibile per questa sezione.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="courts" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <span className="text-[#A8D695] font-bold text-sm tracking-[0.3em] uppercase mb-4 block">Professional Facilities</span>
          <h2 className="text-6xl font-black text-[#5C6B89] mb-6 tracking-tighter uppercase">I Nostri Campi</h2>
          <div className="w-32 h-2 bg-[#A8D695] rounded-full"></div>
        </div>

        {renderCourtBlock('tennis', config.courts.tennis)}
        <div className="my-32 border-t border-gray-100"></div>
        {renderCourtBlock('padel', config.courts.padel)}
      </div>
    </section>
  );
};

export default CourtsSection;
