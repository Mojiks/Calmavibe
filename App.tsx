import React, { useState, useEffect } from 'react';
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
  const [accepted, setAccepted] = useState(false);

  const zenImages = [
    'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b'
  ];

  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Usuario',
    photoUrl: zenImages[Math.floor(Math.random() * zenImages.length)],
    mood: 'Neutral'
  });

  // 🔥 Cargar perfil guardado
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const acceptedStatus = localStorage.getItem("legalAccepted");
    if (acceptedStatus === "true") {
      setAccepted(true);
    }
  }, []);

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
          <div className="text-center">
            <h1 className="text-5xl font-bold italic">
              Paz, {userProfile.fullName}
            </h1>
            <p className="mt-4 text-lg opacity-80">
              Bienvenido a tu espacio de calma
            </p>
          </div>
        );

      case AppView.CHAT:
        return <ChatAI />;

      case AppView.PROFILE:
        return <Profile profile={userProfile} onUpdate={setUserProfile} />;

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
            Aceptar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* BOTÓN PERFIL */}
      {isAuthenticated && (
        <button
          onClick={() => setCurrentView(AppView.PROFILE)}
          className="fixed top-4 right-4 bg-white/10 p-3 rounded-full z-50"
        >
          👤
        </button>
      )}

      <main className="p-6">
        {renderView()}
      </main>

      {isAuthenticated && (
        <Navigation currentView={currentView} setView={setCurrentView} />
      )}

    </div>
  );
};

export default App;