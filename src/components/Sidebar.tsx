import type { Page } from "../types/navigation";

export default function Sidebar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {

  const item = (id: Page, icon: string, label: string) => (
    <button
      onClick={() => setPage(id)}
      className={`group relative flex items-center justify-center w-14 h-14 rounded-xl transition ${
        page === id
          ? "bg-white/20"
          : "hover:bg-white/10"
      }`}
    >
      {/* ICONO */}
      <span className="text-xl">{icon}</span>

      {/* TOOLTIP */}
      <span className="
        absolute left-16
        opacity-0 group-hover:opacity-100
        bg-black/80 text-white text-xs px-2 py-1 rounded
        transition whitespace-nowrap
      ">
        {label}
      </span>
    </button>
  );

  return (
    <div className="
      hidden md:flex
      fixed left-0 top-0 h-screen w-16
      flex-col items-center gap-3
      py-4
      bg-black/60 backdrop-blur-md
      border-r border-white/10
      z-50
    ">

      {item("inicio", "🏠", "Inicio")}
      {item("ayuda", "💬", "Ayuda")}
      {item("books", "📚", "Libros")}
      {item("zen", "🧘", "Zen")}
      {item("diario", "📓", "Diario")}
      {item("videos", "🎥", "Videos")}
      {item("reflexiones", "💭", "Reflexiones")}
      {item("sugerencias", "✉️", "Sugerencias")}

    </div>
  );
}