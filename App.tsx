import React, { useState } from "react";

type View =
  | "inicio"
  | "ayuda"
  | "libros"
  | "zen"
  | "diario"
  | "foro"
  | "perfil";

const App: React.FC = () => {
  const [view, setView] = useState<View>("inicio");

  const renderView = () => {
    switch (view) {
      case "inicio":
        return (
          <div className="text-center text-white mt-20">
            <h1 className="text-4xl font-bold italic">
              Hola, Usuario
            </h1>
            <p className="mt-2 opacity-80">
              Bienvenido a tu espacio de calma
            </p>
          </div>
        );

      case "ayuda":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Ayuda</h2>
            <p className="opacity-70 mt-2">
              Encuentra apoyo cercano y recursos útiles.
            </p>
          </div>
        );

      case "libros":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Libros</h2>
          </div>
        );

      case "zen":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Zen</h2>
          </div>
        );

      case "diario":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Diario</h2>
          </div>
        );

      case "foro":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Foro</h2>
          </div>
        );

      case "perfil":
        return (
          <div className="text-white text-center mt-10">
            <h2 className="text-2xl font-bold">Perfil</h2>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773')",
      }}
    >
      {/* CONTENIDO */}
      <div className="p-4">{renderView()}</div>

      {/* MENÚ INFERIOR */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full flex gap-6 text-white text-sm">

        <button onClick={() => setView("inicio")}>INICIO</button>
        <button onClick={() => setView("ayuda")}>AYUDA</button>
        <button onClick={() => setView("libros")}>LIBROS</button>
        <button onClick={() => setView("zen")}>ZEN</button>
        <button onClick={() => setView("diario")}>DIARIO</button>
        <button onClick={() => setView("foro")}>FORO</button>

      </div>
    </div>
  );
};

export default App;