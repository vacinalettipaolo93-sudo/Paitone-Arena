import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';

const Footer: React.FC = () => {
  const { config, setAdmin } = useSite();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalizziamo l'input per evitare errori di battitura (spazi bianchi)
    const normalizedUser = username.trim().toLowerCase();
    const normalizedPass = password.trim();

    if (normalizedUser === 'admin' && normalizedPass === 'password') {
      console.log("Login successful, switching to admin mode...");
      setAdmin(true);
      setIsLoginModalOpen(false);
      // Forza lo scroll in alto per vedere la dashboard
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  return (
    <>
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
                onClick={() => setIsLoginModalOpen(true)}
                className="group flex items-center space-x-2 text-xs text-gray-600 hover:text-[#A8D695] transition bg-white/5 p-3 rounded-xl border border-white/10 active:scale-95"
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

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1f29]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-[#5C6B89] p-8 text-white relative">
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition"
              >
                <i className="fas fa-times"></i>
              </button>
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Accesso Gestione</h3>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-2">Paitone Arena Admin</p>
            </div>
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-[#5C6B89] uppercase tracking-widest mb-2">Username</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none font-medium"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#5C6B89] uppercase tracking-widest mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#A8D695] outline-none font-medium"
                  placeholder="password"
                />
              </div>
              
              {loginError && (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold text-center border border-red-100 animate-bounce">
                  Credenziali errate. Riprova.
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-[#A8D695] text-white py-5 rounded-2xl font-black shadow-xl shadow-[#A8D695]/20 hover:bg-[#97c584] transition-all transform active:scale-95 uppercase tracking-widest text-sm"
              >
                ENTRA IN DASHBOARD
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;