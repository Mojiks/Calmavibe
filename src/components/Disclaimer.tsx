import { useState } from "react";

export default function Disclaimer() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem("calmavibe_accept");
    } catch {
      return true;
    }
  });

  const aceptar = () => {
    try {
      localStorage.setItem("calmavibe_accept", "true");
    } catch {
      // El aviso puede cerrarse aunque el almacenamiento local esté bloqueado.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="max-w-md rounded-xl bg-black/70 p-6 text-center text-white backdrop-blur-md">
        <h2 className="mb-4 text-lg">Importante</h2>

        <p className="mb-4 text-sm opacity-80">
          CalmaVibe es un espacio de apoyo emocional. No sustituye atención médica ni psicológica.
        </p>

        <p className="mb-6 text-sm opacity-70">
          Si estás pasando por ansiedad o depresión, recuerda que no estás solo.
        </p>

        <button
          type="button"
          onClick={aceptar}
          className="rounded px-6 py-2 bg-white/20 hover:bg-white/30"
        >
          Aceptar y continuar
        </button>
      </div>
    </div>
  );
}
