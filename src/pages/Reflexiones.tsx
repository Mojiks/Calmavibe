import { useState } from "react";
import Layout from "../components/Layout";

const imagenes = [
  "cuandonoquedanmasestrellasquecontar.png",
  "elregalo.png",
  "labibliotecadelosnuevoscomienzos.png",
  "laciudadysusmurosinciertos.png",
  "lascasualidadesnoexisten.png",
  "permanencia.png",
];

export default function Reflexiones() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
      <Layout>
    <div
      className="min-h-screen text-white px-6 py-16 relative pb-20"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* GRID MÁS PEQUEÑO */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">

          {imagenes.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-lg max-w-[140px] cursor-pointer"
              onClick={() => setSelected(img)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={`/reflexiones/${img}`}
                className="w-full h-auto object-cover select-none pointer-events-none"
                draggable={false}
              />

              {/* WATERMARK */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-center">
                <p className="text-[10px] mb-1 opacity-70">
                  @izamt.art
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* FRASE ABAJO */}
        <div className="text-center mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">
            Pequeñas palabras que pueden cambiar un día entero
          </h2>
          <p className="text-sm opacity-70 mt-2">
            Detente un momento… respira y observa
          </p>
        </div>

        {/* CRÉDITO + BOTÓN */}
        <div className="text-center mt-6 text-sm opacity-80 flex flex-col items-center gap-2">
          <p>* Autor de las imágenes: @izamt.art</p>

          <a
            href="https://www.tiktok.com/@izamt.art?is_from_webapp=1&sender_device=pc"
            target="_blank"
            className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Visitar perfil
          </a>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-[80%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTÓN CERRAR */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* IMAGEN GRANDE */}
            <img
              src={`/reflexiones/${selected}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
      </Layout>
  );
}