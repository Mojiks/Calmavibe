// src/pages/Juegos.tsx

import type { Page } from "../types/navigation";

import {
  ArrowRight,
  Eye,
  Hand,
  Infinity,
  Sparkles,
  Waves,
  Brain,
} from "lucide-react";

interface JuegosProps {
  setPage: (page: Page) => void;
}

const games = [
  {
    title: "Color Zen",
    category: "CONCENTRACIÓN",
    description:
      "Encuentra el color diferente y deja que tu atención se concentre en el presente.",
    icon: Brain,
    visual: "colors",
  },
  {
    title: "Burbuja",
    category: "CALMA",
    description:
      "Toca las burbujas lentamente y sigue su movimiento sin prisa.",
    icon: Waves,
    visual: "bubbles",
  },
  {
    title: "Constelación",
    category: "PRESENCIA",
    description:
      "Conecta los puntos y descubre pequeñas figuras en el cielo.",
    icon: Sparkles,
    visual: "stars",
  },
  {
    title: "Memoria Calmavibe",
    category: "CONCENTRACIÓN",
    description:
      "Encuentra las parejas y ejercita tu memoria a tu propio ritmo.",
    icon: Brain,
    visual: "memory",
  },
  {
    title: "Encuentra el patrón",
    category: "CONCENTRACIÓN",
    description:
      "Observa las piezas, encuentra el patrón y deja que aparezca el flujo.",
    icon: Brain,
    visual: "pattern",
  },
  {
    title: "3-3-3",
    category: "PRESENCIA",
    description:
      "Regresa al presente utilizando una dinámica sencilla de atención.",
    icon: Eye,
    visual: "grounding",
  },
  {
    title: "Desafío 100",
    category: "CONCENTRACIÓN",
    description:
      "Cuenta hacia atrás y mantén tu mente enfocada en un solo objetivo.",
    icon: Hand,
    visual: "number",
  },
  {
  title: "Fluye",
  category: "CALMA",
  description:
    "Encuentra el camino a través del laberinto y avanza a tu propio ritmo, sin presión.",
  icon: Infinity,
  visual: "maze",
},
];

