import React, { useState } from 'react';
import { AppView, UserProfile } from './types';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import ChatAI from './components/ChatAI';
import Profile from './components/Profile';
import ZenSpace from './components/ZenSpace';
import Books from './components/Books';
import Journal from './components/Journal';
import Forum from './components/Forum';
import Directory from './components/Directory';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const zenImages = [
    'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800'
  ];

  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Usuario Calma',
    photoUrl: zenImages[Math.floor(Math.random() * zenImages.length)],
    medicalInfo: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const backgroundUrl = isDarkMode 
    ? "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
    : "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000";

  const renderView = () => {
    switch (currentView) {
      case AppView.WELCOME:
        return <Welcome onStart={() => setCurrentView(AppView.AUTH)} />;
      case AppView.AUTH:
        return <Auth onLogin={() => {
          setIsAuthenticated(true);
          setCurrentView(AppView.DASHBOARD);
        }} />;
      case AppView.DASHBOARD:
        return (
          <div className={`flex flex-col items-center justify-center min-h-[60vh] text-center px-4 ${isDarkMode ? 'text-white' : 'text-blue-950'}`}>
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4 italic">
              Paz, {userProfile.fullName.split(' ')[0]}
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md max-w-lg font-light leading-relaxed">
              "La paz interior empieza en el momento en que decides no permitir que otra persona o evento controle tus emociones."
            </p>
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${isDarkMode ? 'border-white/30' : 'border-blue-900/30'}`}>
                <span className="text-2xl">🧘</span>
              </div>
              <p className="text-sm opacity-60 tracking-widest uppercase">Explora usando la barra inferior</p>
            </div>
          </div>
        );
      case AppView.CHAT: return <ChatAI />;
      case AppView.PROFILE: return <Profile profile={userProfile} onUpdate={setUserProfile} />;
      case AppView.ZEN_SPACE: return <ZenSpace />;
      case AppView.BOOKS: return <Books />;
      case AppView.JOURNAL: return <Journal />;
      case AppView.FORUM: return <Forum userProfile={userProfile} />;
      case AppView.DIRECTORY: return <Directory />;
      default: return <Welcome onStart={() => setCurrentView(AppView.AUTH)} />;
    }
  };

  return (
    <div 
      className={`min-h-screen w-full relative flex flex-col transition-colors duration-700 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
      style={{
        backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(0,0,0,0.6), rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85), rgba(255,255,255,0.95)'}), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="p-4 md:p-6 flex justify-between items-center text-white z-10">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className={`text-2xl font-bold tracking-tight italic ${!isDarkMode && 'text-blue-900'}`}>
          CalmaVibe
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-blue-900/10 hover:bg-blue-900/20 text-blue-900'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated && (
            <button 
              onClick={() => setCurrentView(AppView.PROFILE)} 
              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-110 ${isDarkMode ? 'border-white/50' : 'border-blue-900/50'}`}
            >
              <img src={userProfile.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            </button>
          )}
        </div>
      </header>

      <main className={`flex-1 overflow-y-auto px-4 py-8 max-w-6xl mx-auto w-full z-10 mb-24 ${isDarkMode ? 'text-white' : 'text-blue-950'}`}>
        {renderView()}
      </main>

      {isAuthenticated && currentView !== AppView.WELCOME && currentView !== AppView.AUTH && (
        <>
          <Navigation currentView={currentView} setView={setCurrentView} />
        </>
      )}
    </div>
  );
};

export default App;
