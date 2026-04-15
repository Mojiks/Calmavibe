import { createContext, useContext, useRef, useState } from "react"

type AudioContextType = {
  play: (src: string) => void
  pause: () => void
  isPlaying: boolean
  current: string | null
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)

  const play = (src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
    }

    if (audioRef.current.src !== window.location.origin + src) {
      audioRef.current.src = src
    }

    audioRef.current.play()
    setIsPlaying(true)
    setCurrent(src)
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, current }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) throw new Error("useAudio debe usarse dentro de AudioProvider")
  return context
}