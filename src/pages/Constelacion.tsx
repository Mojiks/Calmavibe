import { useEffect, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Sparkles,
  Eye,
  Brain,
  Heart,
  Volume2,
  Lightbulb,
} from "lucide-react";

interface ConstelacionProps {
  onBack: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
}

const STARTING_TIME = 45;
const INITIAL_STARS = 5;

function generateStars(count: number): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    let x = 15 + Math.random() * 70;
    let y = 15 + Math.random() * 70;

    let attempts = 0;

    while (
      stars.some(
        (star) =>
          Math.abs(star.x - x) < 13 &&
          Math.abs(star.y - y) < 13
      ) &&
      attempts < 30
    ) {
      x = 15 + Math.random() * 70;
      y = 15 + Math.random() * 70;
      attempts++;
    }

    stars.push({
      id: i,
      x,
      y,
    });
  }

  return stars;
}

export default function Constelacion({
  onBack,
}: ConstelacionProps) {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(STARTING_TIME);

  const [gameOver, setGameOver] =
    useState(false);

  const [nextStar, setNextStar] = useState(0);

  const [stars, setStars] = useState(() =>
    generateStars(INITIAL_STARS)
  );

  const [connectedStars, setConnectedStars] =
    useState<number[]>([]);

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  const [largeStars, setLargeStars] =
    useState(false);

  /* =========================
     SONIDO
  ========================= */

  const playSound = (
    correct: boolean
  ) => {
    if (!soundEnabled) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      const context =
        new AudioContextClass();

      const oscillator =
        context.createOscillator();

      const gain =
        context.createGain();

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.frequency.value =
        correct ? 540 : 180;

      oscillator.type = "sine";

      gain.gain.setValueAtTime(
        0.0001,
        context.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.045,
        context.currentTime + 0.01
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.18
      );

      oscillator.start();

      oscillator.stop(
        context.currentTime + 0.18
      );
    } catch {
      // El sonido es opcional.
    }
  };

  /* =========================
     TEMPORIZADOR
  ========================= */

  useEffect(() => {
    if (gameOver) return;

    if (time <= 0) {
      setGameOver(true);
      return;
    }

    const timer =
      window.setTimeout(() => {
        setTime(
          (current) => current - 1
        );
      }, 1000);

    return () =>
      window.clearTimeout(timer);
  }, [time, gameOver]);

  /* =========================
     SELECCIONAR ESTRELLA
  ========================= */

  const handleStarClick = (
    starId: number
  ) => {
    if (gameOver) return;

    const correct =
      starId === nextStar;

    playSound(correct);

    if (!correct) {
      setTime(
        (current) =>
          Math.max(0, current - 3)
      );

      return;
    }

    const newConnected = [
      ...connectedStars,
      starId,
    ];

    setConnectedStars(
      newConnected
    );

    const isLastStar =
      nextStar === stars.length - 1;

    if (isLastStar) {
      const nextLevel = level + 1;

      setScore(
        (current) =>
          current + level * 20
      );

      setLevel(nextLevel);

      setTime(
        (current) =>
          Math.min(
            STARTING_TIME,
            current + 5
          )
      );

      const nextCount =
        Math.min(
          10,
          INITIAL_STARS +
            Math.floor(
              nextLevel / 2
            )
        );

      setStars(
        generateStars(nextCount)
      );

      setConnectedStars([]);

      setNextStar(0);

      return;
    }

    setNextStar(
      (current) => current + 1
    );
  };

  /* =========================
     REINICIAR
  ========================= */

  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setTime(STARTING_TIME);
    setGameOver(false);
    setNextStar(0);
    setConnectedStars([]);
    setStars(
      generateStars(INITIAL_STARS)
    );
  };

  return (
    <section
      className="
        min-h-screen
        px-6
        py-8
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-4rem)]
          max-w-5xl
          flex-col
        "
      >

        {/* =========================
            CABECERA
        ========================= */}

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

            <h1
              className="
                text-3xl
                font-light
                tracking-tight
              "
            >
              Constelación
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Conecta las estrellas con calma.
            </p>

          </div>
        </div>

        {/* =========================
            EXPLICACIÓN
        ========================= */}

        <div
          className="
            mt-8
            rounded-[28px]
            border
            border-white/10
            bg-black/30
            px-6
            py-5
            backdrop-blur-xl
          "
        >

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#8DB9E8]/10
                text-[#8DB9E8]
              "
            >
              <Sparkles size={20} />
            </div>

            <div>

              <h2 className="text-[17px] font-medium">
                ¿Qué es Constelación?
              </h2>

              <p
                className="
                  mt-2
                  max-w-[1050px]
                  text-[14px]
                  leading-6
                  text-white/60
                "
              >
                Constelación es una experiencia visual
                basada en seguir una secuencia de estrellas.
                Observa el espacio, identifica el siguiente
                punto y conéctalo con calma hasta completar
                la figura.
              </p>

              <div
                className="
                  mt-4
                  grid
                  gap-3
                  md:grid-cols-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <div className="flex items-center gap-2">

                    <Eye
                      size={16}
                      className="text-[#8DB9E8]"
                    />

                    <p className="text-sm font-medium">
                      👁️ Observación
                    </p>

                  </div>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-white/45
                    "
                  >
                    Invita a observar las posiciones
                    de los puntos y encontrar el
                    siguiente elemento.
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <div className="flex items-center gap-2">

                    <Brain
                      size={16}
                      className="text-[#8DB9E8]"
                    />

                    <p className="text-sm font-medium">
                      🧠 Atención
                    </p>

                  </div>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-white/45
                    "
                  >
                    Mantén tu atención en una secuencia
                    sencilla y avanza un punto a la vez.
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <div className="flex items-center gap-2">

                    <Heart
                      size={16}
                      className="text-[#8DB9E8]"
                    />

                    <p className="text-sm font-medium">
                      🌌 Pausa
                    </p>

                  </div>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-white/45
                    "
                  >
                    Puedes jugar a tu propio ritmo.
                    No necesitas completar el nivel
                    rápidamente.
                  </p>
                </div>

              </div>

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-[#F1C75B]/10
                  bg-[#F1C75B]/[0.04]
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    leading-5
                    text-white/45
                  "
                >
                  <span className="font-medium text-white/65">
                    No se trata de competir.
                  </span>{" "}
                  Observa una estrella, encuentra la
                  siguiente y continúa tranquilamente.
                  Si pierdes la secuencia, simplemente
                  vuelve a mirar.
                </p>
              </div>

              <div
                className="
                  mt-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                "
              >
                <p
                  className="
                    text-[11px]
                    leading-5
                    text-white/35
                  "
                >
                  <span className="font-medium text-white/50">
                    Aviso:
                  </span>{" "}
                  Constelación es una experiencia
                  recreativa y de bienestar. No es una
                  herramienta de diagnóstico, evaluación
                  o tratamiento médico y no sustituye la
                  orientación de un profesional de la salud.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* =========================
            CONTROLES
        ========================= */}

        <div
          className="
            mt-5
            flex
            justify-end
            gap-2
          "
        >

          <button
            type="button"
            onClick={() =>
              setSoundEnabled(
                (current) => !current
              )
            }
            aria-label={
              soundEnabled
                ? "Desactivar sonido"
                : "Activar sonido"
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/30
              text-white/60
              backdrop-blur-xl
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <Volume2 size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              setLargeStars(
                (current) => !current
              )
            }
            aria-label="Cambiar tamaño de las estrellas"
            className={`
              flex
              h-9
              items-center
              gap-2
              rounded-full
              border
              px-3
              text-xs
              backdrop-blur-xl
              transition
              ${
                largeStars
                  ? "border-[#8DB9E8]/40 bg-[#8DB9E8]/10 text-white"
                  : "border-white/10 bg-black/30 text-white/50"
              }
            `}
          >
            <Eye size={15} />

            Estrellas grandes
          </button>

        </div>

        {/* =========================
            INFORMACIÓN
        ========================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-3
            gap-3
          "
        >

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

            <div
              className="
                flex
                items-center
                gap-2
                text-white/45
              "
            >
              <Trophy size={15} />

              <span className="text-xs">
                Puntos
              </span>
            </div>

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
              {level}
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
              backdrop-blur-xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-white/45
              "
            >
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

        {/* =========================
            ÁREA DEL JUEGO
        ========================= */}

        <div
          className="
            flex
            flex-1
            items-center
            justify-center
            py-8
          "
        >

          <div
            className="
              w-full
              max-w-[700px]
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

              <p className="text-sm text-white/50">
                Observa el cielo
              </p>

              <h2 className="mt-1 text-xl font-medium">
                Conecta las estrellas
              </h2>

              <p className="mt-2 text-xs text-white/35">
                Siguiente estrella:{" "}
                {nextStar + 1}
              </p>

            </div>

            {/* =========================
                CIELO
            ========================= */}

            <div
              className="
                relative
                mx-auto
                aspect-[16/9]
                w-full
                overflow-hidden
                rounded-[22px]
                border
                border-white/10
                bg-[#05080D]/70
              "
            >

              {/* Estrellas decorativas */}

              <div
                className="
                  absolute
                  left-[8%]
                  top-[18%]
                  h-1
                  w-1
                  rounded-full
                  bg-white/30
                "
              />

              <div
                className="
                  absolute
                  left-[83%]
                  top-[25%]
                  h-1
                  w-1
                  rounded-full
                  bg-white/25
                "
              />

              <div
                className="
                  absolute
                  left-[18%]
                  top-[78%]
                  h-1
                  w-1
                  rounded-full
                  bg-white/20
                "
              />

              <div
                className="
                  absolute
                  left-[90%]
                  top-[72%]
                  h-1
                  w-1
                  rounded-full
                  bg-white/25
                "
              />

              {/* Líneas */}

              <svg
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                "
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {connectedStars.map(
                  (starId, index) => {
                    if (index === 0) {
                      return null;
                    }

                    const previous =
                      stars.find(
                        (star) =>
                          star.id ===
                          connectedStars[
                            index - 1
                          ]
                      );

                    const current =
                      stars.find(
                        (star) =>
                          star.id === starId
                      );

                    if (
                      !previous ||
                      !current
                    ) {
                      return null;
                    }

                    return (
                      <line
                        key={`${previous.id}-${current.id}`}
                        x1={previous.x}
                        y1={previous.y}
                        x2={current.x}
                        y2={current.y}
                        stroke="#8DB9E8"
                        strokeWidth="0.7"
                        opacity="0.65"
                      />
                    );
                  }
                )}
              </svg>

              {/* Estrellas */}

              {stars.map(
                (star) => {
                  const connected =
                    connectedStars.includes(
                      star.id
                    );

                  const isNext =
                    star.id === nextStar;

                  return (
                    <button
                      key={star.id}
                      type="button"
                      onClick={() =>
                        handleStarClick(
                          star.id
                        )
                      }
                      disabled={gameOver}
                      aria-label={`Estrella ${star.id + 1}`}
                      className="
                        absolute
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        transition-all
                        duration-300
                        hover:scale-125
                        disabled:cursor-default
                      "
                      style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                      }}
                    >

                      <span
                        className={`
                          block
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            largeStars
                              ? "h-7 w-7"
                              : "h-5 w-5"
                          }
                          ${
                            connected
                              ? "bg-[#8DB9E8] shadow-[0_0_22px_rgba(141,185,232,.8)]"
                              : isNext
                              ? "bg-white shadow-[0_0_25px_rgba(255,255,255,.9)]"
                              : "bg-white/75 shadow-[0_0_12px_rgba(255,255,255,.45)]"
                          }
                        `}
                      />

                    </button>
                  );
                }
              )}

            </div>

            {/* GAME OVER */}

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

                <p className="text-sm text-white/50">
                  El tiempo terminó
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Buen trabajo
                </h2>

                <p className="mt-2 text-sm text-white/55">
                  Llegaste al nivel{" "}
                  {level} con {score}{" "}
                  puntos.
                </p>

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

        {/* =========================
            SUGERENCIAS
        ========================= */}

        <div className="pb-3 text-center">

          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent(
                  "calmavibe:open-suggestions"
                )
              );
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-xs
              text-white/40
              transition
              hover:bg-white/5
              hover:text-white/70
            "
          >
            <Lightbulb size={13} />

            ¿Cómo podemos hacerlo mejor?
          </button>

          <p className="mt-1 text-[10px] text-white/25">
            No tienes que adaptarte tú a CalmaVibe.
            Queremos adaptar CalmaVibe a más personas.
          </p>

        </div>

        {/* =========================
            AVISO
        ========================= */}

        <div className="pb-2 text-center">

          <p
            className="
              mx-auto
              max-w-[650px]
              text-[9px]
              leading-4
              text-white/20
            "
          >
            Esta experiencia está diseñada para
            relajación, atención y entretenimiento.
            No constituye diagnóstico, tratamiento ni
            atención médica o psicológica, y no sustituye
            la evaluación de un profesional de la salud.
          </p>

        </div>

        {/* =========================
            PIE
        ========================= */}

        <div className="pb-2 text-center">

          <p className="text-xs text-white/30">
            No hay prisa. Solo observa y conecta.
          </p>

        </div>

      </div>
    </section>
  );
}