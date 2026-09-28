import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AudioContext } from "./AudioContextContext";

export type AudioTrack = {
  name: string;
  file: string;
  src: string;
  category: string;
};

type AudioProviderProps = {
  children: ReactNode;
};

export function AudioProvider({ children }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tracks] = useState<AudioTrack[]>([
    {
      name: "Aliento de Buda",
      file: "alientodebuda.mp3",
      src: "/sounds/alientodebuda.mp3",
      category: "Meditación",
    },
    {
      name: "Cuencos Tibetanos",
      file: "cuencostibetanos.mp3",
      src: "/sounds/cuencostibetanos.mp3",
      category: "Relajación",
    },
    {
      name: "Frecuencia Ambiente 528 Hz",
      file: "frecuenciaambiente528hz.mp3",
      src: "/sounds/frecuenciaambiente528hz.mp3",
      category: "Frecuencias",
    },
    {
      name: "Frecuencia Sueño Profundo",
      file: "frecuenciasuenoprofundo.mp3",
      src: "/sounds/frecuenciasuenoprofundo.mp3",
      category: "Sueño",
    },
    {
      name: "Meditación",
      file: "meditacion.mp3",
      src: "/sounds/meditacion.mp3",
      category: "Meditación",
    },
    {
      name: "Meditación con Cascada",
      file: "meditacionconcascada.mp3",
      src: "/sounds/meditacionconcascada.mp3",
      category: "Naturaleza",
    },
    {
      name: "Meditación Cuencos Tibetanos",
      file: "meditacioncuencostibetanos.mp3",
      src: "/sounds/meditacioncuencostibetanos.mp3",
      category: "Meditación",
    },
    {
      name: "Naturaleza Tibetana",
      file: "naturalezatibetana.mp3",
      src: "/sounds/naturalezatibetana.mp3",
      category: "Naturaleza",
    },
    {
      name: "Océano Cósmico",
      file: "oceanocosmico.mp3",
      src: "/sounds/oceanocosmico.mp3",
      category: "Naturaleza",
    },
    {
      name: "Sueño Relajante",
      file: "suenorelajante.mp3",
      src: "/sounds/suenorelajante.mp3",
      category: "Sueño",
    },
    {
      name: "Susurro de Lluvia",
      file: "susurrodelluvia.mp3",
      src: "/sounds/susurrodelluvia.mp3",
      category: "Naturaleza",
    },
    {
      name: "Tormenta Enigmática",
      file: "tormentaenigmatica.mp3",
      src: "/sounds/tormentaenigmatica.mp3",
      category: "Naturaleza",
    },
    {
      name: "16 Hz Beta Binaural",
      file: "16hzbetabinaural.mp3",
      src: "/sounds/16hzbetabinaural.mp3",
      category: "Frecuencias",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sleepTimer, setSleepTimerState] = useState<number | null>(null);

  const currentTrack = tracks[currentIndex] ?? null;

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "metadata";
      audioRef.current = audio;
    }

    return audioRef.current;
  }, []);

  const playTrack = useCallback(
    async (trackOrIndex: AudioTrack | number) => {
      const index =
        typeof trackOrIndex === "number"
          ? trackOrIndex
          : tracks.findIndex((track) => track.file === trackOrIndex.file);

      if (index < 0 || index >= tracks.length) return;

      const audio = ensureAudio();
      const track = tracks[index];

      const trackUrl = new URL(track.src, window.location.href).href;

      if (currentIndex !== index || audio.src !== trackUrl) {
        audio.pause();
        audio.src = track.src;
        audio.currentTime = 0;
        audio.volume = volume;

        setCurrentIndex(index);
        setCurrentTime(0);
      }

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    },
    [currentIndex, ensureAudio, tracks, volume],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await resume();
    }
  }, [isPlaying, pause, resume]);

  const previous = useCallback(async () => {
    const nextIndex =
      currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;

    await playTrack(nextIndex);
  }, [currentIndex, playTrack, tracks.length]);

  const next = useCallback(async () => {
    const nextIndex =
      currentIndex >= tracks.length - 1 ? 0 : currentIndex + 1;

    await playTrack(nextIndex);
  }, [currentIndex, playTrack, tracks.length]);

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;

    if (!audio) return;

    const safeTime = Math.max(0, Math.min(time, audio.duration || time));

    audio.currentTime = safeTime;
    setCurrentTime(safeTime);
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.min(1, Math.max(0, nextVolume));

    setVolumeState(safeVolume);

    if (audioRef.current) {
      audioRef.current.volume = safeVolume;
    }
  }, []);

  const setSleepTimer = useCallback((minutes: number | null) => {
    setSleepTimerState(minutes);
  }, []);

  const clearSleepTimer = useCallback(() => {
    setSleepTimerState(null);
  }, []);

  useEffect(() => {
    const audio = ensureAudio();

    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [ensureAudio, volume]);

  useEffect(() => {
    if (sleepTimer === null || sleepTimer <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSleepTimerState((previousTimer) => {
        if (previousTimer === null) return null;

        const nextTimer = Math.max(0, previousTimer - 1);

        if (nextTimer === 0) {
          audioRef.current?.pause();
          setIsPlaying(false);
        }

        return nextTimer;
      });
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [sleepTimer]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrack,
        currentIndex,
        isPlaying,
        volume,
        currentTime,
        duration,
        playTrack,
        pause,
        resume,
        toggle,
        previous,
        next,
        stop,
        seek,
        setVolume,
        sleepTimer,
        setSleepTimer,
        clearSleepTimer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
