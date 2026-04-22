import { useEffect, useState } from "react";
import Layout from "../components/Layout";

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
  const [visible, setVisible] = useState(false);

  const getRandomFrase = () => {
    let nueva = frases[Math.floor(Math.random() * frases.length)];
    while (nueva === frase) {
      nueva = frases[Math.floor(Math.random() * frases.length)];
    }
    return nueva;
  };

  useEffect(() => {
    setFrase(getRandomFrase());
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <Layout>

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pb-24">

<img
src="/images/calmavibe-logo-full.png"
  alt="CalmaVibe"
  className="w-40 md:w-56 mb-6 opacity-95"
/>

        <h1
          className={`transition-all duration-1000 ease-out max-w-2xl leading-relaxed font-light drop-shadow-lg
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          text-3xl md:text-5xl`}
        >
          "{frase}"
        </h1>

        <p
          className={`mt-6 opacity-80 text-base md:text-lg tracking-wide transition-all duration-1000 delay-200
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Bienvenido a tu refugio digital de paz
        </p>

      </div>

    </Layout>
  );
}