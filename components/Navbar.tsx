
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            {/* Logo recreation */}
            <div className="flex items-center">
               <div className="relative w-10 h-10 flex items-center justify-center mr-2">
                 <div className="absolute inset-0 border-4 border-[#A8D695] rounded-full"></div>
                 <div className="absolute bottom-1 right-1 w-6 h-6 border-t-4 border-l-4 border-[#5C6B89] rounded-full rotate-45"></div>
               </div>
               <div className="flex flex-col leading-tight">
                 <span className="text-2xl font-bold text-[#5C6B89] tracking-tighter">PAITONE ARENA</span>
                 <span className="text-[10px] font-semibold text-[#A8D695] uppercase tracking-[0.2em]">Tennis & Padel Club</span>
               </div>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-gray-600 hover:text-[#5C6B89] font-semibold transition">Home</a>
            <a href="#courts" className="text-gray-600 hover:text-[#5C6B89] font-semibold transition">I Campi</a>
            <a href="#events" className="text-gray-600 hover:text-[#5C6B89] font-semibold transition">Eventi</a>
            <a href="#booking" className="text-gray-600 hover:text-[#5C6B89] font-semibold transition">Prenota</a>
            <a href="#contact" className="text-gray-600 hover:text-[#5C6B89] font-semibold transition">Contatti</a>
            <a href="#booking" className="bg-[#A8D695] text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-[#97c584] transition">PRENOTA ORA</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#5C6B89] p-2">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 shadow-xl">
          <a href="#home" onClick={() => setIsOpen(false)} className="block text-[#5C6B89] font-bold text-lg">Home</a>
          <a href="#courts" onClick={() => setIsOpen(false)} className="block text-[#5C6B89] font-bold text-lg">I Campi</a>
          <a href="#events" onClick={() => setIsOpen(false)} className="block text-[#5C6B89] font-bold text-lg">Eventi</a>
          <a href="#booking" onClick={() => setIsOpen(false)} className="block text-[#5C6B89] font-bold text-lg">Prenota</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-[#5C6B89] font-bold text-lg">Contatti</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
