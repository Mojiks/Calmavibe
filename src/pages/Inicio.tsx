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
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4 pb-20">

      <img src="/buda.png" alt="buda" className="w-10 mb-6 opacity-90" />

      <h1 className="text-2xl md:text-4xl max-w-xl leading-relaxed">
        "{frase}"
      </h1>

      <p className="mt-4 opacity-80 text-sm">
        Bienvenido a tu refugio digital de paz
      </p>

    </div>
  );
}