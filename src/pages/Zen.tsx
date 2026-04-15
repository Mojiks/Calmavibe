import { useEffect, useRef, useState } from "react";

export default function Zen() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "idle">("idle");
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const startBreathing = () => {
    if (running) return;

    setRunning(true);
    setCycles(0);
    runCycle();
  };

  const stopBreathing = () => {
    setRunning(false);
    setPhase("idle");
    setCount(0);
    setCycles(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const runCycle = () => {
    let localCycle = 0;

    const nextCycle = () => {
      if (localCycle >= 2) {
        stopBreathing();
        return;
      }

      localCycle++;
      setCycles(localCycle);

      // INHALE
      setPhase("inhale");
      setCount(4);

      let c = 4;

      intervalRef.current = window.setInterval(() => {
        c--;
        setCount(c);

        if (c === 0) {
          clearInterval(intervalRef.current!);

          // HOLD
          setPhase("hold");
          let hold = 7;
          setCount(hold);

          intervalRef.current = window.setInterval(() => {
            hold--;
            setCount(hold);

            if (hold === 0) {
              clearInterval(intervalRef.current!);

              // EXHALE
              setPhase("exhale");
              let exhale = 8;
              setCount(exhale);

              intervalRef.current = window.setInterval(() => {
                exhale--;
                setCount(exhale);

                if (exhale === 0) {
                  clearInterval(intervalRef.current!);
                  nextCycle();
                }
              }, 1000);
            }
          }, 1000);
        }
      }, 1000);
    };

    nextCycle();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getText = () => {
    if (phase === "inhale") return "Inhala";
    if (phase === "hold") return "Sostén";
    if (phase === "exhale") return "Exhala";
    return "Respira";
  };

  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center text-white px-4">

      {/* TITULO */}
      <h1 className="text-2xl font-semibold mb-2">Respiración 4-7-8</h1>

      {/* DESCRIPCIÓN */}
      <p className="text-sm text-white/70 text-center max-w-md mb-6">
        Inhala 4 segundos, mantén 7, exhala 8. Este ejercicio reduce ansiedad,
        calma el sistema nervioso y mejora el sueño.
      </p>

      {/* CÍRCULO */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div
          className={`w-40 h-40 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center 
          ${running ? "animate-breathe" : ""}`}
        >
          <div className="text-center">
            <p className="text-lg">{getText()}</p>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        </div>

        {/* CICLOS (USA cycles → elimina warning) */}
        <p className="text-xs text-white/60 mt-3">
          Ciclos: {cycles}/2
        </p>
      </div>

      {/* BOTONES */}
      <div className="flex gap-4">
        <button
          onClick={startBreathing}
          className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          Iniciar
        </button>

        <button
          onClick={stopBreathing}
          className="bg-white/20 px-5 py-2 rounded-lg hover:bg-white/30 transition"
        >
          Detener
        </button>
      </div>

    </div>
  );
}