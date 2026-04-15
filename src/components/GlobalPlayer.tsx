import { useAudio } from "../context/AudioContext"

export default function GlobalPlayer() {
  const { isPlaying, pause, play, current } = useAudio()

  if (!current) return null

  const nombre = current.split("/").pop()?.replace(".mp3", "") || "Audio"

  return (
    <div className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">

      {/* BOTÓN PLAY / PAUSE */}
      <button
        onClick={() => (isPlaying ? pause() : play(current))}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      {/* NOMBRE DEL AUDIO */}
      <span className="text-xs text-white/80 max-w-[140px] truncate">
        {nombre}
      </span>

    </div>
  )
}