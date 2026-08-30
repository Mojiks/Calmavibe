import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Eye,
  Brain,
  Heart,
  Volume2,
  Settings2,
  Lightbulb,
} from "lucide-react";

interface ColorZenProps {
  onBack: () => void;
}

type AccessibilityMode =
  | "standard"
  | "contrast"
  | "patterns"
  | "large";

const GRID_SIZE = 4;
const STARTING_TIME = 30;

const ACCESSIBILITY_STORAGE_KEY =
  "calmavibe-colorzen-accessibility";

const PATTERNS = [
  "●",
  "◆",
  "✚",
  "▲",
  "■",
  "○",
  "◇",
  "+",
];

function generateColors(level: number) {
  const hue = Math.floor(Math.random() * 360);

  const saturation =
    35 + Math.floor(Math.random() * 20);

  const lightness =
    62 + Math.floor(Math.random() * 10);

  const difference = Math.max(
    2,
    14 - Math.floor(level / 2)
  );

  const baseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const differentColor = `hsl(${hue}, ${saturation}%, ${
    lightness + difference
  }%)`;

  const totalTiles = GRID_SIZE * GRID_SIZE;

  const differentIndex = Math.floor(
    Math.random() * totalTiles
  );

  return {
    baseColor,
    differentColor,
    differentIndex,
  };
}

export default function ColorZen({
  onBack,
}: ColorZenProps) {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] =
    useState(STARTING_TIME);

  const [gameOver, setGameOver] =
    useState(false);

  const [showAccessibility, setShowAccessibility] =
    useState(false);

  const [accessibilityMode, setAccessibilityMode] =
    useState<AccessibilityMode>(() => {
      const saved =
        window.localStorage.getItem(
          ACCESSIBILITY_STORAGE_KEY
        );

      if (
        saved === "standard" ||
        saved === "contrast" ||
        saved === "patterns" ||
        saved === "large"
      ) {
        return saved;
      }

      return "standard";
    });

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  const [round, setRound] = useState(() =>
    generateColors(1)
  );

  /* =========================
     GUARDAR ACCESIBILIDAD
  ========================= */

  useEffect(() => {
    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      accessibilityMode
    );
  }, [accessibilityMode]);

  /* =========================
     COLORES
  ========================= */

  const colors = useMemo(() => {
    return Array.from(
      {
        length:
          GRID_SIZE * GRID_SIZE,
      },
      (_, index) =>
        index === round.differentIndex
          ? round.differentColor
          : round.baseColor
    );
  }, [round]);

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
     SONIDO SIMPLE
  ========================= */

  const playFeedbackSound = (
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
        correct ? 620 : 180;

      oscillator.type = "sine";

      gain.gain.setValueAtTime(
        0.0001,
        context.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.05,
        context.currentTime + 0.01
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.16
      );

      oscillator.start();

      oscillator.stop(
        context.currentTime + 0.16
      );
    } catch {
      // El sonido es opcional.
    }
  };

  /* =========================
     SELECCIONAR
  ========================= */

  const handleColorClick = (
    index: number
  ) => {
    if (gameOver) return;

    const correct =
      index === round.differentIndex;

    playFeedbackSound(correct);

    if (correct) {
      const nextLevel =
        level + 1;

      setScore(
        (current) =>
          current + level * 10
      );

      setLevel(nextLevel);

      setTime(
        (current) =>
          Math.min(
            STARTING_TIME,
            current + 2
          )
      );

      setRound(
        generateColors(nextLevel)
      );
    } else {
      setTime(
        (current) =>
          Math.max(0, current - 3)
      );
    }
  };

  /* =========================
     REINICIAR
  ========================= */

  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setTime(STARTING_TIME);
    setGameOver(false);
    setRound(generateColors(1));
  };

  /* =========================
     MODO VISUAL
  ========================= */

  const isLarge =
    accessibilityMode === "large";

  const isContrast =
    accessibilityMode === "contrast";

  const isPattern =
    accessibilityMode === "patterns";

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
              Color Zen
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Encuentra el color diferente.
            </p>
          </div>
        </div>

