// src/pages/EncuentraPatron.tsx

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Brain,
  Heart,
} from "lucide-react";

interface EncuentraPatronProps {
  onBack: () => void;
}

interface Tile {
  id: number;
  symbol: string;
  shape: "circle" | "square" | "diamond";
  highlighted: boolean;
}

const TOTAL_LEVELS = 5;
const STARTING_TIME = 35;

const LEVEL_CONFIG = [
  {
    size: 3,
    symbols: ["●", "●", "■"],
  },
  {
    size: 4,
    symbols: ["●", "■", "●", "■"],
  },
  {
    size: 4,
    symbols: ["◆", "●", "◆", "●"],
  },
  {
    size: 5,
    symbols: ["●", "■", "◆", "●", "■"],
  },
  {
    size: 5,
    symbols: ["◆", "●", "■", "◆", "●"],
  },
];

const SHAPES: Array<"circle" | "square" | "diamond"> = [
  "circle",
  "square",
  "diamond",
];

function createPattern(level: number) {
  const config =
    LEVEL_CONFIG[level - 1] ?? LEVEL_CONFIG[0];

  const totalTiles = config.size * config.size;

  /*
   * Elegimos qué posición será la pieza diferente.
   */

  const differentIndex = Math.floor(
    Math.random() * totalTiles
  );

  /*
   * Creamos el patrón normal.
   */

  const tiles: Tile[] = Array.from(
    { length: totalTiles },
    (_, index) => {
      const patternIndex =
        index % config.symbols.length;

      const symbol =
        config.symbols[patternIndex];

      const shape =
        SHAPES[
          (patternIndex + level - 1) %
            SHAPES.length
        ];

      return {
        id: index,
        symbol,
        shape,
        highlighted: false,
      };
    }
  );

  /*
   * Rompemos el patrón en una sola pieza.
   */

  const normalTile = tiles[differentIndex];

  const alternativeSymbol =
    config.symbols[
      (config.symbols.indexOf(normalTile.symbol) + 1) %
        config.symbols.length
    ];

  const alternativeShape =
    SHAPES[
      (SHAPES.indexOf(normalTile.shape) + 1) %
        SHAPES.length
    ];

  tiles[differentIndex] = {
    ...normalTile,
    symbol: alternativeSymbol,
    shape: alternativeShape,
  };

  return {
    tiles,
    differentIndex,
    size: config.size,
  };
}

