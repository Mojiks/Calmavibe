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

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/mamojtavx";

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

  const menuButton = (
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
      className="
        flex
        min-h-[64px]
        items-center
        justify-center
        gap-3
        rounded-[18px]
        bg-white/[0.06]
        px-3
        text-sm
        font-medium
        text-white/90
        transition-all
        duration-200
        hover:bg-white/[0.10]
        active:scale-[0.985]
      "
    >
      <Icon
        size={21}
        strokeWidth={1.8}
        className="shrink-0"
      />

      <span>{label}</span>
    </button>
  );

  return (
    <>
      {/* Navegación inferior móvil */}
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
          className="
            flex
            min-w-0
            flex-1
            flex-col
            items-center
            justify-center
            gap-1
            py-2
            text-white/55
          "
        >
          <Menu
            size={22}
            strokeWidth={1.8}
          />

          <span className="text-[10px] font-medium">
            Más
          </span>
        </button>
      </nav>

      {/* Modal Más opciones */}
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
              flex
              w-full
              max-w-md
              max-h-[calc(100dvh-104px)]
              flex-col
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#11120F]/95
              p-5
              text-white
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Encabezado */}
            <div className="mb-4 flex shrink-0 items-center justify-between">
              <h2 className="text-[22px] font-semibold tracking-tight">
                Más opciones
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="
                  rounded-full
                  p-2
                  text-white/55
                  transition-colors
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido desplazable */}
            <div className="min-h-0 overflow-y-auto pr-0.5">
              {/* Opciones */}
              <div className="grid grid-cols-2 gap-2.5">
                {menuButton("books", BookOpen, "Libros")}

                {menuButton(
                  "mindfulness",
                  Flower2,
                  "Mindfulness",
                )}

                {menuButton("videos", Video, "Videos")}

                {menuButton(
                  "reflexiones",
                  MessagesSquare,
                  "Reflexiones",
                )}

                {menuButton(
                  "sugerencias",
                  Mail,
                  "Sugerencias",
                )}

                {menuButton(
                  "juegos",
                  Gamepad2,
                  "Juegos",
                )}
              </div>

              {/* Buy Me a Coffee */}
              <div
                className="
                  mx-auto
                  mt-4
                  w-[78%]
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-[#E8B84A]/20
                  bg-black/30
                  shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                "
              >
                <div className="relative">
                  <img
                    src="/images/buymeacoffee-calmavibe.png"
                    alt="Apoya a CalmaVibe en Buy Me a Coffee"
                    className="
                      block
                      h-auto
                      w-full
                      select-none
                    "
                    draggable={false}
                  />

                  <a
                    href={BUY_ME_A_COFFEE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Apoyar a CalmaVibe en Buy Me a Coffee"
                    title="Apoyar a CalmaVibe"
                    className="
                      absolute
                      left-[30.3%]
                      top-[42.1%]
                      h-[18.8%]
                      w-[67%]
                      rounded-full
                      transition-all
                      duration-200
                      hover:bg-white/[0.04]
                      hover:shadow-[0_0_18px_rgba(255,210,70,0.28)]
                      active:scale-[0.985]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#FFD95A]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#17130B]
                    "
                  >
                    <span className="sr-only">
                      Apoyar a CalmaVibe
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                mt-4
                h-[58px]
                shrink-0
                w-full
                rounded-[20px]
                border
                border-white/10
                text-sm
                font-medium
                text-white/60
                transition-all
                duration-200
                hover:bg-white/5
                hover:text-white
                active:scale-[0.99]
              "
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}