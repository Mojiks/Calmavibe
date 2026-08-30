import {
  ChevronLeft,
  ChevronRight,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

type Phase =
  | "idle"
  | "inhale"
  | "hold"
  | "exhale"
  | "pause"
  | "done";

type Technique = {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  pause?: number;
  cycles: number;
};

const techniques: Technique[] = [
  {
    name: "Respiración 4-7-8",
    description: "Reduce ansiedad y favorece el descanso.",
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
  },
  {
    name: "Respiración Cuadrada",
    description: "Recupera el control y mejora la concentración.",
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 4,
    cycles: 5,
  },
  {
    name: "Respiración Abdominal",
    description: "Relaja el cuerpo respirando desde el abdomen.",
    inhale: 5,
    hold: 0,
    exhale: 5,
    cycles: 10,
  },
];

export default function BreathingWidget() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState(0);

  const technique = techniques[selectedTechnique];

  /*
   * Cambiar técnica
   */
  function previousTechnique() {
    if (phase !== "idle") return;

    setSelectedTechnique((prev) =>
      prev === 0 ? techniques.length - 1 : prev - 1
    );
  }

  function nextTechnique() {
    if (phase !== "idle") return;

    setSelectedTechnique((prev) =>
      prev === techniques.length - 1 ? 0 : prev + 1
    );
  }

  /*
   * Iniciar respiración
   */
  function start() {
    setCycle(1);
    setPhase("inhale");
    setSeconds(technique.inhale);
  }

  /*
   * Reiniciar
   */
  function reset() {
    setPhase("idle");
    setCycle(0);
    setSeconds(technique.inhale);
  }

  /*
   * RESPIRACIÓN AUTOMÁTICA
   */
  useEffect(() => {
    if (phase === "idle" || phase === "done") return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  /*
   * CAMBIO DE FASES
   */
  useEffect(() => {
    if (seconds > 0) return;

    switch (phase) {
      case "inhale":
        if (technique.hold > 0) {
          setPhase("hold");
          setSeconds(technique.hold);
        } else {
          setPhase("exhale");
          setSeconds(technique.exhale);
        }
        break;

      case "hold":
        setPhase("exhale");
        setSeconds(technique.exhale);
        break;

      case "exhale": {
        if (technique.pause && technique.pause > 0) {
          setPhase("pause");
          setSeconds(technique.pause);
          break;
        }

        const nextCycle = cycle + 1;

        if (nextCycle > technique.cycles) {
          setPhase("done");
          return;
        }

        setCycle(nextCycle);
        setPhase("inhale");
        setSeconds(technique.inhale);

        break;
      }

      case "pause": {
        const nextCycle = cycle + 1;

        if (nextCycle > technique.cycles) {
          setPhase("done");
          return;
        }

        setCycle(nextCycle);
        setPhase("inhale");
        setSeconds(technique.inhale);

        break;
      }
    }
  }, [seconds, phase, cycle, technique]);

  /*
   * EVENTO EXTERNO
   *
   * Permite que:
   *
   * ¿Qué necesitas hoy?
   *        ↓
   * Ansiedad
   *        ↓
   * Respiración guiada
   *        ↓
   * Inicio automático
   */
  useEffect(() => {
    const handleStartBreathing = () => {
      setSelectedTechnique(0);

      setCycle(1);
      setPhase("inhale");
      setSeconds(techniques[0].inhale);
    };

    window.addEventListener(
      "calmavibe:start-breathing",
      handleStartBreathing
    );

    return () => {
      window.removeEventListener(
        "calmavibe:start-breathing",
        handleStartBreathing
      );
    };
  }, []);

  const instruction =
    phase === "idle"
      ? "Selecciona una técnica y comienza cuando estés listo."
      : phase === "inhale"
      ? "Inhala lentamente por la nariz."
      : phase === "hold"
      ? "Mantén el aire sin generar tensión."
      : phase === "exhale"
      ? "Exhala suavemente por la boca."
      : phase === "pause"
      ? "Permanece relajado unos segundos."
      : "Respira normalmente y disfruta este momento.";

  const title =
    phase === "idle"
      ? "Respira"
      : phase === "inhale"
      ? "Inhala"
      : phase === "hold"
      ? "Mantén"
      : phase === "exhale"
      ? "Exhala"
      : phase === "pause"
      ? "Espera"
      : "Excelente";

  return (
    <section
      id="breathing-widget"
      className="
        h-full
        p-5
        flex
        flex-col
      "
    >
      {/* ENCABEZADO */}

      <div className="flex items-center gap-3 mb-2">
        <Wind
          size={18}
          className="text-[#9CC37D]"
        />

        <h3 className="text-[18px] font-semibold text-white">
          Respiración guiada
        </h3>
      </div>

      {/* SELECTOR DE TÉCNICA */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-3
          py-2
        "
      >
        <button
          type="button"
          onClick={previousTechnique}
          disabled={phase !== "idle"}
          className="
            rounded-full
            p-1
            text-white/70
            transition
            hover:bg-white/10
            hover:text-white
            disabled:opacity-30
          "
          aria-label="Técnica anterior"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="min-w-0 text-center">
          <p className="text-[13px] font-medium text-white">
            {technique.name}
          </p>

          <p className="mt-0.5 text-[10px] text-white/55">
            {technique.description}
          </p>
        </div>

        <button
          type="button"
          onClick={nextTechnique}
          disabled={phase !== "idle"}
          className="
            rounded-full
            p-1
            text-white/70
            transition
            hover:bg-white/10
            hover:text-white
            disabled:opacity-30
          "
          aria-label="Siguiente técnica"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* CONTENIDO */}

      <div
        className="
          flex-1
          flex
          flex-col
          items-center
          justify-between
          py-5
        "
      >
        {/* CÍRCULO */}

        <button
          type="button"
          onClick={phase === "idle" ? start : reset}
          disabled={phase === "done"}
          aria-label={
            phase === "idle"
              ? "Iniciar respiración"
              : "Reiniciar respiración"
          }
          className={`
            flex
            items-center
            justify-center
            rounded-full
            border
            border-cyan-300/70
            shadow-[0_0_35px_rgba(70,210,255,.45)]
            transition-all
            duration-1000
            hover:scale-105
            active:scale-95
            ${
              phase === "inhale"
                ? "h-36 w-36"
                : phase === "exhale" || phase === "pause"
                ? "h-24 w-24"
                : "h-28 w-28"
            }
          `}
        >
          <div
            className="
              flex
              h-20
              w-20
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-cyan-200/50
              bg-black/25
              backdrop-blur-xl
            "
          >
            <span
              className="
                text-[15px]
                font-medium
                text-white
              "
            >
              {title}
            </span>

            <span
              className="
                mt-1
                text-[26px]
                font-semibold
                text-white
              "
            >
              {phase === "done" ? "✓" : seconds}
            </span>
          </div>
        </button>

        {/* INDICACIÓN */}

        <div className="text-center">
          <p className="text-[11px] text-white/60">
            {instruction}
          </p>

          {phase !== "idle" && phase !== "done" && (
            <p
              className="
                mt-2
                text-[11px]
                font-medium
                text-[#9CC37D]
              "
            >
              Ciclo {cycle} de {technique.cycles}
            </p>
          )}

          {phase === "done" && (
            <p
              className="
                mt-2
                text-[11px]
                font-medium
                text-[#9CC37D]
              "
            >
              Completaste tu respiración.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}