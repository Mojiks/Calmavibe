// src/components/home/QuickCards.tsx

import {
  ArrowRight,
  Flower2,
  MessagesSquare,
  NotebookPen,
  UsersRound,
} from "lucide-react";

import type { Page } from "../../types/navigation";

interface QuickCardsProps {
  setPage: (page: Page) => void;
}

const cards = [
  {
    title: "No me siento bien",
    text: "Encuentra herramientas desde lo que estás sintiendo ahora.",
    color: "from-[#74855F]/72 to-[#5E6F4C]/52",
    icon: UsersRound,
    page: "nomesientobien" as Page,
  },
  {
    title: "Zen",
    text: "Respiraciones, meditaciones y sonidos para calmar tu mente.",
    color: "from-[#B79763]/70 to-[#90714B]/52",
    icon: Flower2,
    page: "zen" as Page,
  },
  {
    title: "Diario",
    text: "Escribe, suelta y observa tu progreso día a día.",
    color: "from-[#736194]/70 to-[#5D4F78]/52",
    icon: NotebookPen,
    page: "diario" as Page,
  },
  {
    title: "Reflexiones",
    text: "Frases, pensamientos y recordatorios para tu camino.",
    color: "from-[#4E7080]/70 to-[#35525E]/52",
    icon: MessagesSquare,
    page: "reflexiones" as Page,
  },
];

export default function QuickCards({
  setPage,
}: QuickCardsProps) {
  return (
    <section>
      <h2
        className="
          mb-3
          text-[18px]
          font-light
          text-white
        "
      >
        Explora tu espacio
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => setPage(card.page)}
              className={`
                relative
                min-h-[145px]
                overflow-hidden
                rounded-[20px]
                border
                border-white/10
                bg-gradient-to-br
                ${card.color}
                p-[14px]
                text-left
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/20
                lg:h-[150px]
                lg:min-h-0
              `}
            >
              <div
                className="
                  absolute
                  -right-8
                  -top-8
                  h-20
                  w-20
                  rounded-full
                  bg-white/10
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  gap-2
                "
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0 text-white"
                />

                <h3
                  className="
                    min-w-0
                    text-[14px]
                    font-semibold
                    leading-tight
                    text-white
                  "
                >
                  {card.title}
                </h3>
              </div>

              <p
                className="
                  relative
                  z-10
                  mt-3
                  max-w-[34rem]
                  pr-9
                  text-[12px]
                  leading-5
                  text-white/78
                "
              >
                {card.text}
              </p>

              <div
                className="
                  absolute
                  bottom-3
                  right-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  backdrop-blur-md
                "
              >
                <ArrowRight
                  size={14}
                  className="text-white"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
