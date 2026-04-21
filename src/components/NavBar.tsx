import { useState } from "react";
import type { Page } from "../types/navigation";

export default function NavBar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {

  const [open, setOpen] = useState(false);

  const btn = (id: Page, icon: string) => (
    <button
      onClick={() => setPage(id)}
      className={`flex flex-col items-center justify-center flex-1 py-2 ${
        page === id ? "text-white" : "text-white/50"
      }`}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="
        fixed bottom-0 left-0 w-full z-50
        bg-black/80 backdrop-blur-lg
        border-t border-white/10
        flex justify-around items-center
      ">

        {btn("inicio", "🏠")}
        {btn("ayuda", "💬")}
        {btn("zen", "🧘")}
        {btn("diario", "📓")}

        {/* BOTÓN MÁS */}
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-2 text-white/60"
        >
          <span className="text-xl">☰</span>
        </button>

      </div>

      {/* MODAL */}
      {open && (
        <div className="
          fixed inset-0 z-50
          bg-black/80 backdrop-blur-md
          flex items-center justify-center
        ">

          <div className="
            bg-black/90 border border-white/10
            rounded-2xl p-6 w-[85%] max-w-sm
            text-white text-center
          ">

            <h2 className="mb-4 text-lg">Más opciones</h2>

            <div className="flex flex-col gap-3">

              <button onClick={() => { setPage("books"); setOpen(false); }}>📚 Libros</button>
              <button onClick={() => { setPage("videos"); setOpen(false); }}>🎥 Videos</button>
              <button onClick={() => { setPage("reflexiones"); setOpen(false); }}>💭 Reflexiones</button>
              <button onClick={() => { setPage("sugerencias"); setOpen(false); }}>✉️ Sugerencias</button>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-sm opacity-60"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
    </>
  );
}