export default function EncuentraPatron({
  onBack,
}: EncuentraPatronProps) {
  const [level, setLevel] = useState(1);

  const [pattern, setPattern] = useState(() =>
    createPattern(1)
  );

  const [time, setTime] = useState(
    STARTING_TIME
  );

  const [score, setScore] = useState(0);

  const [attempts, setAttempts] = useState(0);

  const [gameOver, setGameOver] =
    useState(false);

  const [completedGame, setCompletedGame] =
    useState(false);

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(null);

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

    return () =>
      window.clearTimeout(timer);
  }, [
    time,
    gameOver,
    completedGame,
  ]);

  /*
   * ==========================================================
   * SELECCIONAR PIEZA
   * ==========================================================
   */

  const handleTileClick = (
    index: number
  ) => {
    if (gameOver || completedGame) {
      return;
    }

    setAttempts((current) => current + 1);

    if (
      index === pattern.differentIndex
    ) {
      setFeedback("correct");

      const levelPoints = level * 100;

      const timeBonus = time * 2;

      setScore(
        (current) =>
          current +
          levelPoints +
          timeBonus
      );

      /*
       * Último nivel.
       */

      if (level >= TOTAL_LEVELS) {
        window.setTimeout(() => {
          setCompletedGame(true);
          setGameOver(true);
        }, 700);

        return;
      }

      /*
       * Siguiente nivel.
       */

      window.setTimeout(() => {
        const nextLevel = level + 1;

        setLevel(nextLevel);

        setPattern(
          createPattern(nextLevel)
        );

        setTime(STARTING_TIME);

        setFeedback(null);
      }, 800);
    } else {
      setFeedback("wrong");

      setTime((current) =>
        Math.max(0, current - 4)
      );

      window.setTimeout(() => {
        setFeedback(null);
      }, 500);
    }
  };

  /*
   * ==========================================================
   * REINICIAR
   * ==========================================================
   */

  const restartGame = () => {
    setLevel(1);

    setPattern(createPattern(1));

    setTime(STARTING_TIME);

    setScore(0);

    setAttempts(0);

    setGameOver(false);

    setCompletedGame(false);

    setFeedback(null);
  };

  /*
   * ==========================================================
   * CONFIGURACIÓN VISUAL
   * ==========================================================
   */

  const gridClass = useMemo(() => {
    if (pattern.size === 3) {
      return "grid-cols-3";
    }

    if (pattern.size === 4) {
      return "grid-cols-4";
    }

    return "grid-cols-5";
  }, [pattern.size]);

  const shapeClass = (
    shape: Tile["shape"]
  ) => {
    if (shape === "circle") {
      return "rounded-full";
    }

    if (shape === "diamond") {
      return "rotate-45 rounded-[6px]";
    }

    return "rounded-[8px]";
  };

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
              Encuentra el patrón
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Observa, encuentra la diferencia y sigue el flujo.
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
                Observa cuidadosamente las piezas y descubre
                cuál rompe el patrón que siguen las demás.
                La dinámica busca ofrecer una experiencia
                recreativa de atención, observación y
                reconocimiento de secuencias.
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

          {/* INTENTOS */}

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
              Intentos
            </p>

            <p className="mt-1 text-xl font-medium">
              {attempts}
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

        <div className="mt-6 flex justify-center">

          <div
            className="
              w-full
              max-w-[720px]
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
                Encuentra la pieza que rompe el patrón
              </h2>

              <p className="mt-1 text-xs text-white/35">
                Observa antes de elegir. No hay prisa.
              </p>

            </div>

            {/* =================================================
                GRID
            ================================================= */}

            <div
              className={`
                mx-auto
                grid
                max-w-[560px]
                ${gridClass}
                gap-3
              `}
            >

              {pattern.tiles.map(
                (tile, index) => (

                  <button
                    key={tile.id}
                    type="button"
                    onClick={() =>
                      handleTileClick(index)
                    }
                    disabled={
                      gameOver ||
                      completedGame
                    }
                    aria-label={`Pieza ${index + 1}`}
                    className={`
                      aspect-square
                      rounded-[18px]
                      border
                      border-white/10
                      bg-white/[0.035]
                      transition
                      duration-200
                      hover:scale-[1.04]
                      hover:border-white/25
                      active:scale-95
                      disabled:cursor-default

                      ${
                        feedback === "wrong"
                          ? "animate-pulse"
                          : ""
                      }
                    `}
                  >

                    <div
                      className={`
                        mx-auto
                        flex
                        h-[45%]
                        w-[45%]
                        items-center
                        justify-center
                        bg-[#8FB9A6]
                        text-[clamp(18px,3vw,28px)]
                        text-[#17251f]
                        ${shapeClass(tile.shape)}
                      `}
                    >
                      <span
                        className={
                          tile.shape ===
                          "diamond"
                            ? "-rotate-45"
                            : ""
                        }
                      >
                        {tile.symbol}
                      </span>
                    </div>

                  </button>

                )
              )}

            </div>

            {/* =================================================
                FEEDBACK
            ================================================= */}

            {feedback === "correct" && (
              <div className="mt-5 text-center">

                <p className="text-sm text-[#A7D36D]">
                  ¡Correcto!
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Muy buena observación.
                </p>

              </div>
            )}

            {feedback === "wrong" && (
              <div className="mt-5 text-center">

                <p className="text-sm text-white/70">
                  Casi...
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Observa nuevamente el patrón.
                </p>

              </div>
            )}

            {/* =================================================
                RESULTADO FINAL
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
                      Excelente observación
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      Encontraste todas las diferencias
                      y completaste el desafío.
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
                      Llegaste al nivel {level}
                      con {score} puntos.
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
              Esta experiencia es recreativa y está diseñada
              para acompañar momentos de concentración y
              entretenimiento. No sustituye una evaluación,
              diagnóstico, tratamiento ni las indicaciones
              de un profesional de la salud.
            </p>

          </div>

        </div>

        {/* =====================================================
            PIE
        ===================================================== */}

        <div className="pb-4 pt-4 text-center">

          <p className="text-xs text-white/30">
            Observa con calma. Encuentra el patrón.
            Vuelve al presente.
          </p>

        </div>

      </div>

    </section>
  );
}