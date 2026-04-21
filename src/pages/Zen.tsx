import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const sounds = [
  { name: "16hz Beta", file: "/sounds/16hzbetabinaural.mp3" },
  { name: "Cuencos Tibetanos", file: "/sounds/cuencostibetanos.mp3" },
  { name: "528Hz", file: "/sounds/frecuenciaambiente528hz.mp3" },
  { name: "Aliento de Buda", file: "/sounds/alientodebuda.mp3" },
  { name: "Sueño Profundo", file: "/sounds/frecuenciasuenoprofundo.mp3" },
  { name: "Meditación", file: "/sounds/meditacion.mp3" },
  { name: "Cascada", file: "/sounds/meditacionconcascada.mp3" },
  { name: "Naturaleza Tibetana", file: "/sounds/naturalezatibetana.mp3" },
  { name: "Océano Cósmico", file: "/sounds/oceanocosmico.mp3" },
  { name: "Sueño Relajante", file: "/sounds/suenorelajante.mp3" },
  { name: "Lluvia", file: "/sounds/susurrodelluvia.mp3" },
  { name: "Tormenta", file: "/sounds/tormentaenigmatica.mp3" },
];

export default function Zen() {

  // 🔵 RESPIRACIÓN
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "idle">("idle");
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🎧 AUDIO
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [trackIndex, setTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // ⏱ TIMER
  const [timer, setTimer] = useState<number | null>(null);

  // ================= AUDIO =================
  useEffect(() => {
    const audio = audioRef.current;

    if (trackIndex !== null) {
      audio.src = sounds[trackIndex].file;
      audio.currentTime = 0;
      audio.volume = volume;

      if (isPlaying) audio.play();
    }
  }, [trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying, volume]);

  const playTrack = (i: number) => {
    setTrackIndex(i);
    setIsPlaying(true);
  };

  const stopTrack = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (trackIndex === null) return;
    setTrackIndex((trackIndex + 1) % sounds.length);
  };

  const prevTrack = () => {
    if (trackIndex === null) return;
    setTrackIndex((trackIndex - 1 + sounds.length) % sounds.length);
  };

  // ================= TIMER =================
  useEffect(() => {
    if (!timer) return;

    const t = setTimeout(() => {
      stopTrack();
      setTimer(null);
    }, timer);

    return () => clearTimeout(t);
  }, [timer]);

  // ================= RESPIRACIÓN =================
  useEffect(() => {
    if (!running) return;

    let duration = phase === "inhale" ? 4 : phase === "hold" ? 7 : 8;

    setCount(duration);

    intervalRef.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(intervalRef.current!);

      if (phase === "inhale") setPhase("hold");
      else if (phase === "hold") setPhase("exhale");
      else {
        setPhase("inhale");
        setCycles((prev) => {
          if (prev + 1 >= 2) {
            setRunning(false);
            return 0;
          }
          return prev + 1;
        });
      }
    }, duration * 1000);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeout);
    };
  }, [phase, running]);

  const startBreathing = () => {
    setCycles(0);
    setPhase("inhale");
    setRunning(true);
  };

  const stopBreathing = () => {
    setRunning(false);
    setPhase("idle");
    setCount(0);
  };

  const getText = () => {
    if (phase === "inhale") return "Inhala";
    if (phase === "hold") return "Sostén";
    if (phase === "exhale") return "Exhala";
    return "Respira";
  };

  // ================= UI =================
  return (
      <Layout>
<div className="bg-main h-screen w-full text-white flex items-center justify-center px-6 pb-20">
      <div className="w-full max-w-6xl flex gap-10">

        {/* RESPIRACIÓN */}
        <div className="flex-1 flex flex-col items-center justify-center">

          <div className={`w-48 h-48 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md ${running ? "animate-breathe" : ""}`}>
            <div className="text-center">
              <p className="text-lg">{getText()}</p>
              <p className="text-4xl">{count}</p>
            </div>
          </div>

          <p className="text-xs mt-4">Ciclos: {cycles}/2</p>

          <div className="flex gap-4 mt-6">
            <button onClick={startBreathing} className="bg-white text-black px-4 py-2 rounded-lg">Iniciar</button>
            <button onClick={stopBreathing} className="bg-white/20 px-4 py-2 rounded-lg">Detener</button>
          </div>

        </div>

        {/* AUDIOS */}
        <div className="flex-1">
          <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl h-[420px] overflow-y-auto">

            {sounds.map((s, i) => (
              <div
                key={i}
                onClick={() => playTrack(i)}
                className="p-3 border-b border-white/10 hover:bg-white/10 cursor-pointer rounded-lg"
              >
                {s.name}
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* PLAYER PRO */}
      {trackIndex !== null && (
        <div className="fixed bottom-6 right-6 bg-black/70 backdrop-blur-xl p-4 rounded-2xl w-72">

          <p className="text-center text-sm mb-2">{sounds[trackIndex].name}</p>

          <div className="flex justify-center gap-4 mb-3 text-lg">
            <button onClick={prevTrack}>⏮</button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={nextTrack}>⏭</button>
            <button onClick={stopTrack}>⏹</button>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full mb-3"
          />

          {/* TIMER */}
          <div className="flex justify-between text-xs">
            <button onClick={() => setTimer(15 * 60000)}>15m</button>
            <button onClick={() => setTimer(30 * 60000)}>30m</button>
            <button onClick={() => setTimer(60 * 60000)}>60m</button>
          </div>

        </div>
      )}

    </div>
      </Layout>
  );
}