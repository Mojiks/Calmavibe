import { useState } from "react";
import {
  BookOpen,
  CircleHelp,
  Flower2,
  Gamepad2,
  HeartHandshake,
  Home,
  Mail,
  Menu,
  MessagesSquare,
  NotebookPen,
  Video,
  X,
} from "lucide-react";
import type { Page } from "../../types/navigation";

export default function BottomNavigation({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);

  const btn = (
    id: Page,
    Icon: typeof Home,
    label: string,
  ) => (
    <button
      type="button"
      onClick={() => {
        setPage(id);
        setOpen(false);
      }}
      aria-label={label}
      className={`
        flex
        min-w-0
        flex-1
        flex-col
        items-center
        justify-center
        gap-1
        py-2
        transition-colors
        ${
          page === id
            ? "text-[#D8E9C3]"
            : "text-white/55"
        }
      `}
    >
      <Icon
        size={21}
        strokeWidth={page === id ? 2.1 : 1.7}
      />
      <span className="text-[10px] font-medium">
        {label}
      </span>
    </button>
  );

  return (
    <>
      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          flex
          h-[68px]
          items-center
          border-t
          border-white/10
          bg-black/90
          px-1
          pb-[env(safe-area-inset-bottom)]
          backdrop-blur-xl
          lg:hidden
        "
        aria-label="Navegación principal"
      >
        {btn("inicio", Home, "Inicio")}
        {btn("ayuda", CircleHelp, "Ayuda")}
        {btn("zen", Flower2, "Zen")}
        {btn("diario", NotebookPen, "Diario")}
        {btn("nomesientobien", HeartHandshake, "Ahora")}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Más opciones"
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-white/55"
        >
          <Menu size={22} strokeWidth={1.8} />
          <span className="text-[10px] font-medium">
            Más
          </span>
        </button>
      </nav>

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-end
            justify-center
            bg-black/70
            p-4
            pb-[88px]
            backdrop-blur-md
            lg:hidden
          "
          role="dialog"
          aria-modal="true"
          aria-label="Más opciones"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#11120F]/95
              p-5
              text-white
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                Más opciones
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPage("books");
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-left text-sm hover:bg-white/[0.09]"
              >
                <BookOpen size={19} />
                Libros
              </button>

              <button
                type="button"
                onClick={() => {
                  setPage("videos");
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-left text-sm hover:bg-white/[0.09]"
              >
                <Video size={19} />
                Videos
              </button>

              <button
                type="button"
                onClick={() => {
                  setPage("reflexiones");
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-left text-sm hover:bg-white/[0.09]"
              >
                <MessagesSquare size={19} />
                Reflexiones
              </button>

              <button
                type="button"
                onClick={() => {
                  setPage("sugerencias");
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-left text-sm hover:bg-white/[0.09]"
              >
                <Mail size={19} />
                Sugerencias
              </button>

              <button
                type="button"
                onClick={() => {
                  setPage("juegos");
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 text-left text-sm hover:bg-white/[0.09]"
              >
                <Gamepad2 size={19} />
                Juegos
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-2xl border border-white/10 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
