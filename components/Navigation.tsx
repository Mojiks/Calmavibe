
import React from 'react';
import { AppView } from '../types';
import { Home, MessageCircle, MapPin, BookOpen, PlayCircle, Music, Wind, PenTool, Users } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Inicio', icon: <Home size={20} /> },
    { id: AppView.DIRECTORY, label: 'Ayuda', icon: <MapPin size={20} /> },
    { id: AppView.BOOKS, label: 'Libros', icon: <BookOpen size={20} /> },
    { id: AppView.ZEN_SPACE, label: 'Zen', icon: <Wind size={20} /> },
    { id: AppView.JOURNAL, label: 'Diario', icon: <PenTool size={20} /> },
    { id: AppView.FORUM, label: 'Foro', icon: <Users size={20} /> },
  ];

  return (
    <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 glass-effect rounded-full px-4 py-3 flex gap-1 md:gap-3 z-50 shadow-2xl border border-white/30 max-w-[95vw] overflow-x-auto no-scrollbar`}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col items-center p-2 rounded-2xl min-w-[50px] md:min-w-[70px] transition-all ${
            currentView === item.id 
              ? 'active-nav scale-110 text-white' 
              : 'text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="mb-1">{item.icon}</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
