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

  // 🔐 NUEVO: control legal
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const acceptedStatus = localStorage.getItem("legalAccepted");
    if (acceptedStatus === "true") {
      setAccepted(true);
    }
  }, []);

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

  // 🔐 BLOQUEO LEGAL
  if (!accepted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6 z-50">
        <div className="bg-white text-black max-w-lg p-6 rounded-xl shadow-xl">

          <h2 className="text-xl font-bold mb-4">
            Aviso Importante
          </h2>

          <p className="text-sm mb-4 leading-relaxed">
            CalmaVibe es una plataforma de acompañamiento emocional y bienestar general.
            <br /><br />
            El contenido disponible en esta aplicación (música, textos, herramientas y conversaciones) tiene fines informativos y de apoyo personal únicamente.
            <br /><br />
            No sustituye atención médica, psicológica o psiquiátrica profesional.
            <br /><br />
            No realizamos diagnósticos, tratamientos ni recomendaciones médicas.
            <br /><br />
            Si estás atravesando una crisis emocional o cualquier situación de riesgo, busca ayuda profesional inmediata.
            <br /><br />
            Al utilizar esta aplicación, aceptas que el uso es bajo tu propia responsabilidad.
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
      className={`min-h-screen w-full relative flex flex-col transition-colors duration-700 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
      style={{
        backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(0,0,0,0.6), rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85), rgba(255,255,255,0.95)'}), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="p-4 md:p-6 flex justify-between items-center text-white z-10">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className={`text-2xl font-bold italic ${!isDarkMode && 'text-blue-900'}`}>
          CalmaVibe
        </button>

        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className={`flex-1 px-4 py-8 max-w-6xl mx-auto w-full z-10 mb-24`}>
        {renderView()}
      </main>

      {isAuthenticated && (
        <Navigation currentView={currentView} setView={setCurrentView} />
      )}
    </div>
  );
};

export default App;