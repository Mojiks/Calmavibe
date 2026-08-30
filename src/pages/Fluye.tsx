// src/pages/Fluye.tsx

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
  ArrowUp,
  Check,
  Heart,
  RotateCcw,
  Trophy,
} from "lucide-react";

interface FluyeProps {
  onBack: () => void;
}

const TOTAL_LEVELS = 10;

type Cell = 0 | 1;

interface Position {
  row: number;
  col: number;
}

interface Maze {
  grid: Cell[][];
  rows: number;
  cols: number;
  start: Position;
  end: Position;
}

/*
==========================================================
GENERADOR DE LABERINTO
==========================================================
*/

function generateMaze(level: number): Maze {
  /*
   * La dificultad aumenta poco a poco.
   * Siempre mantenemos dimensiones impares.
   */

  const size = Math.min(
    11 + Math.floor(level / 2) * 2,
    21
  );

  const rows = size;
  const cols = size;

  const grid: Cell[][] = Array.from(
    { length: rows },
    () =>
      Array.from(
        { length: cols },
        () => 1 as Cell
      )
  );

  const start = {
    row: 1,
    col: 1,
  };

  const end = {
    row: rows - 2,
    col: cols - 2,
  };

  /*
   * DFS para crear caminos.
   */

  const stack: Position[] = [
    start,
  ];

  grid[start.row][start.col] = 0;

  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  while (stack.length > 0) {
    const current =
      stack[
        stack.length - 1
      ];

    const available =
      directions
        .map(
          ([dr, dc]) => ({
            row:
              current.row + dr,
            col:
              current.col + dc,
            wallRow:
              current.row +
              dr / 2,
            wallCol:
              current.col +
              dc / 2,
          })
        )
        .filter(
          (next) =>
            next.row > 0 &&
            next.row <
              rows - 1 &&
            next.col > 0 &&
            next.col <
              cols - 1 &&
            grid[next.row][
              next.col
            ] === 1
        );

    if (
      available.length === 0
    ) {
      stack.pop();
      continue;
    }

    const next =
      available[
        Math.floor(
          Math.random() *
            available.length
        )
      ];

    grid[next.row][
      next.col
    ] = 0;

    grid[next.wallRow][
      next.wallCol
    ] = 0;

    stack.push({
      row: next.row,
      col: next.col,
    });
  }

  /*
   * Aseguramos que la llegada
   * siempre sea transitable.
   */

  grid[end.row][end.col] = 0;

  /*
   * Abrimos un pequeño acceso
   * a la meta.
   */

  grid[end.row][
    end.col - 1
  ] = 0;

  return {
    grid,
    rows,
    cols,
    start,
    end,
  };
}

/*
==========================================================
TEXTOS
==========================================================
*/

function getLevelDescription(
  level: number
) {
  if (level <= 2) {
    return "Encuentra el camino con calma.";
  }

  if (level <= 4) {
    return "Observa antes de avanzar.";
  }

  if (level <= 6) {
    return "Deja que el camino aparezca poco a poco.";
  }

  if (level <= 8) {
    return "Respira y busca tu propia ruta.";
  }

  return "No necesitas ir rápido. Solo encuentra la salida.";
}

/*
==========================================================
COMPONENTE
==========================================================
*/

