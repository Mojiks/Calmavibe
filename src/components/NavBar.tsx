import type { Page } from "../types/navigation";

type Props = {
  page: Page;
  setPage: (p: Page) => void;
};

export default function NavBar({ page, setPage }: Props) {
  const btn = (id: Page, label: string) => (
    <button
      onClick={() => setPage(id)}
      className={`px-3 py-1 rounded-lg ${
        page === id ? "text-green-400" : "text-white/70"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-md px-6 py-2 rounded-xl flex gap-4 text-sm">

      {btn("inicio", "Inicio")}
      {btn("ayuda", "Ayuda")}
      {btn("books", "Libros")}
      {btn("zen", "Zen")}
      {btn("diario", "Diario")}
      {btn("videos", "Videos")} {/* ✅ CORRECTO */}
      {btn("reflexiones", "Reflexiones")}

    </div>
  );
}