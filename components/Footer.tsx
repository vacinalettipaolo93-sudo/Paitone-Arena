
import React from 'react';
import { useSite } from '../context/SiteContext';

const Footer: React.FC = () => {
  const { config, setAdmin } = useSite();

  const handleAdminAccess = () => {
    const pass = prompt('Inserisci la password amministratore (demo: admin)');
    if (pass === 'admin') {
      setAdmin(true);
      window.scrollTo(0, 0); // Torna in alto per visualizzare il pannello
    } else if (pass !== null) {
      alert('Password errata!');
    }
  };

  return (
    <footer id="contact" className="bg-[#1a1f29] text-gray-400 py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
               <div className="relative w-10 h-10 flex items-center justify-center">
                 <div className="absolute inset-0 border-4 border-[#A8D695] rounded-full"></div>
                 <div className="absolute bottom-1 right-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-full rotate-45"></div>
               </div>
               <div className="flex flex-col leading-tight">
                 <span className="text-2xl font-bold text-white tracking-tighter">PAITONE ARENA</span>
                 <span className="text-[10px] font-semibold text-[#A8D695] uppercase tracking-[0.2em]">Tennis & Padel Club</span>
               </div>
            </div>
            <p className="mb-8 max-w-sm text-sm leading-relaxed">
              Paitone Arena è il punto d'incontro per gli appassionati di sport di racchetta in provincia di Brescia. Tecnologia 'Italian Padel' e campi veloci per un'esperienza pro.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#A8D695] hover:text-white transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#A8D695] hover:text-white transition-all">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-8 uppercase">Contatti</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <i className="fas fa-map-marker-alt text-[#A8D695] mt-1"></i>
                <span>{config.footer.address}</span>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fas fa-phone text-[#A8D695]"></i>
                <span>{config.footer.phone}</span>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fas fa-envelope text-[#A8D695]"></i>
                <span>{config.footer.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-8 uppercase">Gestione</h4>
            <button 
              onClick={handleAdminAccess}
              className="group flex items-center space-x-2 text-xs text-gray-600 hover:text-[#A8D695] transition bg-white/5 p-3 rounded-xl border border-white/5"
            >
              <i className="fas fa-lock text-[#A8D695] group-hover:rotate-12 transition-transform"></i>
              <span>Area Amministratore</span>
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Paitone Arena - Tennis & Padel Club by NEXT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
