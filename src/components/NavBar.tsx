import type { Page } from "../types/navigation";

export default function NavBar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {

  const btn = (id: Page, icon: string) => (
    <button
      onClick={() => setPage(id)}
      className={`flex flex-col items-center justify-center flex-1 py-2 ${
        page === id
          ? "text-white"
          : "text-white/50"
      }`}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );

  return (
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
      {btn("sugerencias", "✉️")}

    </div>
  );
}