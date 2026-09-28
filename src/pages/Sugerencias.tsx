import { useState } from "react";
import Layout from "../components/Layout";

const EMAIL = "calmavibe.app@gmail.com";

export default function Sugerencias() {
  const [tipo, setTipo] = useState("Sugerencia");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState("");

  const enviar = () => {
    const cleanSubject = asunto.trim();
    const cleanMessage = mensaje.trim();

    if (!cleanSubject || !cleanMessage) {
      setStatus("Completa el asunto y el mensaje.");
      return;
    }

    const subject = `[${tipo}] ${cleanSubject}`;
    const body = `Tipo: ${tipo}

${cleanMessage}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("Se abrirá tu aplicación de correo para enviar el mensaje.");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 text-white pb-20">
        <div className="glass p-6 rounded-xl w-full max-w-md text-center">
          <h2 className="text-xl mb-2">Sugerencias</h2>
          <p className="text-sm opacity-70 mb-4">Ayúdanos a mejorar CalmaVibe 💚</p>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20"
          >
            <option>Sugerencia</option>
            <option>Error</option>
            <option>Ayuda</option>
          </select>

          <input
            type="text"
            placeholder="Asunto"
            value={asunto}
            maxLength={120}
            onChange={(e) => setAsunto(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20"
          />

          <textarea
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            maxLength={3000}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black/40 border border-white/20 h-32"
          />

          {status && <p className="mb-3 text-xs text-white/60">{status}</p>}

          <button
            type="button"
            onClick={enviar}
            className="w-full py-2 rounded bg-white/20 hover:bg-white/30 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </Layout>
  );
}
