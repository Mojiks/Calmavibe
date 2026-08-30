import {
  Gamepad2,
  Play,
} from "lucide-react";

import type { Page } from "../../../types/navigation";

interface GamesWidgetProps {
  setPage: (page: Page) => void;
}

export default function GamesWidget({
  setPage,
}: GamesWidgetProps) {
  return (
    <section className="flex h-full flex-col p-6">
      {/* =========================
          CABECERA
      ========================= */}

      <div className="flex items-center gap-3">
        <Gamepad2
          size={20}
          strokeWidth={1.8}
          className="text-[#7DA9E8]"
        />

        <h3
          className="
            text-[20px]
            font-semibold
            text-white
          "
        >
          Juegos
        </h3>
      </div>

      {/* =========================
          JUEGO DESTACADO
      ========================= */}

      <div className="mt-5 flex-1">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-5
            backdrop-blur-xl
          "
        >
          <h4
            className="
              text-[17px]
              font-medium
              text-white
            "
          >
            🌈 Color Zen
          </h4>

          <p
            className="
              mt-2
              text-[13px]
              leading-6
              text-white/60
            "
          >
            Encuentra los colores distintos para
            ayudar a tu mente a concentrarse y
            relajarse.
          </p>

          <button
            type="button"
            onClick={() => setPage("juegos")}
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-full
              bg-[#7B8F5D]
              px-5
              py-2
              text-[13px]
              text-white
              transition
              hover:bg-[#879968]
              active:scale-95
            "
          >
            <Play size={14} />

            Jugar
          </button>
        </div>
      </div>
    </section>
  );
}