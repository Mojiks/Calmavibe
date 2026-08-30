import {
  Music4,
  Play,
  Pause,
} from "lucide-react";

import { useAudio } from "../../../context/AudioContext";

export default function SidebarPlayer() {
  const {
    currentTrack,
    currentIndex,
    isPlaying,
    toggle,
    currentTime,
    duration,
  } = useAudio();

  const progress =
    duration > 0
      ? Math.min(
          100,
          (currentTime / duration) * 100
        )
      : 0;

  return (
    <div className="mt-5 px-4">

      {/* Reproductor */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[14px]
          border
          border-white/[0.08]
          bg-[#0E1110]/75
          px-3
          py-3
          shadow-[0_14px_38px_rgba(0,0,0,0.22)]
          backdrop-blur-3xl
          transition-all
          duration-300
          hover:border-white/[0.12]
          hover:bg-[#111513]/85
        "
      >

        {/* Luz ambiental */}

        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-20
            w-20
            rounded-full
            bg-[#91B5A4]/10
            blur-3xl
          "
        />

        {/* Reproductor */}

        <div
          className="
            relative
            flex
            items-center
            gap-3
          "
        >

          {/* Icono */}

          <div
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[11px]
              border
              border-[#B9D9C7]/10
              bg-gradient-to-br
              from-[#38584D]
              to-[#263E37]
            "
          >
            <div
              className="
                absolute
                h-5
                w-5
                rounded-full
                bg-[#CBE7A5]/10
                blur-md
              "
            />

            <Music4
              size={17}
              strokeWidth={1.5}
              className="relative text-[#D8F1D6]"
            />
          </div>

          {/* Información */}

          <div className="min-w-0 flex-1">

            <p
              className="
                truncate
                text-[13px]
                font-medium
                tracking-[-0.01em]
                text-white/90
              "
            >
              {currentTrack?.name ?? "Elige un sonido"}
            </p>

            <p
              className="
                mt-[1px]
                text-[10px]
                text-white/40
              "
            >
              {currentTrack
                ? "Sonido ambiental"
                : "Calmavibe"}
            </p>

          </div>

          {/* Play */}

          <button
            type="button"
            onClick={toggle}
            disabled={currentIndex === null}
            aria-label={
              isPlaying
                ? "Pausar"
                : "Reproducir"
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-[11px]
              border
              border-[#D2E4B2]/10
              bg-gradient-to-br
              from-[#849A64]
              to-[#647649]
              text-white
              shadow-[0_7px_18px_rgba(65,82,48,0.22)]
              transition-all
              duration-200
              hover:from-[#92A971]
              hover:to-[#708253]
              hover:shadow-[0_8px_20px_rgba(125,151,88,0.28)]
              active:scale-90
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
          >
            {isPlaying ? (
              <Pause
                size={15}
                fill="white"
                strokeWidth={1.6}
              />
            ) : (
              <Play
                size={15}
                fill="white"
                strokeWidth={1.6}
                className="ml-[1px]"
              />
            )}
          </button>

        </div>

        {/* Progreso */}

        <div
          className="
            relative
            mt-3
            h-[2px]
            overflow-hidden
            rounded-full
            bg-white/[0.07]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#849C68]
              to-[#B7CC91]
              shadow-[0_0_8px_rgba(183,204,145,0.18)]
              transition-[width]
              duration-300
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      {/* Instagram */}

      <a
        href="https://www.instagram.com/calmavibe?igsi=MXBrMHV2ZzczaXVqaQ%3D%3D&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Calmavibe"
        className="
          group
          mt-3
          flex
          items-center
          justify-center
          gap-2
          rounded-[12px]
          border
          border-white/[0.06]
          bg-white/[0.025]
          px-3
          py-2
          text-white/45
          transition-all
          duration-200
          hover:border-white/[0.10]
          hover:bg-white/[0.05]
          hover:text-white/80
        "
      >
        <svg
  width="15"
  height="15"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="
    transition-transform
    duration-200
    group-hover:scale-110
  "
>
  <rect
    x="3"
    y="3"
    width="18"
    height="18"
    rx="5"
    stroke="currentColor"
    strokeWidth="1.7"
  />

  <circle
    cx="12"
    cy="12"
    r="4"
    stroke="currentColor"
    strokeWidth="1.7"
  />

  <circle
    cx="17.5"
    cy="6.5"
    r="1"
    fill="currentColor"
  />
</svg>

        <span className="text-[11px]">
          @calmavibe
        </span>
      </a>

    </div>
  );
}