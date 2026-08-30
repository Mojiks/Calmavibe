// src/pages/MemoriaCalmavibe.tsx

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Brain,
  Heart,
} from "lucide-react";

interface MemoriaCalmavibeProps {
  onBack: () => void;
}

interface Card {
  id: number;
  symbol: string;
  pair: string;
}

/*
 * ==========================================================
 * CONFIGURACIÓN DEL JUEGO
 * ==========================================================
 */

const STARTING_TIME = 60;
const TOTAL_LEVELS = 5;

const PAIRS_PER_LEVEL = [
  4,  // Nivel 1
  6,  // Nivel 2
  8,  // Nivel 3
  10, // Nivel 4
  12, // Nivel 5
];

/*
 * ==========================================================
 * SÍMBOLOS
 * ==========================================================
 */

const SYMBOLS = [
  { symbol: "🌿", pair: "naturaleza" },
  { symbol: "🌙", pair: "noche" },
  { symbol: "☁️", pair: "nube" },
  { symbol: "💧", pair: "agua" },
  { symbol: "🌸", pair: "flor" },
  { symbol: "🕯️", pair: "luz" },
  { symbol: "🍃", pair: "hoja" },
  { symbol: "⭐", pair: "estrella" },
  { symbol: "🌊", pair: "mar" },
  { symbol: "🍂", pair: "otoño" },
  { symbol: "🌻", pair: "sol" },
  { symbol: "🪷", pair: "calma" },
];

/*
 * ==========================================================
 * CREAR TABLERO
 * ==========================================================
 */

function createDeck(level: number): Card[] {
  const numberOfPairs =
    PAIRS_PER_LEVEL[level - 1] ?? PAIRS_PER_LEVEL[0];

  const selectedSymbols = SYMBOLS.slice(0, numberOfPairs);

  const pairs = selectedSymbols.flatMap((item, pairIndex) => [
    {
      id: pairIndex * 2,
      symbol: item.symbol,
      pair: item.pair,
    },
    {
      id: pairIndex * 2 + 1,
      symbol: item.symbol,
      pair: item.pair,
    },
  ]);

  return [...pairs].sort(() => Math.random() - 0.5);
}

/*
 * ==========================================================
 * COMPONENTE
 * ==========================================================
 */

