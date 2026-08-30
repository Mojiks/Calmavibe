import { useAudio } from "../context/AudioContext";
import Layout from "../components/Layout";
import {
  Moon,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

const timerOptions = [
  { label: "15 min", value: 15 * 60 * 1000 },
  { label: "30 min", value: 30 * 60 * 1000 },
  { label: "60 min", value: 60 * 60 * 1000 },
];

export default function Zen() {
  const {
    tracks,
    currentTrack,
    currentIndex,
    isPlaying,
    volume,
    playTrack,
    toggle,
    previous,
    next,
    setVolume,
    sleepTimer,
    setSleepTimer,
    clearSleepTimer,
  } = useAudio();

  return (
    <Layout>
      <div
        className="
          ml-[228px]
          min-h-screen
          px-6
          py-8
          overflow-x-hidden
        "
      >
        {/* ENCABEZADO */}

        <div className="mb-8">
          <h1 className="text-4xl font-light text-white">
            Zen
          </h1>

          <p className="mt-2 text-lg text-white/75">
            Un espacio para bajar el ritmo.
          </p>

          <p className="mt-2 text-sm text-white/50">
            Elige un sonido, ajusta el volumen y deja que el momento siga su propio ritmo.
          </p>
        </div>

        {/* CONTENIDO */}

        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
          {/* SONIDOS */}

          <section
            className="
              rounded-3xl
              border
              border-white/10
              bg-black/30
              p-4
              backdrop-blur-2xl
              sm:p-5
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-white">
                  Sonidos
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  Biblioteca de calma
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {tracks.map((track, index) => {
                const active = currentIndex === index;

                return (
                  <button
                    key={track.file}
                    type="button"
                    onClick={() => playTrack(index)}
                    className={`
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition
                      ${
                        active
                          ? "border-[#9CC37D]/40 bg-[#7B8F5D]/15"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                      }
                    `}
                  >
                    <p className="text-sm font-medium text-white">
                      {track.name}
                    </p>

                    <p className="mt-1 text-[11px] text-white/40">
                      {track.category}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PLAYER */}

          <aside
            className="
              h-fit
              rounded-3xl
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
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#334C43]
                "
              >
                <Moon
                  size={18}
                  className="text-[#D8F1D6]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  {currentTrack?.name ?? "Sin sonido seleccionado"}
                </p>

                <p className="text-[11px] text-white/45">
                  {isPlaying ? "Reproduciendo" : "En pausa"}
                </p>
              </div>
            </div>

            {/* CONTROLES */}

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={previous}
                disabled={currentIndex === null}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                  text-white/70
                  transition
                  hover:bg-white/10
                  disabled:opacity-30
                "
                aria-label="Anterior"
              >
                <SkipBack size={16} />
              </button>

              <button
                type="button"
                onClick={toggle}
                disabled={currentIndex === null}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#7B8F5D]
                  transition
                  hover:bg-[#879968]
                  disabled:opacity-30
                "
                aria-label={
                  isPlaying
                    ? "Pausar"
                    : "Reproducir"
                }
              >
                {isPlaying ? (
                  <Pause
                    size={18}
                    fill="white"
                  />
                ) : (
                  <Play
                    size={18}
                    fill="white"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={next}
                disabled={currentIndex === null}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                  text-white/70
                  transition
                  hover:bg-white/10
                  disabled:opacity-30
                "
                aria-label="Siguiente"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* VOLUMEN */}

            <div className="mt-6">
              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-white/55
                "
              >
                <Volume2 size={14} />
                Volumen
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) =>
                  setVolume(Number(event.target.value))
                }
                className="w-full"
              />
            </div>

            {/* TEMPORIZADOR */}

            <div className="mt-6">
              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-white/55
                "
              >
                <Moon size={14} />
                Temporizador de sueño
              </div>

              <div className="grid grid-cols-3 gap-2">
                {timerOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setSleepTimer(option.value)
                    }
                    className="
                      rounded-xl
                      bg-white/5
                      px-2
                      py-2
                      text-[11px]
                      text-white/70
                      transition
                      hover:bg-white/10
                    "
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {sleepTimer !== null && (
                <button
                  type="button"
                  onClick={clearSleepTimer}
                  className="
                    mt-2
                    w-full
                    text-[11px]
                    text-white/40
                    hover:text-white/70
                  "
                >
                  Cancelar temporizador
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}