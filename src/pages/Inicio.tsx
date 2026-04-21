import { useEffect, useState } from "react";

const frases = [
  "Nada es permanente, todo fluye.",
  "Respira, todo está pasando.",
  "No eres tus pensamientos.",
  "Un paso a la vez.",
  "La calma también es progreso.",
  "Suelta lo que no puedes controlar.",
  "Tu mente merece descanso.",
  "Hoy es suficiente.",
  "Estás haciendo lo mejor que puedes.",
  "Todo llega en su momento.",
];

export default function Inicio() {
  const [frase, setFrase] = useState("");

  const getRandomFrase = () => {
    let nueva = frases[Math.floor(Math.random() * frases.length)];
    while (nueva === frase) {
      nueva = frases[Math.floor(Math.random() * frases.length)];
    }
    return nueva;
  };

  useEffect(() => {
    setFrase(getRandomFrase());
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4 pb-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* FRASE PRINCIPAL */}
      <h1 className="text-3xl md:text-5xl font-semibold max-w-2xl leading-tight">
        "{frase}"
      </h1>

      {/* SUBTEXTO */}
      <p className="mt-6 opacity-70 text-base">
        Bienvenido a tu refugio digital de paz
      </p>
    </div>
  );
}