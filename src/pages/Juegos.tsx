// src/pages/Juegos.tsx

import type { Page } from "../types/navigation";

import {
  ArrowRight,
  Eye,
  Hand,
  Infinity as InfinityIcon,
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
      "Sigue el movimiento de la onda y deja que tu atención encuentre su ritmo.",
    icon: InfinityIcon,
    visual: "wave",
  },
];

export default function Juegos({
  setPage,
}: JuegosProps) {
  return (
    <section
      className="
        min-h-screen
        overflow-x-hidden
        px-4
        pb-24
        pt-6
        text-white
        sm:px-6
        sm:pb-10
        sm:pt-7
        lg:px-8
        lg:pb-10
        lg:pt-8
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">

        <div className="mb-6 sm:mb-7">
          <h1
            className="
              text-[34px]
              leading-tight
              font-extralight
              tracking-[-0.04em]
              sm:text-[38px]
              lg:text-[42px]
            "
          >
            Juegos
          </h1>

          <p
            className="
              mt-2
              max-w-[700px]
              text-[14px]
              leading-6
              text-white/55
              sm:text-[15px]
            "
          >
            Pequeñas experiencias para concentrarte,
            distraerte y volver al presente.
          </p>
        </div>

        {/* MÓVIL: 1 columna / TABLET: 2 / PC: 4.
            La distribución de PC permanece exactamente en 4 columnas. */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {games.map((game) => {
            const Icon = game.icon;

            return (
              <div
                key={game.title}
                className="
                  group
                  min-w-0
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/30
                  p-4
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-black/40
                  lg:p-5
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                    text-white/45
                  "
                >
                  <Icon
                    size={15}
                    strokeWidth={1.7}
                    className="shrink-0"
                  />

                  <span
                    className="
                      truncate
                      text-[10px]
                      tracking-wide
                      sm:text-[11px]
                    "
                  >
                    {game.category}
                  </span>
                </div>

                <div
                  className="
                    mt-3
                    h-[125px]
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-white/10
                    bg-white/[0.025]
                    sm:h-[140px]
                    lg:mt-4
                    lg:h-[145px]
                  "
                >
                  {game.visual === "colors" && (
                    <div
                      className="
                        grid
                        h-full
                        grid-cols-5
                        gap-1.5
                        p-4
                        sm:gap-2
                        sm:p-5
                      "
                    >
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={`
                            min-h-0
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
                      <div className="absolute left-[25%] top-[30%] h-7 w-7 rounded-full border border-white/30 sm:h-8 sm:w-8" />
                      <div className="absolute left-[48%] top-[20%] h-10 w-10 rounded-full border border-white/30 sm:h-12 sm:w-12" />
                      <div className="absolute left-[62%] top-[42%] h-12 w-12 rounded-full border border-[#A88EDB]/40 sm:h-16 sm:w-16" />
                      <div className="absolute left-[40%] top-[55%] h-8 w-8 rounded-full border border-white/20 sm:h-10 sm:w-10" />
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
                    <div
                      className="
                        grid
                        h-full
                        grid-cols-4
                        gap-1.5
                        p-4
                        sm:gap-2
                        sm:p-5
                      "
                    >
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
                            text-base
                            sm:text-lg
                          "
                        >
                          {["🌿", "🌙", "☁️", "💧"][i % 4]}
                        </div>
                      ))}
                    </div>
                  )}

                  {game.visual === "pattern" && (
                    <div
                      className="
                        grid
                        h-full
                        grid-cols-4
                        gap-1.5
                        p-5
                        sm:gap-2
                        sm:p-7
                      "
                    >
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
                    <div
                      className="
                        flex
                        h-full
                        items-center
                        justify-center
                        gap-4
                        sm:gap-8
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#7DA8D9]/40
                          sm:h-12
                          sm:w-12
                        "
                      >
                        <Eye
                          size={17}
                          className="text-[#7DA8D9] sm:h-[19px] sm:w-[19px]"
                        />
                      </div>

                      <span className="text-white/30">+</span>

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#9D83D5]/40
                          sm:h-12
                          sm:w-12
                        "
                      >
                        <Hand
                          size={17}
                          className="text-[#9D83D5] sm:h-[19px] sm:w-[19px]"
                        />
                      </div>
                    </div>
                  )}

                  {game.visual === "number" && (
                    <div className="flex h-full items-center justify-center">
                      <span
                        className="
                          text-[42px]
                          font-extralight
                          text-white/80
                          sm:text-[48px]
                          lg:text-[52px]
                        "
                      >
                        100
                      </span>
                    </div>
                  )}

                  {game.visual === "wave" && (
                    <div
                      className="
                        flex
                        h-full
                        items-center
                        px-4
                        sm:px-7
                      "
                    >
                      <svg
                        viewBox="0 0 400 100"
                        className="w-full"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 50 C40 10 70 90 110 50 C150 10 180 90 220 50 C260 10 290 90 330 50 C360 20 380 65 400 45"
                          stroke="#82B5E0"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <h2
                  className="
                    mt-4
                    break-words
                    text-[16px]
                    font-semibold
                    leading-5
                    sm:mt-5
                    sm:text-[17px]
                  "
                >
                  {game.title}
                </h2>

                <p
                  className="
                    mt-2
                    min-h-0
                    text-[12px]
                    leading-5
                    text-white/55
                    sm:text-[13px]
                    sm:leading-6
                    lg:min-h-[60px]
                  "
                >
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

                    if (game.visual === "wave") {
                      setPage("fluye");
                    }
                  }}
                  className="
                    mt-4
                    inline-flex
                    min-h-9
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
                  game.visual === "wave"
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
            mt-4
            flex
            flex-col
            gap-4
            rounded-[22px]
            border
            border-white/10
            bg-black/25
            px-5
            py-5
            sm:mt-5
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium text-white sm:text-[16px]">
              Aquí no tienes que ganar.
            </h3>

            <p className="mt-1 text-[12px] leading-5 text-white/40">
              Solo jugar, respirar y volver a tu ritmo.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPage("inicio")}
            className="
              inline-flex
              w-full
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-2.5
              text-[12px]
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
              sm:w-auto
            "
          >
            Volver al inicio
          </button>
        </div>

      </div>
    </section>
  );
}
