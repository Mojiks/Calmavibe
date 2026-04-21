import { useState } from "react";

export default function Sugerencias() {
  const [tipo, setTipo] = useState("Sugerencia");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!asunto || !mensaje) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sugerencias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo, asunto, mensaje }),
      });

      if (res.ok) {
        alert("Mensaje enviado correctamente 🙌");
        setAsunto("");
        setMensaje("");
      } else {
        alert("Error al enviar");
      }
    } catch {
      alert("Error de conexión");
    }

    setLoading(false);
  };

  return (
<div className="min-h-screen flex items-center justify-center px-4 text-white pb-20">
    
      <div className="glass p-6 rounded-xl w-full max-w-md text-center">

        <h2 className="text-xl mb-2">Sugerencias</h2>

        <p className="text-sm opacity-70 mb-4">
          Ayúdanos a mejorar CalmaVibe 💚
        </p>

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
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20"
        />

        <textarea
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/40 border border-white/20 h-32"
        />

        <button
          onClick={enviar}
          className="w-full py-2 rounded bg-white/20 hover:bg-white/30 transition"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

      </div>
    </div>
  );
}