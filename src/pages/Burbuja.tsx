// src/pages/Burbuja.tsx

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Eye,
  Hand,
  Heart,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Accessibility,
  Lightbulb,
  Minus,
  Plus,
} from "lucide-react";

interface BurbujaProps {
  onBack: () => void;
  onSuggestions?: () => void;
}

type AccessibilityMode =
  | "standard"
  | "contrast"
  | "large"
  | "assisted"
  | "reduced";

const INITIAL_BUBBLES = [
  { id: 1, color: "pink" },
  { id: 2, color: "pink" },
  { id: 3, color: "pink" },
  { id: 4, color: "orange" },
  { id: 5, color: "orange" },
  { id: 6, color: "purple" },
  { id: 7, color: "green" },
  { id: 8, color: "cyan" },
  { id: 9, color: "cyan" },
  { id: 10, color: "cyan" },
  { id: 11, color: "cyan" },
  { id: 12, color: "cyan" },
];

const COLOR_STYLES: Record<string, string> = {
  pink:
    "bg-gradient-to-br from-[#F7A7C8] via-[#E878AC] to-[#B85A9C] shadow-[inset_0_4px_10px_rgba(255,255,255,.35),0_8px_20px_rgba(236,120,180,.18)]",

  orange:
    "bg-gradient-to-br from-[#FFD38A] via-[#F3A94E] to-[#D97838] shadow-[inset_0_4px_10px_rgba(255,255,255,.35),0_8px_20px_rgba(243,169,78,.18)]",

  purple:
    "bg-gradient-to-br from-[#D0A7F4] via-[#A77BE1] to-[#7652C1] shadow-[inset_0_4px_10px_rgba(255,255,255,.35),0_8px_20px_rgba(167,123,225,.2)]",

  green:
    "bg-gradient-to-br from-[#B7E58C] via-[#78C96B] to-[#4C9C68] shadow-[inset_0_4px_10px_rgba(255,255,255,.35),0_8px_20px_rgba(120,201,107,.18)]",

  cyan:
    "bg-gradient-to-br from-[#8DE5E7] via-[#50C7D4] to-[#3694B7] shadow-[inset_0_4px_10px_rgba(255,255,255,.35),0_8px_20px_rgba(80,199,212,.18)]",
};

