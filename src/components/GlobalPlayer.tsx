import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function GlobalPlayer() {
  const {
    currentTrack,
    currentIndex,
    isPlaying,
    toggle,
    previous,
    next,
    stop,
  } = useAudio();

  if (!currentTrack || currentIndex === null) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-[430px] -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-black/65 px-3 py-2.5 text-white shadow-[0_15px_45px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:w-auto sm:min-w-[360px]">
      <button type="button" onClick={previous} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Anterior">
        <SkipBack size={15} />
      </button>

      <button type="button" onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7A8F5F] transition hover:bg-[#879C6A]" aria-label={isPlaying ? "Pausar" : "Reproducir"}>
        {isPlaying ? <Pause size={15} fill="white" /> : <Play size={15} fill="white" />}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-white">
          {currentTrack.name}
        </p>
        <p className="text-[10px] text-white/45">
          {isPlaying ? "Reproduciendo" : "En pausa"}
        </p>
      </div>

      <button type="button" onClick={next} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Siguiente">
        <SkipForward size={15} />
      </button>

      <button type="button" onClick={stop} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white" aria-label="Cerrar reproductor">
        <X size={15} />
      </button>
    </div>
  );
}
