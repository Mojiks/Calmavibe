import { useState, useEffect } from "react";

export default function Disclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("calmavibe_accept");
    if (!accepted) setVisible(true);
  }, []);

  const aceptar = () => {
    localStorage.setItem("calmavibe_accept", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">

      <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl max-w-md text-white text-center">

        <h2 className="text-lg mb-4">Importante</h2>

        <p className="text-sm mb-4 opacity-80">
          CalmaVibe es un espacio de apoyo emocional. No sustituye atención médica ni psicológica.
        </p>

        <p className="text-sm mb-6 opacity-70">
          Si estás pasando por ansiedad o depresión, recuerda que no estás solo.
        </p>

        <button
          onClick={aceptar}
          className="px-6 py-2 bg-white/20 rounded hover:bg-white/30"
        >
          Aceptar y continuar
        </button>

      </div>
    </div>
  );
}