export default function Fluye({
  onBack,
}: FluyeProps) {
  const [level, setLevel] =
    useState(1);

  const [maze, setMaze] =
    useState<Maze>(() =>
      generateMaze(1)
    );

  const [player, setPlayer] =
    useState<Position>(
      maze.start
    );

  const [started, setStarted] =
    useState(false);

  const [completedLevel, setCompletedLevel] =
    useState(false);

  const [completedGame, setCompletedGame] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [moves, setMoves] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  /*
   * ========================================================
   * REINICIAR LABERINTO
   * ========================================================
   */

  const resetMaze = (
    currentLevel = level
  ) => {
    const newMaze =
      generateMaze(
        currentLevel
      );

    setMaze(newMaze);

    setPlayer(
      newMaze.start
    );

    setMoves(0);

    setCompletedLevel(
      false
    );

    setFeedback("");
  };

  /*
   * ========================================================
   * COMENZAR
   * ========================================================
   */

  const startGame = () => {
    setLevel(1);

    const newMaze =
      generateMaze(1);

    setMaze(newMaze);

    setPlayer(
      newMaze.start
    );

    setScore(0);

    setMoves(0);

    setStarted(true);

    setCompletedLevel(
      false
    );

    setCompletedGame(
      false
    );

    setFeedback("");
  };

  /*
   * ========================================================
   * MOVER JUGADOR
   * ========================================================
   */

  const movePlayer = (
    direction:
      | "up"
      | "down"
      | "left"
      | "right"
  ) => {
    if (
      !started ||
      completedLevel ||
      completedGame
    ) {
      return;
    }

    let row =
      player.row;

    let col =
      player.col;

    if (
      direction === "up"
    ) {
      row--;
    }

    if (
      direction === "down"
    ) {
      row++;
    }

    if (
      direction === "left"
    ) {
      col--;
    }

    if (
      direction === "right"
    ) {
      col++;
    }

    /*
     * Fuera del tablero.
     */

    if (
      row < 0 ||
      row >= maze.rows ||
      col < 0 ||
      col >= maze.cols
    ) {
      return;
    }

    /*
     * Pared.
     */

    if (
      maze.grid[row][col] ===
      1
    ) {
      /*
       * No castigamos.
       * Simplemente no avanza.
       */

      return;
    }

    const nextPosition = {
      row,
      col,
    };

    setPlayer(
      nextPosition
    );

    setMoves(
      (current) =>
        current + 1
    );

    /*
     * ======================================================
     * LLEGADA
     * ======================================================
     */

    if (
      row === maze.end.row &&
      col === maze.end.col
    ) {
      const levelScore =
        Math.max(
          100 -
            Math.max(
              0,
              moves - 10
            ),
          50
        );

      setScore(
        (current) =>
          current + levelScore
      );

      setCompletedLevel(
        true
      );

      /*
       * ÚLTIMO NIVEL
       */

      if (
        level >=
        TOTAL_LEVELS
      ) {
        setCompletedGame(
          true
        );

        setStarted(false);

        setFeedback(
          "Completaste los 10 niveles."
        );

        return;
      }

      /*
       * Siguiente nivel.
       */

      setFeedback(
        `Nivel ${level} completado`
      );

      window.setTimeout(() => {
        const nextLevel =
          level + 1;

        const newMaze =
          generateMaze(
            nextLevel
          );

        setLevel(
          nextLevel
        );

        setMaze(
          newMaze
        );

        setPlayer(
          newMaze.start
        );

        setMoves(0);

        setCompletedLevel(
          false
        );

        setFeedback("");
      }, 1000);
    }
  };

  /*
   * ========================================================
   * TECLADO
   * ========================================================
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
          "W",
          "A",
          "S",
          "D",
        ].includes(
          event.key
        )
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          movePlayer("up");
          break;

        case "ArrowDown":
        case "s":
        case "S":
          movePlayer("down");
          break;

        case "ArrowLeft":
        case "a":
        case "A":
          movePlayer("left");
          break;

        case "ArrowRight":
        case "d":
        case "D":
          movePlayer("right");
          break;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    player,
    maze,
    started,
    completedLevel,
    completedGame,
    moves,
  ]);

  /*
   * ========================================================
   * SWIPE EN MÓVIL
   * ========================================================
   */

  const [touchStart, setTouchStart] =
    useState<{
      x: number;
      y: number;
    } | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    const touch =
      event.touches[0];

    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (!touchStart) {
      return;
    }

    const touch =
      event.changedTouches[0];

    const deltaX =
      touch.clientX -
      touchStart.x;

    const deltaY =
      touch.clientY -
      touchStart.y;

    const threshold = 25;

    if (
      Math.abs(deltaX) <
        threshold &&
      Math.abs(deltaY) <
        threshold
    ) {
      setTouchStart(null);
      return;
    }

    if (
      Math.abs(deltaX) >
      Math.abs(deltaY)
    ) {
      if (deltaX > 0) {
        movePlayer("right");
      } else {
        movePlayer("left");
      }
    } else {
      if (deltaY > 0) {
        movePlayer("down");
      } else {
        movePlayer("up");
      }
    }

    setTouchStart(null);
  };

  /*
   * ========================================================
   * CELDAS
   * ========================================================
   */

  const mazeCells =
    useMemo(() => {
      return maze.grid.flatMap(
        (row, rowIndex) =>
          row.map(
            (cell, colIndex) => ({
              cell,
              row: rowIndex,
              col: colIndex,
            })
          )
      );
    }, [maze]);

  /*
   * ========================================================
   * RENDER
   * ========================================================
   */

  return (
    <section className="min-h-screen px-8 pb-10 pt-8 text-white">

      <div className="mx-auto max-w-[1100px]">

        {/* ==================================================
            CABECERA
        ================================================== */}

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
              Fluye
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Encuentra el camino a tu propio ritmo.
            </p>

          </div>

        </div>

        {/* ==================================================
            EXPLICACIÓN
        ================================================== */}

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
              <Trophy size={17} />
            </div>

            <div>

              <h2 className="text-sm font-medium text-white">
                ¿Cómo se juega?
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Lleva la esfera desde <strong>Inicio</strong> hasta
                <strong> Llegada</strong> encontrando el camino
                a través del laberinto.
              </p>

              <p className="mt-2 text-xs leading-5 text-white/35">
                En computadora usa las flechas del teclado o
                WASD. En móvil puedes deslizar el dedo sobre
                el laberinto o utilizar los controles.
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            ESTADÍSTICAS
        ================================================== */}

        <div className="mt-5 grid grid-cols-3 gap-3">

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

            <p className="text-xs text-white/45">
              Puntos
            </p>

            <p className="mt-1 text-xl font-medium">
              {score}
            </p>

          </div>

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
              Movimientos
            </p>

            <p className="mt-1 text-xl font-medium">
              {moves}
            </p>

          </div>

        </div>

        {/* ==================================================
            LABERINTO
        ================================================== */}

        <div
          className="
            mt-6
            rounded-[28px]
            border
            border-white/10
            bg-black/35
            p-5
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <div className="mb-5 text-center">

            <p className="text-sm text-white/45">
              Nivel {level}
            </p>

            <h2 className="mt-1 text-xl font-medium">
              Encuentra el camino
            </h2>

            <p className="mt-1 text-xs text-white/35">
              {getLevelDescription(
                level
              )}
            </p>

          </div>

          {/* ==================================================
              TABLERO
          ================================================== */}

          <div
            className="
              mx-auto
              w-full
              max-w-[650px]
              rounded-[24px]
              border
              border-white/10
              bg-black/25
              p-3
              touch-none
            "
            onTouchStart={
              handleTouchStart
            }
            onTouchEnd={
              handleTouchEnd
            }
          >

            <div
              className="
                grid
                overflow-hidden
                rounded-[16px]
              "
              style={{
                gridTemplateColumns: `repeat(${maze.cols}, minmax(0, 1fr))`,
              }}
            >

              {mazeCells.map(
                ({
                  cell,
                  row,
                  col,
                }) => {

                  const isPlayer =
                    player.row ===
                      row &&
                    player.col ===
                      col;

                  const isStart =
                    maze.start
                      .row === row &&
                    maze.start
                      .col === col;

                  const isEnd =
                    maze.end.row ===
                      row &&
                    maze.end.col ===
                      col;

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`
                        aspect-square
                        border
                        border-white/[0.035]
                        transition-colors
                        duration-200

                        ${
                          cell === 1
                            ? "bg-[#171511]"
                            : "bg-[#393126]"
                        }

                        ${
                          isStart
                            ? "bg-[#526344]"
                            : ""
                        }

                        ${
                          isEnd
                            ? "bg-[#6F7F4D]"
                            : ""
                        }
                      `}
                    >

                      {isStart &&
                        !isPlayer && (
                          <div className="flex h-full items-center justify-center">

                            <span className="text-[8px] font-medium uppercase tracking-wider text-white/45">
                              Inicio
                            </span>

                          </div>
                        )}

                      {isEnd &&
                        !isPlayer && (
                          <div className="flex h-full items-center justify-center">

                            <Check
                              size={16}
                              className="text-[#D9E9B7]"
                            />

                          </div>
                        )}

                      {isPlayer && (
                        <div className="flex h-full items-center justify-center">

                          <div
                            className="
                              h-[58%]
                              w-[58%]
                              rounded-full
                              bg-[#A7D36D]
                              shadow-[0_0_18px_rgba(167,211,109,.45)]
                              transition-all
                            "
                          />

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* ==================================================
              CONTROLES
          ================================================== */}

          <div className="mt-5 flex flex-col items-center">

            <p className="mb-3 text-[11px] text-white/30">
              Desliza sobre el laberinto o utiliza los controles
            </p>

            <div className="grid grid-cols-3 gap-2">

              <div />

              <button
                type="button"
                aria-label="Mover arriba"
                onClick={() =>
                  movePlayer("up")
                }
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white/60
                  transition
                  active:scale-95
                  hover:bg-white/10
                "
              >
                <ArrowUp size={18} />
              </button>

              <div />

              <button
                type="button"
                aria-label="Mover izquierda"
                onClick={() =>
                  movePlayer("left")
                }
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white/60
                  transition
                  active:scale-95
                  hover:bg-white/10
                "
              >
                <ArrowLeftIcon size={18} />
              </button>

              <button
                type="button"
                aria-label="Mover abajo"
                onClick={() =>
                  movePlayer("down")
                }
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white/60
                  transition
                  active:scale-95
                  hover:bg-white/10
                "
              >
                <ArrowDown size={18} />
              </button>

              <button
                type="button"
                aria-label="Mover derecha"
                onClick={() =>
                  movePlayer("right")
                }
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white/60
                  transition
                  active:scale-95
                  hover:bg-white/10
                "
              >
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

          {/* ==================================================
              COMENZAR
          ================================================== */}

          {!started &&
            !completedGame &&
            !completedLevel && (
              <div className="mt-5 text-center">

                <button
                  type="button"
                  onClick={
                    startGame
                  }
                  className="
                    rounded-full
                    bg-[#7B8F5D]
                    px-7
                    py-3
                    text-sm
                    text-white
                    transition
                    hover:bg-[#879968]
                  "
                >
                  Comenzar
                </button>

              </div>
            )}

          {/* ==================================================
              NIVEL COMPLETADO
          ================================================== */}

          {completedLevel &&
            !completedGame && (
              <div className="mt-5 text-center">

                <p className="text-sm text-[#A7D36D]">
                  {feedback}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Preparando el siguiente camino...
                </p>

              </div>
            )}

          {/* ==================================================
              JUEGO TERMINADO
          ================================================== */}

          {completedGame && (
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-black/40
                p-6
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#7B8F5D]/20
                  text-[#A7D36D]
                "
              >
                <Check size={23} />
              </div>

              <p className="mt-4 text-sm text-[#A7D36D]">
                Los 10 niveles están completos
              </p>

              <h2 className="mt-2 text-2xl font-medium">
                Encontraste el camino
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45">
                No se trataba de llegar rápido.
                Solo de avanzar, observar y encontrar
                una ruta a tu propio ritmo.
              </p>

              <p className="mt-3 text-sm text-white/35">
                Puntuación final: {score}
              </p>

              <button
                type="button"
                onClick={
                  startGame
                }
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

        {/* ==================================================
            SIGNIFICADO
        ================================================== */}

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
              className="mt-0.5 shrink-0 text-white/30"
            />

            <div>

              <p className="text-xs font-medium text-white/50">
                ¿Para qué es esta experiencia?
              </p>

              <p className="mt-2 text-[11px] leading-5 text-white/35">
                Fluye es una experiencia recreativa diseñada
                para ofrecer unos minutos de atención tranquila,
                orientación espacial y resolución sencilla de
                problemas. La intención no es competir ni hacerlo
                perfectamente, sino avanzar a tu propio ritmo.
              </p>

              <p className="mt-3 text-[10px] leading-5 text-white/25">
                Esta experiencia es recreativa y de bienestar.
                No sustituye una evaluación, diagnóstico,
                tratamiento ni las indicaciones de un profesional
                de la salud.
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            PIE
        ================================================== */}

        <div className="pb-4 pt-4 text-center">

          <p className="text-xs text-white/30">
            Un paso a la vez.
          </p>

        </div>

      </div>

    </section>
  );
}