// src/pages/Desafio100.tsx

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Brain,
  Heart,
} from "lucide-react";

interface Desafio100Props {
  onBack: () => void;
}

const TOTAL_LEVELS = 5;
const STARTING_TIME = 45;

const LEVEL_TARGETS = [20, 30, 50, 75, 100];

function shuffleNumbers(total: number) {
  const numbers = Array.from(
    { length: total },
    (_, index) => index + 1
  );

  for (let i = numbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [numbers[i], numbers[randomIndex]] = [
      numbers[randomIndex],
      numbers[i],
    ];
  }

  return numbers;
}

export default function Desafio100({
  onBack,
}: Desafio100Props) {
  const [level, setLevel] = useState(1);
  const [nextNumber, setNextNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(STARTING_TIME);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [completedGame, setCompletedGame] =
    useState(false);

  const target =
    LEVEL_TARGETS[level - 1];

  const numbers = useMemo(
    () => shuffleNumbers(target),
    [level, target]
  );

  /*
   * ==========================================================
   * TEMPORIZADOR
   * ==========================================================
   */

  useEffect(() => {
    if (gameOver || completedGame) {
      return;
    }

    if (time <= 0) {
      setGameOver(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setTime((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [time, gameOver, completedGame]);

  /*
   * ==========================================================
   * SELECCIONAR NÚMERO
   * ==========================================================
   */

  const handleNumberClick = (
    number: number
  ) => {
    if (gameOver || completedGame) {
      return;
    }

    /*
     * Número correcto
     */

    if (number === nextNumber) {
      const points =
        level * 10 + Math.max(1, time);

      setScore(
        (current) => current + points
      );

      /*
       * Terminó el nivel
       */

      if (number === target) {
        /*
         * Terminó los 5 niveles
         */

        if (level === TOTAL_LEVELS) {
          setCompletedGame(true);
          setGameOver(true);
          return;
        }

        /*
         * Siguiente nivel
         */

        const nextLevel = level + 1;

        setLevel(nextLevel);
        setNextNumber(1);
        setTime(STARTING_TIME);

        return;
      }

      setNextNumber(
        (current) => current + 1
      );

      return;
    }

    /*
     * Número incorrecto
     */

    setMistakes(
      (current) => current + 1
    );

    setTime((current) =>
      Math.max(0, current - 3)
    );
  };

  /*
   * ==========================================================
   * REINICIAR
   * ==========================================================
   */

  const restartGame = () => {
    setLevel(1);
    setNextNumber(1);
    setScore(0);
    setTime(STARTING_TIME);
    setMistakes(0);
    setGameOver(false);
    setCompletedGame(false);
  };

  /*
   * ==========================================================
   * TAMAÑO DEL TABLERO
   * ==========================================================
   */

  const gridColumns =
    target <= 20
      ? "grid-cols-5"
      : target <= 30
      ? "grid-cols-6"
      : target <= 50
      ? "grid-cols-7"
      : target <= 75
      ? "grid-cols-8"
      : "grid-cols-10";

  return (
    <section className="min-h-screen px-8 pb-10 pt-8 text-white">

      <div className="mx-auto max-w-[1100px]">

        {/* =====================================================
            CABECERA
        ===================================================== */}

        <div className="flex items-center justify-between gap-4">

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
              Desafío 100
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Encuentra los números en orden.
            </p>

          </div>

        </div>

        {/* =====================================================
            EXPLICACIÓN
        ===================================================== */}

        <div
          className="
            mt-6
            rounded-[22px]
            border
            border-white/10
            bg-black/25
            px-5
            py-4
            backdrop-blur-xl
          "
        >

          <div className="flex items-start gap-3">

            <div
              className="
                mt-0.5
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#7B8F5D]/20
                text-[#A7D36D]
              "
            >
              <Brain size={18} />
            </div>

            <div>

              <h2 className="text-sm font-medium text-white">
                ¿Cómo funciona?
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Los números aparecen desordenados.
                Encuéntralos comenzando por el número
                1 y continúa en orden hasta completar
                el objetivo del nivel. Si seleccionas
                un número incorrecto, perderás algunos
                segundos.
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            INFORMACIÓN
        ===================================================== */}

        <div className="mt-5 grid grid-cols-4 gap-3">

          {/* PUNTOS */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-4
              py-3
              backdrop-blur-xl
            "
          >

            <div className="flex items-center gap-2 text-white/45">

              <Trophy size={15} />

              <span className="text-xs">
                Puntos
              </span>

            </div>

            <p className="mt-1 text-xl font-medium">
              {score}
            </p>

          </div>

          {/* NIVEL */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-4
              py-3
              text-center
              backdrop-blur-xl
            "
          >

            <p className="text-xs text-white/45">
              Nivel
            </p>

            <p className="mt-1 text-xl font-medium">
              {level} / {TOTAL_LEVELS}
            </p>

          </div>

          {/* SIGUIENTE */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-4
              py-3
              text-center
              backdrop-blur-xl
            "
          >

            <p className="text-xs text-white/45">
              Siguiente
            </p>

            <p className="mt-1 text-xl font-medium">
              {nextNumber}
            </p>

          </div>

          {/* TIEMPO */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-4
              py-3
              backdrop-blur-xl
            "
          >

            <div className="flex items-center gap-2 text-white/45">

              <Timer size={15} />

              <span className="text-xs">
                Tiempo
              </span>

            </div>

            <p className="mt-1 text-xl font-medium">
              {time}s
            </p>

          </div>

        </div>

        {/* =====================================================
            TABLERO
        ===================================================== */}

        <div
          className="
            mt-6
            rounded-[28px]
            border
            border-white/10
            bg-black/35
            p-6
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <div className="mb-6 text-center">

            <p className="text-sm text-white/45">
              Nivel {level}
            </p>

            <h2 className="mt-1 text-xl font-medium">
              Encuentra el {nextNumber}
            </h2>

            <p className="mt-1 text-xs text-white/35">
              Objetivo: llegar hasta {target}
            </p>

          </div>

          {/* =================================================
              GRID DE NÚMEROS
          ================================================= */}

          <div
            className={`
              mx-auto
              grid
              max-w-[900px]
              ${gridColumns}
              gap-2
            `}
          >

            {numbers.map((number) => {

              const isNext =
                number === nextNumber;

              return (
                <button
                  key={number}
                  type="button"
                  disabled={
                    gameOver ||
                    completedGame
                  }
                  onClick={() =>
                    handleNumberClick(number)
                  }
                  className={`
                    aspect-square
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    text-sm
                    text-white/60
                    transition-all
                    duration-150
                    hover:scale-[1.05]
                    hover:border-white/25
                    hover:bg-white/[0.08]
                    active:scale-95
                    disabled:cursor-default

                    ${
                      isNext
                        ? "ring-1 ring-[#A7D36D]/20"
                        : ""
                    }
                  `}
                  aria-label={`Número ${number}`}
                >
                  {number}
                </button>
              );
            })}

          </div>

          {/* =================================================
              PROGRESO
          ================================================= */}

          <div className="mx-auto mt-7 max-w-[900px]">

            <div className="flex items-center justify-between text-xs text-white/35">

              <span>
                Progreso
              </span>

              <span>
                {Math.min(
                  nextNumber - 1,
                  target
                )} / {target}
              </span>

            </div>

            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">

              <div
                className="
                  h-full
                  rounded-full
                  bg-[#8FAE6D]
                  transition-all
                  duration-200
                "
                style={{
                  width: `${
                    ((Math.min(
                      nextNumber - 1,
                      target
                    )) /
                      target) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>

          {/* =================================================
              ERRORES
          ================================================= */}

          <div className="mt-5 text-center">

            <p className="text-xs text-white/30">
              Errores: {mistakes}
            </p>

          </div>

          {/* =================================================
              RESULTADO
          ================================================= */}

          {gameOver && (

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-black/40
                p-6
                text-center
                backdrop-blur-xl
              "
            >

              {completedGame ? (

                <>
                  <p className="text-sm text-[#A7D36D]">
                    ¡Completaste los 5 niveles!
                  </p>

                  <h2 className="mt-2 text-2xl font-medium">
                    Excelente concentración
                  </h2>

                  <p className="mt-2 text-sm text-white/55">
                    Llegaste hasta el 100 y completaste
                    todo el desafío.
                  </p>

                  <p className="mt-2 text-sm text-white/40">
                    Puntuación final: {score}
                  </p>
                </>

              ) : (

                <>
                  <p className="text-sm text-white/50">
                    El tiempo terminó
                  </p>

                  <h2 className="mt-2 text-2xl font-medium">
                    Buen intento
                  </h2>

                  <p className="mt-2 text-sm text-white/55">
                    Llegaste al nivel {level} y alcanzaste
                    el número {Math.max(1, nextNumber - 1)}.
                  </p>

                  <p className="mt-2 text-sm text-white/40">
                    Puntuación: {score}
                  </p>
                </>

              )}

              <button
                type="button"
                onClick={restartGame}
                className="
                  mx-auto
                  mt-5
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
                Jugar nuevamente
              </button>

            </div>

          )}

        </div>

        {/* =====================================================
            AVISO
        ===================================================== */}

        <div
          className="
            mt-5
            rounded-[20px]
            border
            border-white/10
            bg-black/20
            px-5
            py-4
            backdrop-blur-xl
          "
        >

          <div className="flex items-start gap-3">

            <Heart
              size={16}
              className="mt-0.5 shrink-0 text-white/35"
            />

            <p className="text-[11px] leading-5 text-white/35">
              Esta experiencia es recreativa y está
              diseñada para acompañar momentos de
              concentración y entretenimiento. No
              sustituye una evaluación, diagnóstico,
              tratamiento ni las indicaciones de un
              profesional de la salud.
            </p>

          </div>

        </div>

        {/* =====================================================
            PIE
        ===================================================== */}

        <div className="pb-4 pt-4 text-center">

          <p className="text-xs text-white/30">
            Un número a la vez. Sin prisa.
          </p>

        </div>

      </div>

    </section>
  );
}