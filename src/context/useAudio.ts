import { useContext } from "react";
import { AudioContext } from "./AudioContextContext";

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio debe usarse dentro de AudioProvider");
  }

  return context;
}
