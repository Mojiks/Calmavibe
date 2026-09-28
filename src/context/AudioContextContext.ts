import { createContext } from "react";
import type { AudioTrack } from "./AudioContext";

export type AudioContextValue = {
  tracks: AudioTrack[];
  currentTrack: AudioTrack | null;
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;

  playTrack: (trackOrIndex: AudioTrack | number) => Promise<void>;
  pause: () => void;
  resume: () => Promise<void>;
  toggle: () => Promise<void>;
  previous: () => Promise<void>;
  next: () => Promise<void>;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;

  sleepTimer: number | null;
  setSleepTimer: (minutes: number | null) => void;
  clearSleepTimer: () => void;
};

export const AudioContext = createContext<AudioContextValue | null>(null);
