import {
  ChevronRight,
  CloudRain,
  Flame,
  Flower2,
  Music2,
  Waves,
  Wind,
} from "lucide-react";
import { useAudio } from "../../context/AudioContext";

const icons = [CloudRain, Flower2, Music2, Waves, Wind, Flame];

export default function SoundPanel() {
  const { tracks, currentIndex, isPlaying, playTrack, toggle } = useAudio();

  return (
    <aside
      className="
        w-full
        max-w-[305px]
        rounded-[24px]
        border
        border-white/10
        bg-[#1A140F]/88
        backdrop-blur-[30px]
        px-6
        py-5
        shadow-[0_18px_45px_rgba(0,0,0,.45)]
      "
    >
      <h3 className="text-[20px] font-light text-white">
        Acompaña tu momento
      </h3>

      <p className="mt-2 text-[13px] leading-6 text-white/60">
        Elige un sonido para relajarte
      </p>

      <div className="mt-4 border-t border-white/10" />

      <div className="sound-scroll mt-2 h-[154px] overflow-y-auto pr-2">
        {tracks.map((sound, index) => {
          const Icon = icons[index % icons.length];
          const active = currentIndex === index;

          return (
            <button
              key={sound.file}
              type="button"
              onClick={() => (active ? toggle() : playTrack(index))}
              className={`
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-2
                py-3
                text-left
                transition-all
                duration-200
                hover:bg-white/5
                ${active ? "bg-white/5" : ""}
              `}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  size={17}
                  className={active ? "text-[#A7BE84]" : "text-white/75"}
                />

                <span className="truncate text-[14px] text-white/92">
                  {sound.name}
                </span>
              </div>

              <ChevronRight
                size={16}
                className={`shrink-0 transition ${
                  active ? "text-[#A7BE84]" : "text-white/45 group-hover:text-white/70"
                }`}
              />
            </button>
          );
        })}
      </div>

      {currentIndex !== null && (
        <p className="mt-3 truncate text-center text-[11px] text-white/45">
          {isPlaying ? "Reproduciendo" : "En pausa"} · {tracks[currentIndex]?.name}
        </p>
      )}
    </aside>
  );
}