export default function Juegos({
  setPage,
}: JuegosProps) {
  return (
    <section
      className="
        min-h-screen
        px-8
        pb-10
        pt-8
        text-white
      "
    >
      <div className="mx-auto max-w-[1400px]">

        <div className="mb-7">
          <h1
            className="
              text-[42px]
              font-extralight
              tracking-[-0.04em]
            "
          >
            Juegos
          </h1>

          <p className="mt-2 text-[15px] text-white/55">
            Pequeñas experiencias para concentrarte,
            distraerte y volver al presente.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">

          {games.map((game) => {
            const Icon = game.icon;

            return (
              <div
                key={game.title}
                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-black/40
                "
              >
                <div className="flex items-center gap-2 text-white/45">
                  <Icon size={15} strokeWidth={1.7} />

                  <span className="text-[11px] tracking-wide">
                    {game.category}
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    h-[145px]
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-white/10
                    bg-white/[0.025]
                  "
                >
                  {game.visual === "colors" && (
                    <div className="grid h-full grid-cols-5 gap-2 p-5">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={`
                            rounded-md
                            ${
                              i === 13
                                ? "bg-[#A7D36D]"
                                : i % 3 === 0
                                ? "bg-[#8FB9A6]"
                                : "bg-[#7FAF92]"
                            }
                          `}
                        />
                      ))}
                    </div>
                  )}

                  {game.visual === "bubbles" && (
                    <div className="relative h-full">
                      <div className="absolute left-[25%] top-[30%] h-8 w-8 rounded-full border border-white/30" />
                      <div className="absolute left-[48%] top-[20%] h-12 w-12 rounded-full border border-white/30" />
                      <div className="absolute left-[62%] top-[42%] h-16 w-16 rounded-full border border-[#A88EDB]/40" />
                      <div className="absolute left-[40%] top-[55%] h-10 w-10 rounded-full border border-white/20" />
                    </div>
                  )}

                  {game.visual === "stars" && (
                    <div className="relative h-full">
                      {[
                        ["25%", "28%"],
                        ["43%", "48%"],
                        ["62%", "30%"],
                        ["75%", "58%"],
                        ["50%", "72%"],
                      ].map(([left, top], i) => (
                        <div
                          key={i}
                          className="absolute h-2 w-2 rounded-full bg-white"
                          style={{ left, top }}
                        />
                      ))}
                    </div>
                  )}

                  {game.visual === "memory" && (
                    <div className="grid h-full grid-cols-4 gap-2 p-5">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="
                            flex
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/10
                            bg-white/[0.04]
                            text-lg
                          "
                        >
                          {["🌿", "🌙", "☁️", "💧"][i % 4]}
                        </div>
                      ))}
                    </div>
                  )}

                  {game.visual === "pattern" && (
                    <div className="grid h-full grid-cols-4 gap-2 p-7">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`
                            rounded-md
                            ${
                              i === 7
                                ? "bg-[#A991E8]"
                                : "bg-white/10"
                            }
                          `}
                        />
                      ))}
                    </div>
                  )}

                  {game.visual === "grounding" && (
                    <div className="flex h-full items-center justify-center gap-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7DA8D9]/40">
                        <Eye size={19} className="text-[#7DA8D9]" />
                      </div>

                      <span className="text-white/30">+</span>

                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#9D83D5]/40">
                        <Hand size={19} className="text-[#9D83D5]" />
                      </div>
                    </div>
                  )}

                  {game.visual === "number" && (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[52px] font-extralight text-white/80">
                        100
                      </span>
                    </div>
                  )}

  {game.visual === "maze" && (
  <div className="relative h-full p-5">

    <div className="grid h-full grid-cols-7 gap-1.5">

      {[
        1, 1, 1, 0, 1, 1, 1,
        0, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0,
      ].map((wall, index) => (
        <div
          key={index}
          className={`
            rounded-[3px]
            ${
              wall === 1
                ? "bg-white/15"
                : "bg-[#7B8F5D]/20"
            }
          `}
        />
      ))}

    </div>

    <div
      className="
        absolute
        bottom-[14%]
        right-[8%]
        h-3
        w-3
        rounded-full
        bg-[#A7D36D]
        shadow-[0_0_12px_rgba(167,211,109,.45)]
      "
    />

  </div>
)}
                </div>

                <h2 className="mt-5 text-[17px] font-semibold">
                  {game.title}
                </h2>

                <p className="mt-2 min-h-[60px] text-[13px] leading-6 text-white/55">
                  {game.description}
                </p>

              <button
  type="button"
  onClick={() => {
  if (game.visual === "colors") {
    setPage("colorzen");
  }

  if (game.visual === "bubbles") {
    setPage("burbuja");
  }

  if (game.visual === "stars") {
    setPage("constelacion");
  }

  if (game.visual === "memory") {
    setPage("memoria");
  }

  if (game.visual === "pattern") {
    setPage("patron");
  }

  if (game.visual === "grounding") {
    setPage("tres333");
  }

  if (game.visual === "number") {
    setPage("desafio100");
  }

  if (game.visual === "maze") {
  setPage("fluye");
}
}}
  className="
    mt-4
    inline-flex
    items-center
    gap-2
    rounded-full
    bg-white/[0.07]
    px-4
    py-2
    text-[12px]
    text-white/60
    transition
    hover:bg-[#7B8F5D]
    hover:text-white
  "
>
{game.visual === "colors" ||
game.visual === "bubbles" ||
game.visual === "stars" ||
game.visual === "memory" ||
game.visual === "pattern" ||
game.visual === "grounding" ||
game.visual === "number" ||
game.visual === "maze"
  ? "Jugar"
  : "Próximamente"}

  <ArrowRight size={13} />
</button>

              </div>
            );
          })}

        </div>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            rounded-[22px]
            border
            border-white/10
            bg-black/25
            px-6
            py-5
          "
        >
          <div>
            <h3 className="text-[16px] font-medium text-white">
              Aquí no tienes que ganar.
            </h3>

            <p className="mt-1 text-[12px] text-white/40">
              Solo jugar, respirar y volver a tu ritmo.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPage("inicio")}
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-2
              text-[12px]
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            Volver al inicio
          </button>
        </div>

      </div>
    </section>
  );
}