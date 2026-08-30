import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  sounds,
  type SoundTrack,
} from "../data/sounds";

type AudioContextType = {
  tracks: SoundTrack[];

  currentTrack: SoundTrack | null;
  currentIndex: number | null;

  isPlaying: boolean;

  volume: number;

  currentTime: number;
  duration: number;

  sleepTimer: number | null;

  playTrack: (index: number) => void;
  play: (src: string) => void;

  pause: () => void;
  toggle: () => void;
  stop: () => void;

  next: () => void;
  previous: () => void;

  setVolume: (value: number) => void;

  setSleepTimer: (milliseconds: number) => void;
  clearSleepTimer: () => void;
};

const AudioContext =
  createContext<AudioContextType | null>(null);

export function AudioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const sleepTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const [currentIndex, setCurrentIndex] =
    useState<number | null>(null);

  const [current, setCurrent] =
    useState<string | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [volume, setVolumeState] =
    useState(0.5);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [sleepTimer, setSleepTimerState] =
    useState<number | null>(null);

  /*
   * ================================
   * CREAR AUDIO
   * ================================
   */

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";
    audio.volume = volume;

    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(
        audio.currentTime || 0
      );
    };

    const handleLoadedMetadata = () => {
      setDuration(
        audio.duration || 0
      );
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.pause();

      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audioRef.current = null;
    };
  }, []);

  /*
   * ================================
   * VOLUMEN
   * ================================
   */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /*
   * ================================
   * REPRODUCIR ARCHIVO
   * ================================
   */

  const play = useCallback(
    (src: string) => {
      const audio = audioRef.current;

      if (!audio) return;

      const absoluteSrc =
        new URL(
          src,
          window.location.origin
        ).href;

      if (audio.src !== absoluteSrc) {
        audio.src = src;
        audio.currentTime = 0;

        setCurrentTime(0);
        setDuration(0);
      }

      void audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });

      setCurrent(src);
    },
    []
  );

  /*
   * ================================
   * REPRODUCIR TRACK
   * ================================
   */

  const playTrack = useCallback(
    (index: number) => {
      const track = sounds[index];

      if (!track) return;

      setCurrentIndex(index);
      setCurrent(track.file);

      play(track.file);
    },
    [play]
  );

  /*
   * ================================
   * PAUSAR
   * ================================
   */

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  /*
   * ================================
   * PLAY / PAUSE
   * ================================
   */

  const toggle = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || !current) return;

    if (audio.paused) {
      void audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audio.pause();
    }
  }, [current]);

  /*
   * ================================
   * DETENER
   * ================================
   */

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  /*
   * ================================
   * SIGUIENTE
   * ================================
   */

  const next = useCallback(() => {
    if (currentIndex === null) return;

    playTrack(
      (currentIndex + 1) %
        sounds.length
    );
  }, [currentIndex, playTrack]);

  /*
   * ================================
   * ANTERIOR
   * ================================
   */

  const previous = useCallback(() => {
    if (currentIndex === null) return;

    playTrack(
      (currentIndex - 1 + sounds.length) %
        sounds.length
    );
  }, [currentIndex, playTrack]);

  /*
   * ================================
   * VOLUMEN
   * ================================
   */

  const setVolume = useCallback(
    (value: number) => {
      setVolumeState(
        Math.min(
          1,
          Math.max(0, value)
        )
      );
    },
    []
  );

  /*
   * ================================
   * LIMPIAR TEMPORIZADOR
   * ================================
   */

  const clearSleepTimer =
    useCallback(() => {
      if (sleepTimerRef.current) {
        clearTimeout(
          sleepTimerRef.current
        );

        sleepTimerRef.current = null;
      }

      setSleepTimerState(null);
    }, []);

  /*
   * ================================
   * TEMPORIZADOR
   * ================================
   */

  const setSleepTimer =
    useCallback(
      (milliseconds: number) => {
        clearSleepTimer();

        sleepTimerRef.current =
          setTimeout(() => {
            const audio =
              audioRef.current;

            audio?.pause();

            if (audio) {
              audio.currentTime = 0;
            }

            setIsPlaying(false);
            setCurrentTime(0);

            sleepTimerRef.current =
              null;

            setSleepTimerState(null);
          }, milliseconds);

        setSleepTimerState(
          milliseconds
        );
      },
      [clearSleepTimer]
    );

  /*
   * Limpiar temporizador al desmontar.
   */

  useEffect(() => {
    return () => {
      clearSleepTimer();
    };
  }, [clearSleepTimer]);

  /*
   * ================================
   * VALOR DEL CONTEXTO
   * ================================
   */

  const value = useMemo(
    () => ({
      tracks: sounds,

      currentTrack:
        currentIndex === null
          ? null
          : sounds[
              currentIndex
            ] ?? null,

      currentIndex,

      isPlaying,

      volume,

      currentTime,

      duration,

      sleepTimer,

      playTrack,

      play,

      pause,

      toggle,

      stop,

      next,

      previous,

      setVolume,

      setSleepTimer,

      clearSleepTimer,
    }),
    [
      currentIndex,
      isPlaying,
      volume,
      currentTime,
      duration,
      sleepTimer,

      playTrack,
      play,
      pause,
      toggle,
      stop,

      next,
      previous,

      setVolume,

      setSleepTimer,
      clearSleepTimer,
    ]
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context =
    useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio debe usarse dentro de AudioProvider"
    );
  }

  return context;
}