{/* =========================
    EXPLICACIÓN DEL JUEGO
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
        bg-[#A7D36D]/10
        text-[#A7D36D]
      "
    >
      <Eye size={20} />
    </div>

    <div className="min-w-0">

      <h2 className="text-[17px] font-medium text-white">
        ¿Qué es Color Zen?
      </h2>

      <p className="mt-2 max-w-[1050px] text-[14px] leading-6 text-white/60">
        Color Zen es una experiencia visual de atención. El objetivo es
        observar una cuadrícula de colores y encontrar el tono que es
        ligeramente diferente. La dificultad aumenta progresivamente,
        invitándote a observar con calma y mantener tu atención en una
        tarea sencilla.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">

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
              className="text-[#A7D36D]"
            />

            <p className="text-sm font-medium text-white">
              👁️ Observación
            </p>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/45">
            Invita a observar pequeños cambios visuales y mantener la
            atención sobre los detalles.
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
              className="text-[#A7D36D]"
            />

            <p className="text-sm font-medium text-white">
              🧠 Concentración
            </p>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/45">
            Propone una actividad breve que requiere mantener la atención
            en un objetivo concreto y sencillo.
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
              className="text-[#A7D36D]"
            />

            <p className="text-sm font-medium text-white">
              🌿 Pausa mental
            </p>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/45">
            Puede utilizarse como una pequeña pausa para cambiar de ritmo
            y dedicar unos minutos a una actividad tranquila.
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
        <p className="text-xs leading-5 text-white/45">
          <span className="font-medium text-white/65">
            No se trata de competir.
          </span>{" "}
          Observa, encuentra el tono diferente y avanza a tu propio ritmo.
          Si una ronda resulta difícil, simplemente vuelve a observar y
          continúa cuando estés listo.
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
        <p className="text-[11px] leading-5 text-white/35">
          <span className="font-medium text-white/50">
            Aviso:
          </span>{" "}
          Color Zen es una experiencia recreativa y de bienestar. No es
          una herramienta de diagnóstico, evaluación o tratamiento médico
          y no sustituye la orientación de un profesional de la salud.
        </p>
      </div>

    </div>

  </div>
</div>

        {/* =========================
            CONTROLES
        ========================= */}

        <div className="mt-5 flex justify-end gap-2">
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
              setShowAccessibility(
                (current) => !current
              )
            }
            aria-label="Opciones de accesibilidad"
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
            <Settings2 size={16} />
          </button>
        </div>

        {/* =========================
            ACCESIBILIDAD
        ========================= */}

        {showAccessibility && (
          <div
            className="
              mt-3
              rounded-2xl
              border
              border-white/10
              bg-black/45
              p-4
              backdrop-blur-2xl
            "
          >
            <div className="flex items-center gap-2">
              <Eye
                size={16}
                className="text-[#9CC37D]"
              />

              <h3 className="text-sm font-medium">
                Adaptar experiencia
              </h3>
            </div>

            <p className="mt-1 text-xs text-white/40">
              Elige cómo quieres identificar
              el objetivo.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              <button
                type="button"
                onClick={() =>
                  setAccessibilityMode(
                    "standard"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    accessibilityMode ===
                    "standard"
                      ? "border-[#9CC37D]/50 bg-[#9CC37D]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07]"
                  }
                `}
              >
                <p className="text-xs font-medium">
                  Estándar
                </p>

                <p className="mt-1 text-[10px] text-white/40">
                  Colores originales
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setAccessibilityMode(
                    "contrast"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    accessibilityMode ===
                    "contrast"
                      ? "border-[#9CC37D]/50 bg-[#9CC37D]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07]"
                  }
                `}
              >
                <p className="text-xs font-medium">
                  Alto contraste
                </p>

                <p className="mt-1 text-[10px] text-white/40">
                  Mayor diferencia visual
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setAccessibilityMode(
                    "patterns"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    accessibilityMode ===
                    "patterns"
                      ? "border-[#9CC37D]/50 bg-[#9CC37D]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07]"
                  }
                `}
              >
                <p className="text-xs font-medium">
                  Patrones
                </p>

                <p className="mt-1 text-[10px] text-white/40">
                  Identifica por formas
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setAccessibilityMode(
                    "large"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    accessibilityMode ===
                    "large"
                      ? "border-[#9CC37D]/50 bg-[#9CC37D]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07]"
                  }
                `}
              >
                <p className="text-xs font-medium">
                  Elementos grandes
                </p>

                <p className="mt-1 text-[10px] text-white/40">
                  Mayor tamaño
                </p>
              </button>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-[10px] leading-5 text-white/30">
                No necesitas indicar un diagnóstico
                para utilizar estas opciones. Elige
                la experiencia que te resulte más cómoda.
              </p>
            </div>
          </div>
        )}

        {/* =========================
            INFORMACIÓN
        ========================= */}

        <div className="mt-8 grid grid-cols-3 gap-3">
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

        {/* =========================
            ÁREA DEL JUEGO
        ========================= */}

        <div className="flex flex-1 items-center justify-center py-8">
          <div
            className="
              w-full
              max-w-[620px]
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
              <p className="text-sm text-white/50">
                Observa con calma
              </p>

              <h2 className="mt-1 text-xl font-medium">
                {isPattern
                  ? "Encuentra el símbolo diferente"
                  : "Encuentra el tono diferente"}
              </h2>
            </div>

            {/* =========================
                GRID
            ========================= */}

            <div
              className={`
                mx-auto
                grid
                max-w-[500px]
                grid-cols-4
                ${
                  isLarge
                    ? "gap-5"
                    : "gap-3"
                }
              `}
            >
              {colors.map(
                (color, index) => {
                  const isDifferent =
                    index ===
                    round.differentIndex;

                  let backgroundColor =
                    color;

                  if (isContrast) {
                    backgroundColor =
                      isDifferent
                        ? "#FFFFFF"
                        : "#111111";
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={gameOver}
                      onClick={() =>
                        handleColorClick(
                          index
                        )
                      }
                      aria-label={
                        isDifferent
                          ? "Elemento diferente"
                          : `Elemento ${index + 1}`
                      }
                      className={`
                        relative
                        aspect-square
                        rounded-2xl
                        border
                        border-white/10
                        transition
                        duration-200
                        hover:scale-[1.03]
                        hover:border-white/40
                        active:scale-95
                        disabled:cursor-default
                        ${
                          isLarge
                            ? "rounded-3xl border-2"
                            : ""
                        }
                        ${
                          isContrast
                            ? "border-white/50"
                            : ""
                        }
                      `}
                      style={{
                        backgroundColor,
                      }}
                    >
                      {isPattern && (
                        <span
                          className={`
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            text-[28px]
                            font-medium
                            ${
                              isDifferent
                                ? "text-white"
                                : "text-white/15"
                            }
                          `}
                        >
                          {
                            PATTERNS[
                              index %
                                PATTERNS.length
                            ]
                          }
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* =========================
                AYUDA
            ========================= */}

            {isPattern && (
              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-center
                  text-xs
                  text-white/40
                "
              >
                <Lightbulb size={13} />

                <span>
                  En este modo puedes utilizar
                  las formas además del color.
                </span>
              </div>
            )}

            {/* =========================
                GAME OVER
            ========================= */}

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
                  Tiempo terminado
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
            AVISO DE BIENESTAR
        ========================= */}

        <div className="pb-2 text-center">
          <p className="mx-auto max-w-[650px] text-[9px] leading-4 text-white/20">
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
            No hay prisa. Solo observa y encuentra.
          </p>
        </div>
      </div>
    </section>
  );
}