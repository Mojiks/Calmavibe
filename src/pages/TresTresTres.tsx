// src/pages/TresTresTres.tsx

import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  Ear,
  Hand,
  Check,
  RotateCcw,
} from "lucide-react";

interface TresTresTresProps {
  onBack: () => void;
}

type Phase = "see" | "hear" | "feel" | "complete";

const phases: {
  id: Exclude<Phase, "complete">;
  title: string;
  instruction: string;
  icon: typeof Eye;
  options: string[];
}[] = [
  {
    id: "see",
    title: "3 cosas que puedes ver",
    instruction:
      "Mira a tu alrededor lentamente y selecciona tres cosas que puedas ver.",
    icon: Eye,
    options: [
      "Algo que tenga un color que te guste",
      "Algo que esté cerca de ti",
      "Algo que esté lejos",
      "Algo que tenga una textura interesante",
      "Algo que nunca habías observado así",
      "Algo que te resulte agradable",
    ],
  },
  {
    id: "hear",
    title: "3 sonidos que puedes escuchar",
    instruction:
      "Detente un momento y presta atención a los sonidos que están ocurriendo a tu alrededor.",
    icon: Ear,
    options: [
      "Un sonido cercano",
      "Un sonido lejano",
      "Un sonido constante",
      "Un sonido que apareció de repente",
      "Un sonido de la naturaleza",
      "El sonido de tu propia respiración",
    ],
  },
  {
    id: "feel",
    title: "3 sensaciones que puedes sentir",
    instruction:
      "Lleva tu atención a tu cuerpo y reconoce tres sensaciones presentes ahora mismo.",
    icon: Hand,
    options: [
      "El contacto de tus pies con el suelo",
      "El contacto de tu cuerpo con la silla",
      "La temperatura del aire",
      "El movimiento de tu respiración",
      "La sensación de tus manos",
      "Alguna otra sensación corporal",
    ],
  },
];

export default function TresTresTres({
  onBack,
}: TresTresTresProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const phase =
    phaseIndex < phases.length
      ? phases[phaseIndex]
      : null;

  const completed = phaseIndex >= phases.length;

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected((current) =>
        current.filter((item) => item !== option)
      );
      return;
    }

    if (selected.length < 3) {
      setSelected((current) => [...current, option]);
    }
  };

  const continuePhase = () => {
    if (selected.length !== 3) return;

    setSelected([]);
    setPhaseIndex((current) => current + 1);
  };

  const restartGame = () => {
    setPhaseIndex(0);
    setSelected([]);
  };

  if (completed) {
    return (
      <section className="min-h-screen px-8 pb-10 pt-8 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-[900px] items-center justify-center">
          <div
            className="
              w-full
              rounded-[28px]
              border
              border-white/10
              bg-black/35
              p-8
              text-center
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#7B8F5D]/20
                text-[#A7C77A]
              "
            >
              <Check size={30} />
            </div>

            <p className="mt-6 text-sm text-white/45">
              3 · 3 · 3
            </p>

            <h1 className="mt-2 text-3xl font-light">
              Volviste al momento presente.
            </h1>

            <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-white/55">
              No tienes que resolver nada ahora.
              Solo estar aquí, observar y permitirte
              hacer una pausa.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={restartGame}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#7B8F5D]
                  px-5
                  py-2.5
                  text-sm
                  text-white
                  transition
                  hover:bg-[#879968]
                "
              >
                <RotateCcw size={15} />
                Volver a hacerlo
              </button>

              <button
                type="button"
                onClick={onBack}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-5
                  py-2.5
                  text-sm
                  text-white/65
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                Volver a juegos
              </button>
            </div>

            <div
              className="
                mx-auto
                mt-10
                max-w-[620px]
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-5
                text-left
              "
            >
              <p className="text-xs font-medium text-white/60">
                ¿Para qué sirve?
              </p>

              <p className="mt-2 text-xs leading-6 text-white/40">
                Esta experiencia está diseñada como una
                práctica breve de atención plena y
                orientación hacia el presente. Puede
                ayudar a dirigir la atención hacia el
                entorno y las sensaciones actuales.
              </p>

              <p className="mt-4 text-[11px] leading-5 text-white/30">
                Aviso: Esta experiencia es recreativa y
                de bienestar. No sustituye atención,
                evaluación ni tratamiento de un profesional
                de la salud.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!phase) return null;

  const Icon = phase.icon;
  const progress = ((phaseIndex + 1) / phases.length) * 100;

  return (
    <section className="min-h-screen px-8 pb-10 pt-8 text-white">
      <div className="mx-auto max-w-[1000px]">

        {/* CABECERA */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-black/30
              px-4
              py-2
              text-sm
              text-white/80
              backdrop-blur-xl
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="text-right">
            <h1 className="text-3xl font-light tracking-tight">
              3-3-3
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Una pausa para regresar al presente.
            </p>
          </div>
        </div>

        {/* PROGRESO */}

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>
              Paso {phaseIndex + 1} de 3
            </span>

            <span>
              {selected.length} de 3
            </span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="
                h-full
                rounded-full
                bg-[#8FAE6D]
                transition-all
                duration-500
              "
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CONTENIDO */}

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-[760px]
            rounded-[28px]
            border
            border-white/10
            bg-black/35
            p-7
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
              "
            >
              <Icon
                size={24}
                strokeWidth={1.6}
                className="text-[#A7C77A]"
              />
            </div>

            <p className="mt-5 text-sm text-white/45">
              Observa con calma
            </p>

            <h2 className="mt-2 text-2xl font-medium">
              {phase.title}
            </h2>

            <p className="mx-auto mt-3 max-w-[560px] text-sm leading-6 text-white/50">
              {phase.instruction}
            </p>
          </div>

          {/* OPCIONES */}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {phase.options.map((option) => {
              const isSelected =
                selected.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    px-4
                    py-4
                    text-left
                    text-sm
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "border-[#8FAE6D]/60 bg-[#7B8F5D]/20 text-white"
                        : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    }
                  `}
                >
                  <span>{option}</span>

                  {isSelected && (
                    <span
                      className="
                        ml-3
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#8FAE6D]
                        text-black
                      "
                    >
                      <Check size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* CONTINUAR */}

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              disabled={selected.length !== 3}
              onClick={continuePhase}
              className="
                rounded-full
                bg-[#7B8F5D]
                px-6
                py-3
                text-sm
                text-white
                transition
                hover:bg-[#879968]
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              {phaseIndex === 2
                ? "Terminar"
                : "Continuar"}
            </button>
          </div>
        </div>

        {/* LEYENDA */}

        <div className="mx-auto mt-6 max-w-[760px] text-center">
          <p className="text-xs leading-5 text-white/30">
            No hay respuestas correctas o incorrectas.
            Solo presta atención a lo que está presente
            ahora mismo.
          </p>

          <p className="mt-3 text-[10px] leading-5 text-white/25">
            Esta experiencia es recreativa y de bienestar.
            No sustituye atención, evaluación ni tratamiento
            de un profesional de la salud.
          </p>
        </div>

      </div>
    </section>
  );
}