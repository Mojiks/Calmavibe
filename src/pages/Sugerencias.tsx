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
        alert("Mensaje enviado 🙌");
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
    <div className="min-h-screen flex items-center justify-center text-white px-4">

      <div className="glass p-6 rounded-xl w-full max-w-md">

        <h2 className="text-lg mb-4">Centro de ayuda</h2>

        <p className="text-sm mb-4 opacity-80">
          Tu opinión ayuda a mejorar CalmaVibe. Leemos cada mensaje personalmente.
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
          placeholder="Escribe aquí..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/40 border border-white/20 h-32"
        />

        <button
          onClick={enviar}
          className="w-full py-2 rounded bg-white/20 hover:bg-white/30"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

      </div>
    </div>
  );
}