export default function Burbuja({
  onBack,
  onSuggestions,
}: BurbujaProps) {
  const [bubbles, setBubbles] = useState(INITIAL_BUBBLES);
  const [popped, setPopped] = useState<number[]>([]);
  const [cycles, setCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [accessibilityMode, setAccessibilityMode] =
    useState<AccessibilityMode>("standard");

  const [message, setMessage] = useState(
    "Presiona una burbuja y acompaña el momento."
  );

  const [isHolding, setIsHolding] = useState(false);

  const playPopSound = () => {
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

      const audioContext = new AudioContextClass();

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        330,
        audioContext.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        220,
        audioContext.currentTime + 0.12
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioContext.currentTime + 0.01
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.13
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.14);
    } catch {
      // El juego funciona aunque el navegador no permita audio.
    }
  };

  const handleBubblePress = (id: number) => {
    if (popped.includes(id)) return;

    setIsHolding(true);
    playPopSound();

    setPopped((current) => [...current, id]);

    setMessage(
      accessibilityMode === "assisted"
        ? "Muy bien. Continúa con la siguiente."
        : "Suelta un poco. No hay prisa."
    );
  };

  useEffect(() => {
    if (popped.length !== bubbles.length) return;

    const timeout = window.setTimeout(() => {
      setCycles((current) => current + 1);
      setPopped([]);
      setIsHolding(false);

      setMessage(
        "Una ronda más. Solo sigue tu ritmo."
      );
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [popped, bubbles.length]);

  const restartGame = () => {
    setPopped([]);
    setCycles(0);
    setIsHolding(false);
    setMessage(
      "Presiona una burbuja y acompaña el momento."
    );
  };

  const handleAccessibility = (
    mode: AccessibilityMode
  ) => {
    setAccessibilityMode(mode);
  };

  const getBubbleSize = () => {
    if (accessibilityMode === "large") {
      return "h-[108px] w-[108px]";
    }

    if (accessibilityMode === "assisted") {
      return "h-[92px] w-[92px]";
    }

    return "h-[82px] w-[82px]";
  };

  const getBubbleStyle = (bubble: {
    id: number;
    color: string;
  }) => {
    if (accessibilityMode === "contrast") {
      return `
        border-4
        border-white
        bg-black
        shadow-[0_0_0_2px_rgba(255,255,255,.8)]
      `;
    }

    if (popped.includes(bubble.id)) {
      return `
        border
        border-white/30
        bg-black/20
        shadow-inner
      `;
    }

    return `
      ${COLOR_STYLES[bubble.color]}
      border
      border-white/20
    `;
  };

  return (
    <section
      className="
        min-h-screen
        px-6
        pb-6
        pt-6
        text-white
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* =========================
            CABECERA
        ========================= */}

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
              px-5
              py-3
              text-sm
              text-white/80
              backdrop-blur-xl
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={17} />
            Volver
          </button>

          <div className="text-center">

            <h1
              className="
                text-[42px]
                font-semibold
                tracking-[-0.03em]
              "
            >
              Burbuja
            </h1>

            <p className="mt-1 text-[16px] text-white/55">
              Toca, relaja y suelta
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-black/30
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <Sparkles
                size={18}
                className="text-[#F1C75B]"
              />

              <div>
                <p className="text-xs text-white/45">
                  Ciclos
                </p>

                <p className="text-xl font-medium">
                  {cycles}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setSoundEnabled((current) => !current)
              }
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-black/30
                px-5
                py-3
                text-sm
                text-white/70
                backdrop-blur-xl
                transition
                hover:bg-white/10
              "
              aria-label={
                soundEnabled
                  ? "Desactivar sonido"
                  : "Activar sonido"
              }
            >
              {soundEnabled ? (
                <Volume2 size={17} />
              ) : (
                <VolumeX size={17} />
              )}

              Sonido
            </button>

          </div>
        </div>

        {/* =========================
            CONTENIDO
        ========================= */}

{/* =========================
    DESCRIPCIÓN DEL JUEGO
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
        bg-[#55CBE3]/10
        text-[#6EDDF0]
      "
    >
      <Hand size={20} />
    </div>

    <div>

      <h2 className="text-[17px] font-medium text-white">
        ¿Para qué sirve Burbuja?
      </h2>

      <p className="mt-2 max-w-[1050px] text-[14px] leading-6 text-white/60">
        Burbuja es una experiencia sensorial sencilla basada en
        presionar y soltar elementos de forma repetitiva y tranquila.
        Está pensada para ayudarte a dirigir tu atención hacia una
        actividad concreta, reducir la sensación de prisa y crear un
        pequeño momento de pausa durante el día.
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
          <p className="text-sm font-medium text-white">
            🎯 Atención
          </p>

          <p className="mt-1 text-xs leading-5 text-white/45">
            Invita a concentrarte en una acción sencilla y repetitiva,
            dejando fuera otras distracciones durante unos momentos.
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
          <p className="text-sm font-medium text-white">
            🌿 Pausa
          </p>

          <p className="mt-1 text-xs leading-5 text-white/45">
            Puedes utilizarlo como una pequeña pausa cuando quieras
            detenerte, cambiar de ritmo y dedicar unos minutos a ti.
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
          <p className="text-sm font-medium text-white">
            ✋ Estímulo sensorial
          </p>

          <p className="mt-1 text-xs leading-5 text-white/45">
            La interacción repetitiva proporciona una experiencia
            visual y táctil sencilla que puedes realizar a tu propio ritmo.
          </p>
        </div>

      </div>

      <div
        className="
          mt-4
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-[#F1C75B]/10
          bg-[#F1C75B]/[0.04]
          p-4
        "
      >
        <Heart
          size={17}
          className="mt-0.5 shrink-0 text-[#F1C75B]"
        />

        <p className="text-xs leading-5 text-white/45">
          No necesitas hacerlo rápido ni completar todos los ciclos.
          La intención es ofrecerte un momento tranquilo de atención,
          no competir ni obtener una puntuación.
        </p>
      </div>

    </div>

  </div>
</div>

        <div className="mt-8 grid grid-cols-[1fr_380px] gap-8">

          {/* =========================
              JUEGO
          ========================= */}

          <div>

            <div className="mb-6 text-center">

              <div
                className="
                  mx-auto
                  inline-flex
                  rounded-full
                  border
                  border-white/10
                  bg-black/30
                  px-7
                  py-4
                  text-[17px]
                  backdrop-blur-xl
                "
              >
                Presiona la{" "}
                <span className="mx-1 text-[#55CBE3]">
                  burbuja
                </span>{" "}
                y acompaña su respiración
              </div>

            </div>

            {/* INSTRUCCIONES */}

            <div className="mb-6 grid grid-cols-3 gap-4">

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#8D63D8]/30
                    text-[#C29CFF]
                  "
                >
                  1
                </div>

                <p className="text-lg font-medium">
                  Presiona
                </p>

                <p className="mt-1 text-sm text-white/55">
                  Elige cualquier burbuja.
                </p>
              </div>

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#55BFE5]/30
                    text-[#69D8FF]
                  "
                >
                  2
                </div>

                <p className="text-lg font-medium">
                  Inhala
                </p>

                <p className="mt-1 text-sm text-white/55">
                  Observa cómo cambia.
                </p>
              </div>

              <div
                className="
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#7BCB72]/30
                    text-[#91E786]
                  "
                >
                  3
                </div>

                <p className="text-lg font-medium">
                  Suelta
                </p>

                <p className="mt-1 text-sm text-white/55">
                  Cuando quieras, continúa.
                </p>
              </div>

            </div>

            {/* POP IT */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-black/35
                p-8
                shadow-2xl
                backdrop-blur-2xl
              "
            >

              {/* brillo */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[500px]
                  w-[500px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#8A63E8]/10
                  blur-[100px]
                "
              />

              <div className="relative mx-auto max-w-[700px]">

                <div
                  className="
                    mx-auto
                    rounded-[70px]
                    border-[12px]
                    border-white
                    bg-gradient-to-br
                    from-[#F7F5FA]
                    via-[#DCDCE5]
                    to-[#A8A8B5]
                    p-7
                    shadow-[0_30px_80px_rgba(0,0,0,.45)]
                  "
                >

                  {/* PARTE SUPERIOR */}

                  <div className="mb-6 flex justify-center gap-5">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[#8153C7]
                        text-white
                        shadow-inner
                      "
                    >
                      <Sparkles size={18} />
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[#8153C7]
                        text-white
                        shadow-inner
                      "
                    >
                      <RotateCcw size={18} />
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[#8153C7]
                        text-white
                        shadow-inner
                      "
                    >
                      {soundEnabled ? (
                        <Volume2 size={18} />
                      ) : (
                        <VolumeX size={18} />
                      )}
                    </div>

                  </div>

                  {/* BURBUJAS */}

                  <div className="grid grid-cols-4 gap-5">

                    {bubbles.map((bubble) => {

                      const poppedBubble =
                        popped.includes(bubble.id);

                      return (
                        <button
                          key={bubble.id}
                          type="button"
                          onPointerDown={() =>
                            handleBubblePress(
                              bubble.id
                            )
                          }
                          onPointerUp={() =>
                            setIsHolding(false)
                          }
                          onPointerCancel={() =>
                            setIsHolding(false)
                          }
                          aria-label={`Burbuja ${bubble.id}`}
                          className={`
                            ${getBubbleSize()}
                            rounded-full
                            transition-all
                            ${
                              accessibilityMode ===
                              "reduced"
                                ? ""
                                : "duration-300"
                            }
                            ${
                              poppedBubble
                                ? "scale-[0.88]"
                                : "hover:scale-[1.04]"
                            }
                            ${getBubbleStyle(
                              bubble
                            )}
                          `}
                        >
                          {poppedBubble && (
                            <span className="text-white/20">
                              ✓
                            </span>
                          )}

                          {accessibilityMode ===
                            "assisted" &&
                            !poppedBubble && (
                              <span className="text-xs font-semibold text-white/80">
                                TAP
                              </span>
                            )}
                        </button>
                      );
                    })}

                  </div>

                </div>

                {/* MENSAJE */}

                <div className="mt-7 text-center">

                  <p
                    className={`
                      text-lg
                      font-medium
                      ${
                        isHolding
                          ? "text-[#B89CFF]"
                          : "text-white/70"
                      }
                    `}
                  >
                    {message}
                  </p>

                </div>

              </div>
            </div>

            {/* FRASE */}

            <div className="mt-6 text-center">

              <p className="text-lg text-[#B59CF2]">
                No hay prisa. No hay errores.
              </p>

              <p className="mt-1 text-sm text-white/40">
                Solo este momento.
              </p>

              <Heart
                size={18}
                className="mx-auto mt-3 text-[#A98BE7]"
                fill="currentColor"
              />

            </div>

          </div>

          {/* =========================
              ACCESIBILIDAD
          ========================= */}

          <aside
            className="
              h-fit
              rounded-[28px]
              border
              border-white/10
              bg-black/35
              p-5
              backdrop-blur-2xl
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                "
              >
                <Eye size={21} />
              </div>

              <div>

                <h2 className="text-xl font-medium">
                  Adaptar experiencia
                </h2>

                <p className="mt-1 text-sm text-white/45">
                  Elige cómo quieres jugar
                </p>

              </div>

            </div>

            <div className="mt-5 space-y-3">

              {/* ESTÁNDAR */}

              <button
                type="button"
                onClick={() =>
                  handleAccessibility("standard")
                }
                className={`
                  w-full
                  rounded-[22px]
                  border
                  p-4
                  text-left
                  transition
                  ${
                    accessibilityMode === "standard"
                      ? "border-[#9A72F4] bg-[#8B63D8]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-pink-400
                      via-purple-400
                      to-cyan-400
                    "
                  >
                    <Sparkles size={22} />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-[#B795FF]">
                      Estándar
                    </p>

                    <p className="mt-1 text-xs text-white/45">
                      Experiencia original
                    </p>

                  </div>

                  <div
                    className={`
                      h-5
                      w-5
                      rounded-full
                      border-2
                      ${
                        accessibilityMode ===
                        "standard"
                          ? "border-[#9C76F6]"
                          : "border-white/25"
                      }
                    `}
                  />

                </div>

              </button>

              {/* CONTRASTE */}

              <button
                type="button"
                onClick={() =>
                  handleAccessibility("contrast")
                }
                className={`
                  w-full
                  rounded-[22px]
                  border
                  p-4
                  text-left
                  transition
                  ${
                    accessibilityMode === "contrast"
                      ? "border-white bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      border-2
                      border-white
                      bg-black
                    "
                  >
                    <Eye size={22} />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-[#5FD6FF]">
                      Alto contraste
                    </p>

                    <p className="mt-1 text-xs text-white/45">
                      Bordes más definidos
                    </p>

                  </div>

                  <div
                    className={`
                      h-5
                      w-5
                      rounded-full
                      border-2
                      ${
                        accessibilityMode ===
                        "contrast"
                          ? "border-white"
                          : "border-white/25"
                      }
                    `}
                  />

                </div>

              </button>

              {/* GRANDES */}

              <button
                type="button"
                onClick={() =>
                  handleAccessibility("large")
                }
                className={`
                  w-full
                  rounded-[22px]
                  border
                  p-4
                  text-left
                  transition
                  ${
                    accessibilityMode === "large"
                      ? "border-[#75D478] bg-[#75D478]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                    "
                  >
                    <Plus size={24} />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-[#7CDA78]">
                      Burbujas grandes
                    </p>

                    <p className="mt-1 text-xs text-white/45">
                      Menos elementos y más grandes
                    </p>

                  </div>

                  <div
                    className={`
                      h-5
                      w-5
                      rounded-full
                      border-2
                      ${
                        accessibilityMode ===
                        "large"
                          ? "border-[#7CDA78]"
                          : "border-white/25"
                      }
                    `}
                  />

                </div>

              </button>

              {/* ASISTIDO */}

              <button
                type="button"
                onClick={() =>
                  handleAccessibility("assisted")
                }
                className={`
                  w-full
                  rounded-[22px]
                  border
                  p-4
                  text-left
                  transition
                  ${
                    accessibilityMode === "assisted"
                      ? "border-[#F5A54E] bg-[#F5A54E]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-pink-400
                      via-yellow-300
                      to-cyan-400
                      text-black
                    "
                  >
                    <Hand size={22} />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-[#FFA85D]">
                      Modo asistido
                    </p>

                    <p className="mt-1 text-xs text-white/45">
                      Con apoyo visual
                    </p>

                  </div>

                  <div
                    className={`
                      h-5
                      w-5
                      rounded-full
                      border-2
                      ${
                        accessibilityMode ===
                        "assisted"
                          ? "border-[#FFA85D]"
                          : "border-white/25"
                      }
                    `}
                  />

                </div>

              </button>

              {/* REDUCIR MOVIMIENTO */}

              <button
                type="button"
                onClick={() =>
                  handleAccessibility("reduced")
                }
                className={`
                  w-full
                  rounded-[22px]
                  border
                  p-4
                  text-left
                  transition
                  ${
                    accessibilityMode === "reduced"
                      ? "border-[#6CAFE0] bg-[#6CAFE0]/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                    "
                  >
                    <Minus size={24} />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-[#67B5EB]">
                      Reducir movimiento
                    </p>

                    <p className="mt-1 text-xs text-white/45">
                      Movimiento mínimo
                    </p>

                  </div>

                  <div
                    className={`
                      h-5
                      w-5
                      rounded-full
                      border-2
                      ${
                        accessibilityMode ===
                        "reduced"
                          ? "border-[#67B5EB]"
                          : "border-white/25"
                      }
                    `}
                  />

                </div>

              </button>

            </div>

            {/* REINICIAR */}

            <button
              type="button"
              onClick={restartGame}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#5140A8]
                px-5
                py-3.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#624DBD]
              "
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>

          </aside>

        </div>

        {/* =========================
            SUGERENCIAS + AVISO
        ========================= */}

        <div
          className="
            mt-8
            grid
            grid-cols-[1fr_1.5fr]
            gap-5
          "
        >

          <button
            type="button"
            onClick={onSuggestions}
            className="
              flex
              items-center
              gap-4
              rounded-[24px]
              border
              border-white/10
              bg-black/30
              p-5
              text-left
              backdrop-blur-xl
              transition
              hover:bg-white/[0.06]
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F1C75B]/10
                text-[#F1C75B]
              "
            >
              <Lightbulb size={21} />
            </div>

            <div>

              <p className="font-medium">
                ¿Cómo podemos hacerlo mejor?
              </p>

              <p className="mt-1 text-xs text-white/45">
                Tus sugerencias ayudan a Calmavibe
                a ser más inclusivo.
              </p>

            </div>

          </button>

          <div
            className="
              rounded-[24px]
              border
              border-white/10
              bg-black/30
              px-6
              py-5
              text-center
              backdrop-blur-xl
            "
          >

            <p className="text-xs leading-5 text-white/40">
              Esta experiencia está diseñada para
              relajación, atención y entretenimiento.
              No constituye diagnóstico, tratamiento ni
              atención médica o psicológica, y no sustituye
              la evaluación de un profesional de la salud.
            </p>

          </div>

        </div>

        {/* =========================
            PIE
        ========================= */}

        <div className="pb-3 pt-6 text-center">

          <p className="text-sm text-white/30">
            Calmavibe
          </p>

          <p className="mt-1 text-xs text-white/20">
            Para todos. Sin prisa.
          </p>

        </div>

      </div>
    </section>
  );
}