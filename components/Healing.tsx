import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

const Healing: React.FC<Props> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [burning, setBurning] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleBurn = () => {
    if (!text.trim()) return;

    setBurning(true);

    setTimeout(() => {
      setFinished(true);
    }, 5000);
  };

  const reset = () => {
    setFinished(false);
    setBurning(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col gap-4 transition-all duration-500">

      <h2 className="text-2xl font-bold">Liberación Emocional</h2>

      {/* INFO */}
      <div className="bg-white/10 p-3 rounded-lg text-sm">
        🛈 Este ejercicio te ayuda a liberar emociones, recuerdos o pensamientos que deseas soltar.
      </div>

      <p className="text-sm opacity-70">
        No te guardes nada. Escribe sin filtros. Libérate.
      </p>

      {/* AVISO */}
      <p className="text-xs opacity-60">
        Esta herramienta es de apoyo emocional y no sustituye ayuda profesional.
      </p>

      {/* TEXTAREA */}
      {!burning && !finished && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-3 rounded-lg bg-black/20"
          placeholder="Escribe todo lo que quieres soltar..."
        />
      )}

      {/* VIDEO + PROCESO */}
      {burning && !finished && (
        <div className="text-center space-y-4 animate-fade-in">

          <video
            src="/videos/ritual.mp4"
            autoPlay
            muted
            playsInline
            className="w-full max-h-[300px] object-cover rounded-xl shadow-lg"
          />

          <p className="text-orange-300 text-sm animate-pulse">
            Respira profundo…
          </p>

          <p className="text-xs italic opacity-80">
            “Elijo soltar la resistencia y aprender de esta experiencia”
          </p>

        </div>
      )}

      {/* RESULTADO FINAL */}
      {finished && (
        <div className="text-center text-green-400 space-y-3">

          <p>Has soltado este peso.</p>

          <p className="italic text-sm">
            “Cada proceso es un paso hacia tu paz.”
          </p>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={reset}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              Nueva carta
            </button>

            <button
              onClick={onBack}
              className="bg-gray-500 px-4 py-2 rounded-lg"
            >
              Volver al diario
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN */}
      {!burning && !finished && (
        <button
          onClick={handleBurn}
          className="bg-red-500 py-2 rounded-lg"
        >
          🔥 Quemar y soltar
        </button>
      )}

    </div>
  );
};

export default Healing;