export default function MemoriaCalmavibe({
  onBack,
}: MemoriaCalmavibeProps) {
  const [level, setLevel] = useState(1);

  const [cards, setCards] = useState<Card[]>(() =>
    createDeck(1)
  );

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const [moves, setMoves] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(STARTING_TIME);

  const [gameOver, setGameOver] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [locked, setLocked] = useState(false);

  const numberOfPairs =
    PAIRS_PER_LEVEL[level - 1] ?? PAIRS_PER_LEVEL[0];

  const completed = matched.length === cards.length;

  /*
   * ==========================================================
   * CONFIGURACIÓN VISUAL DEL TABLERO
   * ==========================================================
   */

  const gridColumns = useMemo(() => {
    if (cards.length <= 8) {
      return "grid-cols-4";
    }

    if (cards.length <= 16) {
      return "grid-cols-4";
    }

    return "grid-cols-6";
  }, [cards.length]);

  /*
   * ==========================================================
   * TEMPORIZADOR
   * ==========================================================
   */

  useEffect(() => {
    if (gameOver || gameCompleted || completed) {
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
  }, [
    time,
    gameOver,
    gameCompleted,
    completed,
  ]);

  /*
   * ==========================================================
   * COMPROBAR PAREJA
   * ==========================================================
   */

  useEffect(() => {
    if (flipped.length !== 2) {
      return;
    }

    const first = cards[flipped[0]];
    const second = cards[flipped[1]];

    if (!first || !second) {
      return;
    }

    setLocked(true);

    const check = window.setTimeout(() => {
      if (first.pair === second.pair) {
        setMatched((current) => [
          ...current,
          first.id,
          second.id,
        ]);

        setScore((current) => current + level * 100);

        setFlipped([]);
        setLocked(false);
      } else {
        setTime((current) =>
          Math.max(0, current - 2)
        );

        setFlipped([]);
        setLocked(false);
      }

      setMoves((current) => current + 1);

      setTotalMoves((current) => current + 1);
    }, 650);

    return () => window.clearTimeout(check);
  }, [flipped, cards, level]);

  /*
   * ==========================================================
   * COMPLETAR NIVEL
   * ==========================================================
   */

  useEffect(() => {
    if (!completed || gameOver) {
      return;
    }

    /*
     * NIVEL FINAL
     */

    if (level >= TOTAL_LEVELS) {
      setGameCompleted(true);
      setGameOver(true);
      return;
    }

    /*
     * PASAR AL SIGUIENTE NIVEL
     */

    const nextLevel = level + 1;

    const nextLevelTimer = window.setTimeout(() => {
      setLevel(nextLevel);

      setCards(createDeck(nextLevel));

      setFlipped([]);
      setMatched([]);

      setMoves(0);

      setTime(STARTING_TIME);

      setGameOver(false);
      setLocked(false);
    }, 1200);

    return () => window.clearTimeout(nextLevelTimer);
  }, [
    completed,
    level,
    gameOver,
  ]);

  /*
   * ==========================================================
   * SELECCIONAR CARTA
   * ==========================================================
   */

  const handleCardClick = (index: number) => {
    if (gameOver || locked) {
      return;
    }

    if (flipped.includes(index)) {
      return;
    }

    if (matched.includes(cards[index].id)) {
      return;
    }

    if (flipped.length >= 2) {
      return;
    }

    setFlipped((current) => [
      ...current,
      index,
    ]);
  };

  /*
   * ==========================================================
   * REINICIAR JUEGO
   * ==========================================================
   */

  const restartGame = () => {
    setLevel(1);

    setCards(createDeck(1));

    setFlipped([]);
    setMatched([]);

    setMoves(0);
    setTotalMoves(0);

    setScore(0);

    setTime(STARTING_TIME);

    setGameOver(false);
    setGameCompleted(false);

    setLocked(false);
  };

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

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
              Memoria Calmavibe
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Encuentra las parejas a tu propio ritmo.
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
                Voltea dos cartas e intenta encontrar sus parejas.
                Observa, recuerda y juega con calma. Es una experiencia
                recreativa diseñada para ejercitar la atención y la
                memoria de forma sencilla.
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

          {/* PAREJAS */}

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
              Parejas
            </p>

            <p className="mt-1 text-xl font-medium">
              {matched.length / 2} / {numberOfPairs}
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

            <div className="mb-5 text-center">

              <p className="text-sm text-white/45">
                Nivel {level}
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Encuentra todas las parejas
              </h2>

              <p className="mt-1 text-xs text-white/35">
                {numberOfPairs} parejas · {numberOfPairs * 2} cartas
              </p>

            </div>

            {/* =================================================
                GRID
            ================================================= */}

            <div
              className={`
                mx-auto
                grid
                max-w-[620px]
                ${gridColumns}
                gap-3
              `}
            >

              {cards.map((card, index) => {

                const isFlipped =
                  flipped.includes(index);

                const isMatched =
                  matched.includes(card.id);

                return (
                  <button
                    key={`${card.id}-${index}`}
                    type="button"
                    onClick={() =>
                      handleCardClick(index)
                    }
                    disabled={
                      gameOver ||
                      locked ||
                      isFlipped ||
                      isMatched
                    }
                    aria-label={
                      isFlipped || isMatched
                        ? `Carta ${card.pair}`
                        : `Carta oculta ${index + 1}`
                    }
                    className="
                      aspect-square
                      rounded-[18px]
                      border
                      border-white/10
                      transition
                      duration-300
                      hover:scale-[1.03]
                      active:scale-95
                      disabled:cursor-default
                    "
                  >

                    {isFlipped || isMatched ? (

                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          rounded-[18px]
                          border
                          border-[#A7D36D]/30
                          bg-[#7B8F5D]/20
                          text-3xl
                          shadow-[0_0_25px_rgba(167,211,109,.08)]
                        "
                      >
                        {card.symbol}
                      </div>

                    ) : (

                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          rounded-[18px]
                          border
                          border-white/10
                          bg-white/[0.035]
                          text-xl
                          text-white/20
                          transition
                          hover:bg-white/[0.07]
                          hover:text-white/40
                        "
                      >
                        ✦
                      </div>

                    )}

                  </button>
                );

              })}

            </div>

            {/* =================================================
                TRANSICIÓN ENTRE NIVELES
            ================================================= */}

            {completed &&
              !gameCompleted &&
              !gameOver && (
                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-[#A7D36D]/20
                    bg-[#7B8F5D]/10
                    p-5
                    text-center
                  "
                >

                  <p className="text-sm text-[#A7D36D]">
                    Nivel completado
                  </p>

                  <p className="mt-1 text-xs text-white/45">
                    Preparando el siguiente nivel...
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

                {gameCompleted ? (

                  <>
                    <p className="text-sm text-[#A7D36D]">
                      ¡Completaste los 5 niveles!
                    </p>

                    <h2 className="mt-2 text-2xl font-medium">
                      Memoria Calmavibe completada
                    </h2>

                    <p className="mt-2 text-sm text-white/55">
                      Encontraste todas las parejas de los
                      cinco niveles en {totalMoves} movimientos.
                    </p>

                    <p className="mt-2 text-sm text-white/40">
                      Puntuación final: {score} puntos.
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
                      Llegaste al nivel {level} y encontraste{" "}
                      {matched.length / 2} de {numberOfPairs} parejas.
                    </p>

                    <p className="mt-2 text-sm text-white/40">
                      Puntuación: {score} puntos.
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
              Esta experiencia es recreativa y está diseñada para
              acompañar momentos de concentración y entretenimiento.
              No sustituye una evaluación, diagnóstico, tratamiento
              ni las indicaciones de un profesional de la salud.
            </p>

          </div>

        </div>

        {/* =====================================================
            PIE
        ===================================================== */}

        <div className="pb-4 pt-4 text-center">

          <p className="text-xs text-white/30">
            No tienes que hacerlo perfecto. Solo observa,
            recuerda y vuelve al presente.
          </p>

        </div>

      </div>
    </section>
  );
}