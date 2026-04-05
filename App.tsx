import React, { useState, useEffect } from 'react';
import { AppView } from './types';

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

// ✅ Tipo limpio
type UserProfile = {
  fullName: string;
  photoUrl: string;
  mood: string;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accepted, setAccepted] = useState(false);

  // ✅ Perfil limpio
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    photoUrl: "",
    mood: ""
  });

  // 🔥 cargar perfil guardado
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  // 🔐 aviso legal
  useEffect(() => {
    const acceptedStatus = localStorage.getItem("legalAccepted");
    if (acceptedStatus === "true") {
      setAccepted(true);
    }
  }, []);

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
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 text-white">
            <h1 className="text-5xl font-bold italic">
              Hola, {userProfile.fullName || "Usuario"}
            </h1>
            <p className="mt-4 text-lg opacity-80">
              Bienvenido a tu espacio de calma
            </p>
          </div>
        );

      case AppView.CHAT:
        return <ChatAI />;

      case AppView.PROFILE:
        return (
          <Profile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onBack={() => setCurrentView(AppView.DASHBOARD)}
          />
        );

      case AppView.ZEN_SPACE:
        return <ZenSpace />;

      case AppView.BOOKS:
        return <Books />;

      case AppView.JOURNAL:
        return <Journal />;

      case AppView.FORUM:
        return <Forum userProfile={userProfile} />;

      case AppView.DIRECTORY:
        return <Directory />;

      default:
        return <Welcome onStart={() => setCurrentView(AppView.AUTH)} />;
    }
  };

  // 🔐 BLOQUE LEGAL
  if (!accepted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6 z-50">
        <div className="bg-white text-black max-w-lg p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Aviso Importante</h2>
          <p className="text-sm mb-4">
            Esta aplicación es de apoyo emocional y no sustituye ayuda profesional.
          </p>
          <button
            onClick={() => {
              localStorage.setItem("legalAccepted", "true");
              setAccepted(true);
            }}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Aceptar y continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen w-full relative flex flex-col ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
      style={{
        backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(0,0,0,0.6), rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85), rgba(255,255,255,0.95)'}), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >

      {/* HEADER */}
      <header className="p-4 flex justify-between items-center text-white">

        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="text-2xl font-bold italic">
          CalmaVibe
        </button>

        <div className="flex gap-3 items-center">

          {isAuthenticated && (
            <button
              onClick={() => setCurrentView(AppView.PROFILE)}
              className="bg-white/10 p-2 rounded-full"
            >
              👤
            </button>
          )}

          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </div>

      </header>

      {/* CONTENIDO */}
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full mb-24">
        {renderView()}
      </main>

      {isAuthenticated && (
        <Navigation currentView={currentView} setView={setCurrentView} />
      )}

    </div>
  );
};

export default App;