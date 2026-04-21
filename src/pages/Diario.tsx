import { useState, useEffect } from "react";

export default function Diario() {
  const [texto, setTexto] = useState("");
  const [modo, setModo] = useState<"diario" | "liberacion" | "ritual" | "final">("diario");

  const hayTexto = texto.trim().length > 0;

  useEffect(() => {
    const saved = localStorage.getItem("calmavibe_diario");
    if (saved) setTexto(saved);
  }, []);

  const guardar = () => {
    if (!hayTexto) return;
    localStorage.setItem("calmavibe_diario", texto);
  };

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center px-4 relative pb20"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* CONTENIDO */}
      <div className="relative z-10 w-full max-w-xl text-center">

        {/* ================= DIARIO ================= */}
        {modo === "diario" && (
          <>
            <h1 className="text-3xl font-semibold mb-2">
              Diario Personal
            </h1>

            <p className="text-sm opacity-80 mb-6">
              Tus notas se guardan solo en este dispositivo. Esta herramienta es de apoyo emocional y no sustituye ayuda profesional.
            </p>

            <div className="flex gap-3 justify-center mb-5">
              {/* GUARDAR */}
              <button
                onClick={guardar}
                disabled={!hayTexto}
                className={`px-5 py-2 rounded-lg transition ${
                  hayTexto
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-600 opacity-40 cursor-not-allowed"
                }`}
              >
                Guardar
              </button>

              {/* LIBERACIÓN (SIEMPRE ACTIVA) */}
              <button
                onClick={() => setModo("liberacion")}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
              >
                🌿 Liberación emocional
              </button>
            </div>

            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe lo que sientes..."
              className="w-full h-44 p-4 rounded-xl bg-black/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </>
        )}

        {/* ================= LIBERACIÓN ================= */}
        {modo === "liberacion" && (
          <>
            <h1 className="text-3xl font-semibold mb-3">
              Liberación Emocional
            </h1>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg mb-4 text-sm border border-white/10">
              ℹ️ Este ejercicio te ayuda a liberar emociones, recuerdos o pensamientos que deseas soltar.
            </div>

            <p className="mb-1">No te guardes nada. Escribe sin filtros. Libérate.</p>

            <p className="text-xs opacity-70 mb-5">
              Esta herramienta es de apoyo emocional y no sustituye ayuda profesional.
            </p>

            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe todo lo que quieres soltar..."
              className="w-full h-44 p-4 rounded-xl bg-black/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-400 mb-5"
            />

            <button
              onClick={() => setModo("ritual")}
              disabled={!hayTexto}
              className={`w-full py-3 rounded-xl text-lg transition ${
                hayTexto
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30"
                  : "bg-gray-600 opacity-40 cursor-not-allowed"
              }`}
            >
              🔥 Quemar y soltar
            </button>
          </>
        )}

        {/* ================= RITUAL ================= */}
        {modo === "ritual" && (
          <>
            <video
              src="/videos/ritual.mp4"
              autoPlay
              className="w-full rounded-xl mb-4 shadow-xl"
              onEnded={() => setModo("final")}
            />

            <p className="text-sm opacity-80">Respira profundo...</p>
            <p className="italic mt-2 text-white/80">
              “Elijo soltar la resistencia y aprender de esta experiencia”
            </p>
          </>
        )}

        {/* ================= FINAL ================= */}
        {modo === "final" && (
          <>
            <h2 className="text-green-400 text-xl mb-2 font-semibold">
              Has soltado este peso.
            </h2>

            <p className="italic mb-5 text-white/80">
              “Cada proceso es un paso hacia tu paz.”
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setTexto("");
                  setModo("liberacion");
                }}
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition"
              >
                Nueva carta
              </button>

              <button
                onClick={() => setModo("diario")}
                className="bg-gray-500 hover:bg-gray-600 px-5 py-2 rounded-lg transition"
              >
                Volver al diario
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}