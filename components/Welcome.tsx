
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-white px-6">
      <div className="glass-effect p-8 md:p-12 rounded-[3rem] max-w-xl animate-fade-in shadow-2xl border border-white/20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 italic tracking-tighter drop-shadow-lg">CalmaVibe</h1>
        <p className="text-xl md:text-2xl mb-10 leading-relaxed font-light opacity-90">
          Tu refugio digital de paz. <br/> Respira, conecta y sana.
        </p>
        <button 
          onClick={onStart}
          className="bg-white text-blue-900 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 transform active:scale-95"
        >
          Comenzar viaje
        </button>
      </div>
    </div>
  );
};

export default Welcome;
